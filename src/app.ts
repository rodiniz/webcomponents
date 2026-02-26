import './styles/theme.css';
import './styles/theme-shadcn.css';
import { store } from './core/store';
import './core/router';

const applyTheme = (theme: string): void => {
	document.documentElement.dataset.theme = theme;
};

applyTheme(store.getState().theme);
store.subscribe(state => applyTheme(state.theme));
