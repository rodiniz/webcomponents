import { LitElement, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { TemplateUrlComponent, Input, Output, EventEmitter } from '../../core/template-url-component';
import '../../shared/components/button';
import { buttonDemoTemplate, buttonDemoStyles } from './button-demo.template';

@customElement('button-demo')
export class ButtonDemo extends TemplateUrlComponent {
  static styles = [
    css`:host { display: block; }`,
    unsafeCSS(buttonDemoStyles.toString())
  ];

  // Angular-like @Input - receives data from parent
  @Input() title: string = 'Button Demo';
  @Input() showSection: boolean = true;
  
  // Angular-like @Output - emits events to parent
  @Output() buttonClicked = new EventEmitter<string>();
  @Output() sectionChanged = new EventEmitter<boolean>();

  // Local state (like Angular's component state)
  @state() private clickCount: number = 0;
  @state() private activeVariant: string = 'primary';

  // Angular-like ngOnInit lifecycle hook
  ngOnInit(): void {
    console.log('🔵 ButtonDemo: ngOnInit - Component initialized');
    this.buttonClicked.emit('Component initialized');
  }

  // Angular-like ngOnChanges lifecycle hook
  ngOnChanges(changes: Record<string, { previousValue: any; currentValue: any }>): void {
    console.log('🔵 ButtonDemo: ngOnChanges', changes);
    
    if (changes['title']) {
      console.log(`🔵 Title changed from "${changes['title'].previousValue}" to "${changes['title'].currentValue}"`);
    }
  }

  // Angular-like ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    console.log('🔵 ButtonDemo: ngOnDestroy - Component being destroyed');
  }

  // Event handler (like Angular's component methods)
  private handleButtonClick(variant: string): void {
    this.clickCount++;
    this.activeVariant = variant;
    this.buttonClicked.emit(`Button clicked: ${variant} (count: ${this.clickCount})`);
  }

  private toggleSection(): void {
    this.showSection = !this.showSection;
    this.sectionChanged.emit(this.showSection);
  }

  getTemplate() {
    return buttonDemoTemplate;
  }
}
