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
    expect(input).toBeTruthy();
    // the input's offsetParent should be the uploading container, indicating the container
    // has some kind of positioning (relative/absolute) and the input is constrained to it.
    expect(input.offsetParent).toBe(container);
    // input style itself should still be absolute with inset:0
    const inputStyle = getComputedStyle(input);
    expect(inputStyle.position).toBe('absolute');
    expect(inputStyle.inset).toBe('0px');
  });
});
