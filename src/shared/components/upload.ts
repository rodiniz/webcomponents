import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import { UIComponentBase } from '../../core/ui-component-base';
import { renderIcon } from '../../core/icon-helpers';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-upload')
export class UIUpload extends UIComponentBase {
  static styles = [
    unsafeCSS(themeStyles),
    css`
      /* ensure container is positioned so input does not float outside */
      .upload {
        position: relative;
        margin: 2rem 0;
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
    this.emit('files-change', { files: this.files });
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

    this.emit('files-change', { files: processedFiles });
  }

  private removeFile(index: number): void {
    this.files = this.files.filter((_, i) => i !== index);
    this.emit('files-change', { files: this.files });
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
          <div class="upload-icon">${renderIcon('upload', { width: 24, height: 24 })}</div>
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
