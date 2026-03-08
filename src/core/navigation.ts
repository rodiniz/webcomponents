// Base path helpers shared by router and guards.
const BASE_PATH = import.meta.env.BASE_URL || '/';

export function getRoutePath(fullPath: string): string {
  if (BASE_PATH === '/') return fullPath;

  const normalizedBase = BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH;

  if (fullPath === normalizedBase || fullPath === normalizedBase + '/') {
    return '/';
  }

  if (fullPath.startsWith(normalizedBase + '/')) {
    return fullPath.slice(normalizedBase.length);
  }

  return fullPath;
}

export function buildPath(routePath: string): string {
  if (BASE_PATH === '/') return routePath;
  const base = BASE_PATH.endsWith('/') ? BASE_PATH.slice(0, -1) : BASE_PATH;
  return `${base}${routePath}`;
}

export function getPathParams(routePath: string, path: string): Record<string, string> | null {
  const routeParts = routePath.split('/');
  const pathParts = path.split('/');

  if (routeParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const pathPart = pathParts[i];

    if (routePart.startsWith(':')) {
      params[routePart.slice(1)] = pathPart;
    } else if (routePart !== pathPart) {
      return null;
    }
  }

  return params;
}
