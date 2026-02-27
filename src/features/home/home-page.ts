import { BaseComponent } from '../../core/base-component';
import template from './home-page.html?raw';
import { homePageCSS } from './home-page.css';
import '../../shared/components/button';
import '../../layouts/app-layout';

class HomePage extends BaseComponent {
	connectedCallback(): void {
		super.connectedCallback();
		this.attachEventListeners();
	}

	private attachEventListeners(): void {
		if (!this.shadowRoot) return;

		// Explore Components button
		const buttons = this.shadowRoot.querySelectorAll('ui-button');
		if (buttons[0]) {
			buttons[0].addEventListener('click', () => {
				window.location.href = '/button';
			});
		}

		// GitHub button
		if (buttons[1]) {
			buttons[1].addEventListener('click', () => {
				window.open('https://github.com/rodiniz/webcomponents', '_blank');
			});
		}

		// Start Exploring button
		if (buttons[2]) {
			buttons[2].addEventListener('click', () => {
				window.location.href = '/button';
			});
		}
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${homePageCSS}</style>
			${template}
		`;
	}
}

customElements.define('home-page', HomePage);

export { HomePage };
