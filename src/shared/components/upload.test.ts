import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../../../src/shared/components/upload';

describe('UIUpload', () => {
  let upload: HTMLElement;

  beforeEach(() => {
    upload = document.createElement('ui-upload');
    document.body.appendChild(upload);
  });

  afterEach(() => {
    upload.remove();
  });

  it('should render container with correct class', () => {
    const root = upload.shadowRoot;
    const container = root?.querySelector('div.upload');
    expect(container).toBeTruthy();
  });

  it('input should be absolutely positioned inside wrapper only', () => {
    const root = upload.shadowRoot;
    const input = root?.querySelector('input.upload-input') as HTMLElement;
    const container = root?.querySelector('div.upload') as HTMLElement;
    const content = root?.querySelector('div.upload-content') as HTMLElement;
    expect(input).toBeTruthy();
    expect(content).toBeTruthy();
    expect(input.parentElement).toBe(container);
    expect(container.firstElementChild).toBe(input);
    expect(container.contains(content)).toBe(true);
  });
});
