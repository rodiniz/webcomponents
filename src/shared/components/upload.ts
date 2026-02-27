import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

class UIUpload extends BaseComponent {
	private files = this.useSignal<File[]>([]);
	private isDragging = this.useSignal(false);

	connectedCallback(): void {
		this.setAttribute('data-ui', 'upload');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['accept', 'multiple', 'disabled', 'label', 'helper', 'name'];
	}

	attributeChangedCallback(): void {
		this.render();
	}

	get value(): string {
		return this.files.get().map(file => file.name).join(', ');
	}

	get filesValue(): File[] {
		return this.files.get();
	}

	set filesValue(files: File[]) {
		this.setFiles(files);
	}

	public clear(): void {
		this.setFiles([]);
	}

	private isDisabled(): boolean {
		return this.hasAttribute('disabled');
	}

	private isMultiple(): boolean {
		return this.hasAttribute('multiple');
	}

	private getAccept(): string {
		return this.getAttribute('accept') || '';
	}

	private getLabel(): string {
		return this.getAttribute('label') || 'Upload files';
	}

	private getHelper(): string {
		return this.getAttribute('helper') || '';
	}

	private setFiles(files: File[]): void {
		const finalFiles = this.isMultiple() ? files : files.slice(0, 1);
		this.files.set(finalFiles);
		this.dispatchEvent(
			new CustomEvent('upload-change', {
				bubbles: true,
				composed: true,
				detail: { files: finalFiles }
			})
		);
	}

	private formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		const kb = bytes / 1024;
		if (kb < 1024) return `${kb.toFixed(1)} KB`;
		return `${(kb / 1024).toFixed(1)} MB`;
	}

	private syncInputFiles(input: HTMLInputElement, files: File[]): void {
		const dataTransfer = new DataTransfer();
		files.forEach(file => dataTransfer.items.add(file));
		input.files = dataTransfer.files;
	}

	render(): void {
		const accept = this.getAccept();
		const label = this.getLabel();
		const helper = this.getHelper();
		const disabled = this.isDisabled();
		const multiple = this.isMultiple();
		const isDragging = this.isDragging.get();
		const files = this.files.get();

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="upload">
				${label ? `<label class="upload-label">${label}</label>` : ''}
				<div class="upload-drop ${isDragging ? 'dragging' : ''} ${disabled ? 'disabled' : ''}" part="dropzone">
					<input
						class="upload-input"
						type="file"
						${multiple ? 'multiple' : ''}
						${accept ? `accept="${accept}"` : ''}
						${disabled ? 'disabled' : ''}
					>
					<div class="upload-content">
						<div class="upload-icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M12 16V4"></path>
								<path d="M8 8l4-4 4 4"></path>
								<path d="M4 16v4h16v-4"></path>
							</svg>
						</div>
						<div class="upload-text">
							<div class="upload-title">Drop files here or browse</div>
							<div class="upload-sub">
								${accept ? `Accepted: ${accept}` : 'Any file type supported'}
							</div>
						</div>
						<button class="upload-btn" type="button" ${disabled ? 'disabled' : ''}>Browse</button>
					</div>
				</div>
				${helper ? `<div class="upload-helper">${helper}</div>` : ''}
				${files.length ? `
					<ul class="upload-list">
						${files
							.map(
								(file, index) => `
								<li>
									<span>${file.name}</span>
									<span class="upload-meta">${this.formatSize(file.size)}</span>
									<button class="upload-remove" data-index="${index}" type="button">Remove</button>
								</li>
							`
							)
							.join('')}
					</ul>
				` : ''}
			</div>
		`;

		const dropzone = this.shadowRoot!.querySelector('.upload-drop') as HTMLElement | null;
		const input = this.shadowRoot!.querySelector('.upload-input') as HTMLInputElement | null;
		const browseBtn = this.shadowRoot!.querySelector('.upload-btn') as HTMLButtonElement | null;
		const removeButtons = this.shadowRoot!.querySelectorAll<HTMLButtonElement>('.upload-remove');

		if (!dropzone || !input) return;

		if (files.length) {
			this.syncInputFiles(input, files);
		} else {
			input.value = '';
		}

		dropzone.addEventListener('dragover', (event) => {
			if (disabled) return;
			event.preventDefault();
			this.isDragging.set(true);
		});

		dropzone.addEventListener('dragleave', () => {
			this.isDragging.set(false);
		});

		dropzone.addEventListener('drop', (event) => {
			if (disabled) return;
			event.preventDefault();
			this.isDragging.set(false);

			const dropped = Array.from(event.dataTransfer?.files ?? []);
			if (!dropped.length) return;
			this.setFiles(dropped);
			this.syncInputFiles(input, this.files.get());
		});

		input.addEventListener('change', () => {
			const nextFiles = Array.from(input.files ?? []);
			this.setFiles(nextFiles);
		});

		browseBtn?.addEventListener('click', () => {
			if (disabled) return;
			input.click();
		});

		removeButtons.forEach(button => {
			button.addEventListener('click', () => {
				const index = parseInt(button.dataset.index || '0', 10);
				const nextFiles = this.files.get().filter((_, fileIndex) => fileIndex !== index);
				this.setFiles(nextFiles);
				this.syncInputFiles(input, nextFiles);
			});
		});
	}
}

export { UIUpload };

customElements.define('ui-upload', UIUpload);
