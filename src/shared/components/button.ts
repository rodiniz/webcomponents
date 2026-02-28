import { BaseComponent } from '../../core/base-component';
import { html, render, classMap, unsafeHTML } from '../../core/template';
import styles from '../../styles/theme.css?inline';
import feather from 'feather-icons';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

class UIButton extends BaseComponent {
	private buttonEl: HTMLButtonElement | null = null;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'button');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['variant', 'size', 'disabled', 'type', 'icon', 'icon-position'];
	}

	attributeChangedCallback(): void {
		this.render();
	}

	private getVariant(): ButtonVariant {
		const value = this.getAttribute('variant');
		if (value === 'secondary' || value === 'ghost' || value === 'danger') return value;
		return 'primary';
	}

	private getSize(): ButtonSize {
		const value = this.getAttribute('size');
		if (value === 'sm' || value === 'lg') return value;
		return 'md';
	}

	private getType(): string {
		return this.getAttribute('type') ?? 'button';
	}

	private getIcon(): { svg: string; name: string } | null {
		const icon = this.getAttribute('icon');
		if (!icon) return null;
		const iconName = icon.trim();
		const svg = feather.icons[iconName as keyof typeof feather.icons]?.toSvg() || '';
		return { svg, name: iconName };
	}

	private getIconPosition(): 'left' | 'right' {
		const value = this.getAttribute('icon-position');
		if (value === 'right') return 'right';
		return 'left';
	}

	private handleClick = (e: Event): void => {
		const type = this.getType();
		const disabled = this.hasAttribute('disabled');

		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		if (type === 'submit') {
			e.preventDefault();
			e.stopPropagation();
			
			let form = this.closest('form');
			
			if (!form) {
				let parent = this.parentElement;
				while (parent) {
					if (parent.tagName === 'FORM') {
						form = parent as HTMLFormElement;
						break;
					}
					parent = parent.parentElement;
				}
			}
			
			if (form) {
				const submitEvent = new Event('submit', {
					bubbles: true,
					cancelable: true
				});
				form.dispatchEvent(submitEvent);
			}
		}
	};

	render(): void {
		const variant = this.getVariant();
		const size = this.getSize();
		const disabled = this.hasAttribute('disabled');
		const type = this.getType();
		const icon = this.getIcon();
		const iconPosition = this.getIconPosition();

		const hasIcon = icon !== null;
		const content = this.innerHTML.trim();
		const isIconOnly = hasIcon && !content;

		const classes = classMap({
			'btn': true,
			[variant]: true,
			[size]: true,
			'has-icon': hasIcon,
			'icon-only': isIconOnly
		});

		const renderContent = () => {
			if (hasIcon && content) {
				const iconEl = html`<span class="btn-icon">${unsafeHTML(icon!.svg)}</span>`;
				return iconPosition === 'left' 
					? html`${iconEl}<span>${content}</span>`
					: html`<span>${content}</span>${iconEl}`;
			} else if (hasIcon) {
				return html`<span class="btn-icon">${unsafeHTML(icon!.svg)}</span>`;
			}
			return content;
		};

		const template = html`
			<style>${styles}</style>
			<button
				part="button"
				class=${classes}
				type=${type}
				?disabled=${disabled}
				@click=${this.handleClick}
			>
				${renderContent()}
			</button>
		`;

		render(template, this.shadowRoot!);
		this.buttonEl = this.shadowRoot!.querySelector('button');
	}
}

export { UIButton };
export type { ButtonVariant, ButtonSize };

customElements.define('ui-button', UIButton);
