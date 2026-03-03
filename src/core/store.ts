type Theme = 'light' | 'shadcn';

type AppState = {
  user: unknown | null;
  theme: Theme;
};

type Listener = (state: AppState) => void;

const listeners = new Set<Listener>();

const state: AppState = {
  user: null,
  theme: 'shadcn'
};

export const store = {
  getState: (): AppState => state,

  setState(partial: Partial<AppState>): void {
    Object.assign(state, partial);
    listeners.forEach(listener => listener(state));
  },

  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
