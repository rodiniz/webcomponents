import './styles/theme.css';
import './styles/theme-shadcn.css';
import { applyTheme } from './core/theme-service';
import { store } from './core/store';
import './core/router';

// Inject default theme variables into :root before components mount
applyTheme('shadcn');

const applyLegacyTheme = (theme: string): void => {
	document.documentElement.dataset.theme = theme;
};
applyLegacyTheme(store.getState().theme);
store.subscribe(state => applyLegacyTheme(state.theme));
