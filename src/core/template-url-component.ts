import { LitElement, html, css, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export abstract class TemplateUrlComponent extends LitElement {
  @property({ type: String }) templateUrl: string = '';
  @property({ type: String }) cssUrl: string = '';
  
  abstract getTemplate(): TemplateResult;
  
  render() {
    return this.getTemplate();
  }
}
