import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';
import feather from 'feather-icons';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

class UIButton extends BaseComponent {
	connectedCallback(): void {
		this.setAttribute('data-ui', 'button');
		super.connectedCallback();
		this.attachClickHandler();
	}

	static get observedAttributes(): string[] {
		return ['variant', 'size', 'disabled', 'type', 'icon', 'icon-position'];
	}

	attributeChangedCallback(): void {
		this.render();
		this.attachClickHandler();
	}

	private attachClickHandler(): void {
		if (!this.shadowRoot) return;

		const button = this.shadowRoot.querySelector('button');
		if (!button) return;

		// Remove old listener if exists
		const oldHandler = (button as any)._clickHandler;
		if (oldHandler) {
			button.removeEventListener('click', oldHandler);
		}

		// Add new click handler
		const clickHandler = (e: Event) => {
			const type = this.getType();
			const disabled = this.hasAttribute('disabled');

			if (disabled) {
				e.preventDefault();
				e.stopPropagation();
				return;
			}

			// If type is submit, find parent form and submit it
			if (type === 'submit') {
				e.preventDefault();
				e.stopPropagation();
				
				// Find the form that contains this ui-button element
				let form = this.closest('form');
				
				// If not found, check if we're inside a shadow root
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
					// Trigger form submit event
					const submitEvent = new Event('submit', {
						bubbles: true,
						cancelable: true
					});
					form.dispatchEvent(submitEvent);
				}
			}
		};

		// Store handler reference for cleanup
		(button as any)._clickHandler = clickHandler;
		button.addEventListener('click', clickHandler);
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

	private getIcon(): { html: string; name: string } | null {
		const icon = this.getAttribute('icon');
		if (!icon) return null;
		const iconName = icon.trim();
		const svg = feather.icons[iconName as keyof typeof feather.icons]?.toSvg() || '';
		return { html: `<span class="btn-icon">${svg}</span>`, name: iconName };
	}

	private getIconPosition(): 'left' | 'right' {
		const value = this.getAttribute('icon-position');
		if (value === 'right') return 'right';
		return 'left';
	}

	render(): void {
		const variant = this.getVariant();
		const size = this.getSize();
		const disabled = this.hasAttribute('disabled');
		const type = this.getType();
		const icon = this.getIcon();
		const iconPosition = this.getIconPosition();

		const hasIcon = icon !== null;
		const iconHtml = icon ? icon.html : '';
		const content = this.innerHTML.trim();
		const isIconOnly = hasIcon && !content;

		let buttonContent: string;
		if (hasIcon && content) {
			buttonContent = iconPosition === 'left' 
				? `${iconHtml}<span>${content}</span>`
				: `<span>${content}</span>${iconHtml}`;
		} else if (hasIcon) {
			buttonContent = iconHtml;
		} else {
			buttonContent = content;
		}

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<button
				part="button"
				class="btn ${variant} ${size}${hasIcon ? ' has-icon' : ''}${isIconOnly ? ' icon-only' : ''}"
				type="${type}"
				${disabled ? 'disabled' : ''}
			>
				${buttonContent}
		</button>
	`;
	}
}

export { UIButton };
export type { ButtonVariant, ButtonSize };

customElements.define('ui-button', UIButton);
