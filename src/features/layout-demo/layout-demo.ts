import { BaseComponent } from '../../core/base-component';
import template from './layout-demo.html?raw';
import { layoutDemoCSS } from './layout-demo.css';
import '../../shared/components/layout';
import '../../layouts/app-layout';

class LayoutDemo extends BaseComponent {
	async connectedCallback(): Promise<void> {
		super.connectedCallback();

		// Wait for elements to render
		await new Promise(resolve => requestAnimationFrame(resolve));
		await customElements.whenDefined('ui-layout-sidebar');
		await new Promise(resolve => setTimeout(resolve, 50));

		this.setupEventListeners();
	}

	private setupEventListeners(): void {
		if (!this.shadowRoot) return;

		// Find the event sidebar and listen for changes
		const eventSidebar = this.shadowRoot.querySelector(
			'#eventSidebar'
		) as HTMLElement | null;

		if (eventSidebar) {
			const handleCollapsedChange = (e: Event) => {
				const event = e as CustomEvent;
				const output = this.shadowRoot!.querySelector(
					'#eventOutput'
				) as HTMLElement | null;

				if (output) {
					const collapsed = event.detail.collapsed;
					const timestamp = new Date().toLocaleTimeString();
					const message = `[${timestamp}] Sidebar ${collapsed ? 'collapsed' : 'expanded'}`;

					// Add to output (keep last 5 events)
					const lines = output.textContent
						?.split('\n')
						.filter(line => line.trim()) || [];
					if (lines.length >= 5) lines.shift();

					lines.push(message);
					output.textContent = lines.join('\n');
					output.classList.remove('empty');

					// Auto-scroll to bottom
					output.scrollTop = output.scrollHeight;
				}
			};

			eventSidebar.addEventListener('collapsed-change', handleCollapsedChange);
		}
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${layoutDemoCSS}</style>
			${template}
		`;
	}
}

customElements.define('layout-demo', LayoutDemo);

export { LayoutDemo };
