/**
 * Simple HTTP Client with Interceptor Support
 * Lightweight fetch wrapper for common HTTP operations
 */

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  headers?: Record<string, string>;
  body?: string | FormData | null;
  timeout?: number;
  [key: string]: any;
}

export interface ResponseConfig {
  status: number;
  statusText: string;
  headers: Headers;
  data: any;
  [key: string]: any;
}

export type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
export type ResponseInterceptor = (response: ResponseConfig) => ResponseConfig | Promise<ResponseConfig>;
export type ErrorInterceptor = (error: any) => any | Promise<any>;

interface InterceptorHandlers {
  request: {
    handlers: Array<{ onFulfilled: RequestInterceptor; onRejected?: ErrorInterceptor }>;
    use: (onFulfilled: RequestInterceptor, onRejected?: ErrorInterceptor) => void;
  };
  response: {
    handlers: Array<{ onFulfilled: ResponseInterceptor; onRejected?: ErrorInterceptor }>;
    use: (onFulfilled: ResponseInterceptor, onRejected?: ErrorInterceptor) => void;
  };
}

class HTTPClient {
  private baseURL: string = '';
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  private defaultTimeout: number = 30000;
  
  public interceptors: InterceptorHandlers = {
    request: {
      handlers: [],
      use: (onFulfilled: RequestInterceptor, onRejected?: ErrorInterceptor) => {
        this.interceptors.request.handlers.push({ onFulfilled, onRejected });
      }
    },
    response: {
      handlers: [],
      use: (onFulfilled: ResponseInterceptor, onRejected?: ErrorInterceptor) => {
        this.interceptors.response.handlers.push({ onFulfilled, onRejected });
      }
    }
  };

  /**
   * Set base URL for all requests
   */
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  /**
   * Get currently set base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }

  /**
   * Set default headers for all requests
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  /**
   * Set default timeout for all requests (in ms)
   */
  setDefaultTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }

  /**
   * Execute request with interceptors
   */
  private async executeRequest(url: string, config: RequestConfig): Promise<any> {
    // Normalize URL
    const fullURL = url.startsWith('http') ? url : this.baseURL + url;

    // Merge request config
    let requestConfig: RequestConfig = {
      method: 'GET',
      headers: { ...this.defaultHeaders },
      timeout: this.defaultTimeout,
      ...config
    };

    // Execute request interceptors
    for (const handler of this.interceptors.request.handlers) {
      try {
        requestConfig = await handler.onFulfilled(requestConfig);
      } catch (error) {
        if (handler.onRejected) {
          requestConfig = await handler.onRejected(error);
        } else {
          throw error;
        }
      }
    }

    // Create abort controller for timeout
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), requestConfig.timeout || this.defaultTimeout);

    try {
      const fetchOptions: RequestInit = {
        method: requestConfig.method,
        headers: requestConfig.headers,
        signal: abortController.signal
      };

      // Add body for non-GET requests
      if (requestConfig.body && requestConfig.method !== 'GET') {
        fetchOptions.body = typeof requestConfig.body === 'string' 
          ? requestConfig.body 
          : requestConfig.body;
      }

      // Execute fetch
      const response = await fetch(fullURL, fetchOptions);

      // Parse response body
      let data: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = response.ok ? await response.json() : null;
      } else if (contentType?.includes('text')) {
        data = await response.text();
      } else {
        data = await response.blob();
      }

      // Build response config
      let responseConfig: ResponseConfig = {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data
      };

      // Check for HTTP errors
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        (error as any).response = responseConfig;
        (error as any).config = requestConfig;
        throw error;
      }

      // Execute response interceptors
      for (const handler of this.interceptors.response.handlers) {
        try {
          responseConfig = await handler.onFulfilled(responseConfig);
        } catch (error) {
          if (handler.onRejected) {
            responseConfig = await handler.onRejected(error);
          } else {
            throw error;
          }
        }
      }

      return responseConfig.data;
    } catch (error) {
      // Handle fetch/network errors
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${requestConfig.timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.executeRequest(url, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.executeRequest(url, {
      ...config,
      method: 'POST',
      body: typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data)
    });
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.executeRequest(url, {
      ...config,
      method: 'PUT',
      body: typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data)
    });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.executeRequest(url, {
      ...config,
      method: 'PATCH',
      body: typeof data === 'string' || data instanceof FormData ? data : JSON.stringify(data)
    });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.executeRequest(url, { ...config, method: 'DELETE' });
  }

  /**
   * HEAD request
   */
  async head<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.executeRequest(url, { ...config, method: 'HEAD' });
  }
}

// Export singleton instance
export const http = new HTTPClient();

export { HTTPClient };
