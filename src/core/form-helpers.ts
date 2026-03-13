import { html, nothing } from 'lit';

export function renderOptionalLabel(
  label: string,
  options: { required?: boolean; className?: string } = {}
) {
  const { required = false, className = 'input-label' } = options;
  if (!label) return nothing;

  return html`<label class=${className}>${label}${required ? ' *' : ''}</label>`;
}