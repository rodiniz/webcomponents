import { BaseComponent } from '../../core/base-component';
import '../../shared/components/tabs';
import template from './tabs-demo.html?raw';
import styles from './tabs-demo.css?inline';
import '../../layouts/app-layout';

class TabsDemo extends BaseComponent {
	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			${template}
		`;

		const tabs = this.shadowRoot!.querySelector('#productTabs');
		if (tabs) {
			const newTabs = tabs.cloneNode(true);
			tabs.parentNode?.replaceChild(newTabs, tabs);

			newTabs.addEventListener('tab-change', ((e: CustomEvent) => {
				const result = this.shadowRoot!.getElementById('tab-result');
				const value = this.shadowRoot!.getElementById('tab-value');
				if (result && value) {
					result.style.display = 'block';
					value.textContent = e.detail.id;
				}
			}) as EventListener);
		}
	}
}

customElements.define('tabs-demo', TabsDemo);

export { TabsDemo };
