import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-upload')
export class UIUpload extends LitElement {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      /* ensure container is positioned so input does not float outside */
      .upload {
        position: relative;
      }
    `
  ];

  @property({ type: String }) accept: string = '';
  @property({ type: Boolean }) multiple: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) label: string = 'Drag and drop files here';
  @property({ type: String }) helper: string = '';
  @property({ type: String }) name: string = '';

  @state() private files: File[] = [];
  @state() private isDragging: boolean = false;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'upload');
    super.connectedCallback();
  }

  get value(): string {
    return this.files.map(file => file.name).join(', ');
  }

  get filesValue(): File[] {
    return this.files;
  }

  set filesValue(files: File[]) {
    this.setFiles(files);
  }

  public clear(): void {
    this.files = [];
  }

  private setFiles(newFiles: File[]): void {
    this.files = newFiles;
    this.dispatchEvent(new CustomEvent('files-change', {
      detail: { files: this.files },
      bubbles: true,
      composed: true
    }));
  }

  private handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    if (!this.disabled) {
      this.isDragging = true;
    }
  };

  private handleDragLeave = (e: DragEvent): void => {
    e.preventDefault();
    this.isDragging = false;
  };

  private handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    this.isDragging = false;
    if (this.disabled) return;

    const droppedFiles = e.dataTransfer?.files;
    if (droppedFiles) {
      this.processFiles(Array.from(droppedFiles));
    }
  };

  private handleInputChange = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
  };

  private processFiles(newFiles: File[]): void {
    let processedFiles: File[];
    
    if (this.multiple) {
      processedFiles = [...this.files, ...newFiles];
    } else {
      processedFiles = newFiles;
    }
    
    this.files = processedFiles;
    
    this.dispatchEvent(new CustomEvent('files-change', {
      detail: { files: processedFiles },
      bubbles: true,
      composed: true
    }));
  }

  private removeFile(index: number): void {
    this.files = this.files.filter((_, i) => i !== index);
    this.dispatchEvent(new CustomEvent('files-change', {
      detail: { files: this.files },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    // use "upload" class to match stylesheet and provide a positioned container
    const containerClass = classMap({
      'upload': true,
      'dragging': this.isDragging,
      'disabled': this.disabled,
      'has-files': this.files.length > 0
    });

    return html`
      <!-- container now has class "upload" and is positioned via CSS -->
      <div class=${containerClass}
        @dragover=${this.handleDragOver}
        @dragleave=${this.handleDragLeave}
        @drop=${this.handleDrop}
      >
        <input
          type="file"
          class="upload-input"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this.handleInputChange}
        />
        <div class="upload-content">
          <div class="upload-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <div class="upload-label">${this.label}</div>
          ${this.helper ? html`<div class="upload-helper">${this.helper}</div>` : ''}
        </div>
      </div>
      ${this.files.length > 0 ? html`
        <div class="file-list">
          ${this.files.map((file, index) => html`
            <div class="file-item">
              <span class="file-name">${file.name}</span>
              <span class="file-size">${(file.size / 1024).toFixed(1)} KB</span>
              <button class="file-remove" @click=${() => this.removeFile(index)}>×</button>
            </div>
          `)}
        </div>
      ` : ''}
    `;
  }
}
