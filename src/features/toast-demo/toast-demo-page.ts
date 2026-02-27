import { BaseComponent } from '../../core/base-component';
import template from './toast-demo-page.html?raw';
import styles from './toast-demo-page.css?raw';
import '../../shared/components/button';
import '../../shared/components/toast';
import type { UIToast } from '../../shared/components/toast';
import '../../layouts/app-layout';
import { addEventListenerById, getElementById } from '../../core/dom-helpers';

class ToastDemoPage extends BaseComponent {
  private toastContainer: UIToast | null = null;
  private isReady = false;
  private currentPosition = this.useSignal('top-right');

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    
    await Promise.all([
      customElements.whenDefined('ui-toast'),
      customElements.whenDefined('ui-button')
    ]);
    
    await new Promise(resolve => setTimeout(resolve, 10));
    this.isReady = true;
    this.render();
  }

  public showSucessToast(): void {
   
    if (this.toastContainer) {      
      this.toastContainer.success('Success!', 'This is a success toast message.', 5000);
    }
}
  private setupEventListeners(): void {
    if (!this.toastContainer) return;   

    addEventListenerById(this.shadowRoot, 'showError', 'click', () => {
      this.toastContainer!.error('Error occurred!', undefined, 5000);
    });

    addEventListenerById(this.shadowRoot, 'showWarning', 'click', () => {
      this.toastContainer!.warning('Warning message', undefined, 5000);
    });

    addEventListenerById(this.shadowRoot, 'showInfo', 'click', () => {
      this.toastContainer!.info('Information', undefined, 5000);
    });

    // With Descriptions
    addEventListenerById(this.shadowRoot, 'showSuccessDesc', 'click', () => {
      this.toastContainer!.success(
        'Changes saved!',
        'Your document has been successfully saved to the cloud.',
        5000
      );
    });

    addEventListenerById(this.shadowRoot, 'showErrorDesc', 'click', () => {
      this.toastContainer!.error(
        'Failed to connect',
        'Unable to reach the server. Please check your internet connection.',
        5000
      );
    });

    addEventListenerById(this.shadowRoot, 'showWarningDesc', 'click', () => {
      this.toastContainer!.warning(
        'Storage almost full',
        'You have used 95% of your available storage space.',
        5000
      );
    });

    // Duration Options
    addEventListenerById(this.shadowRoot, 'showQuick', 'click', () => {
      this.toastContainer!.info('Quick notification', 'This will disappear in 2 seconds', 2000);
    });

    addEventListenerById(this.shadowRoot, 'showNormal', 'click', () => {
      this.toastContainer!.info('Normal duration', 'This will disappear in 5 seconds', 5000);
    });

    addEventListenerById(this.shadowRoot, 'showLong', 'click', () => {
      this.toastContainer!.info('Long duration', 'This will disappear in 10 seconds', 10000);
    });

    addEventListenerById(this.shadowRoot, 'showPersistent', 'click', () => {
      this.toastContainer!.info(
        'Persistent notification',
        'This will stay until you close it manually',
        0
      );
    });

    // Position Control
    const updatePosition = (position: string) => {
      this.currentPosition.set(position);
      this.toastContainer!.info('Position changed', `Toast position is now ${position}`, 3000);
    };

    addEventListenerById(this.shadowRoot, 'posTopLeft', 'click', () => {
      updatePosition('top-left');
    });

    addEventListenerById(this.shadowRoot, 'posTopCenter', 'click', () => {
      updatePosition('top-center');
    });

    addEventListenerById(this.shadowRoot, 'posTopRight', 'click', () => {
      updatePosition('top-right');
    });

    addEventListenerById(this.shadowRoot, 'posBottomLeft', 'click', () => {
      updatePosition('bottom-left');
    });

    addEventListenerById(this.shadowRoot, 'posBottomCenter', 'click', () => {
      updatePosition('bottom-center');
    });

    addEventListenerById(this.shadowRoot, 'posBottomRight', 'click', () => {
      updatePosition('bottom-right');
    });

    // Multiple Toasts
    addEventListenerById(this.shadowRoot, 'showMultiple', 'click', () => {
      setTimeout(() => this.toastContainer!.success('First notification', 'This is the first toast'), 0);
      setTimeout(() => this.toastContainer!.info('Second notification', 'This is the second toast'), 200);
      setTimeout(() => this.toastContainer!.warning('Third notification', 'This is the third toast'), 400);
      setTimeout(() => this.toastContainer!.error('Fourth notification', 'This is the fourth toast'), 600);
    });

    addEventListenerById(this.shadowRoot, 'dismissAll', 'click', () => {
      this.toastContainer!.dismissAll();
    });    
  }

  private getToastContainer(): UIToast | null {
    return getElementById(this.shadowRoot, 'toastContainer') as UIToast | null;
  }

  render(): void {
    this.shadowRoot!.innerHTML = `
      <style>${styles}</style>
      ${template}
    `;

    const positionLabel = getElementById(this.shadowRoot, 'currentPosition');
    if (positionLabel) {
      positionLabel.textContent = this.currentPosition.get();
    }

    this.toastContainer = this.getToastContainer();
    if (this.toastContainer) {
      this.toastContainer.setAttribute('position', this.currentPosition.get());
    }
    if (this.isReady) {
      this.setupEventListeners();
    }
  }
}

customElements.define('toast-demo-page', ToastDemoPage);
