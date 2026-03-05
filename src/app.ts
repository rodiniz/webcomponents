import './styles/theme.css';
import './styles/theme-shadcn.css';
import { applyTheme } from './core/theme-service';
import { store } from './core/store';

// Inject default theme variables into :root before components mount
applyTheme('shadcn');

const applyLegacyTheme = (theme: string): void => {
	document.documentElement.dataset.theme = theme;
};
applyLegacyTheme(store.getState().theme);
store.subscribe(state => applyLegacyTheme(state.theme));

const app = document.querySelector('#app');

if (app) {
	app.innerHTML = `
		<main style="padding: 24px; font-family: system-ui, -apple-system, sans-serif;">
			<h1>Component examples moved to Storybook</h1>
			<p>Run <code>npm run storybook</code> to explore the components.</p>
		</main>
	`;
}
