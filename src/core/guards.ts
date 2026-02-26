import { store } from './store';
import { buildPath } from './navigation';

export function redirectToLogin(): void {
  const fullLoginPath = buildPath('/login');
  history.replaceState(null, '', fullLoginPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function requireUser(): boolean {
  if (store.getState().user) {
    return true;
  }

  redirectToLogin();
  return false;
}
