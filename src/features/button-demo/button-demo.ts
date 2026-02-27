import { BaseComponent } from '../../core/base-component';
import template from './button-demo.html?raw';
import { buttonDemoCSS } from './button-demo.css';
import '../../shared/components/button';
import '../../layouts/app-layout';

class ButtonDemo extends BaseComponent {
	connectedCallback(): void {
		super.connectedCallback();
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${buttonDemoCSS}</style>
			${template}
		`;
	}
}

customElements.define('button-demo', ButtonDemo);

export { ButtonDemo };
