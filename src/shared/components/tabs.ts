import { html, css, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { UIComponentBase } from '../../core/ui-component-base';
import themeStyles from '../../styles/theme.css?inline';
import tabsStyles from './tabs.css?inline';

export interface TabChangeDetail {
  id: string;
}

@customElement('ui-tabs')
export class UITabs extends UIComponentBase {
  static styles = [unsafeCSS(themeStyles), unsafeCSS(tabsStyles)];

  @property({ type: String, reflect: true }) active: string = '';
  @state() private activeId: string | null = null;
  @query('.tab-indicator') indicator!: HTMLElement;

  firstUpdated(): void {
    const tabsSlot = this.shadowRoot?.querySelector('slot[name="tab"]') as HTMLSlotElement | null;
    const panelsSlot = this.shadowRoot?.querySelector('slot[name="panel"]') as HTMLSlotElement | null;

    tabsSlot?.addEventListener('slotchange', () => this.syncTabs());
    panelsSlot?.addEventListener('slotchange', () => this.syncTabs());

    requestAnimationFrame(() => this.syncTabs());
  }

  private handleTabClick = (event: Event): void => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const tab = target.closest('[slot="tab"][data-tab]') as HTMLElement | null;
    if (!tab) return;

    event.preventDefault();
    const id = tab.getAttribute('data-tab');
    if (!id) return;

    this.setActive(id);
  };

  private setActive(id: string): void {
    if (this.activeId === id) return;
    this.activeId = id;
    this.active = id;
    this.syncTabs();
    this.emit<TabChangeDetail>('tab-change', { id });
  }

  private getTabs(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot[name="tab"]') as HTMLSlotElement | null;
    return slot ? (slot.assignedElements({ flatten: true }) as HTMLElement[]) : [];
  }

  private getPanels(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot[name="panel"]') as HTMLSlotElement | null;
    return slot ? (slot.assignedElements({ flatten: true }) as HTMLElement[]) : [];
  }

  private getActiveId(tabs: HTMLElement[]): string | null {
    const activeAttr = this.active;
    if (activeAttr && tabs.some(tab => tab.getAttribute('data-tab') === activeAttr)) {
      return activeAttr;
    }

    if (this.activeId && tabs.some(tab => tab.getAttribute('data-tab') === this.activeId)) {
      return this.activeId;
    }

    const firstTab = tabs.find(tab => tab.getAttribute('data-tab'));
    return firstTab?.getAttribute('data-tab') ?? null;
  }

  private syncTabs(): void {
    const tabs = this.getTabs();
    const panels = this.getPanels();
    if (tabs.length === 0) return;

    const activeId = this.getActiveId(tabs);
    if (!activeId) return;

    this.activeId = activeId;
    if (this.active !== activeId) {
      this.active = activeId;
    }

    tabs.forEach(tab => {
      const id = tab.getAttribute('data-tab');
      if (!id) return;

      const tabId = tab.id || `tab-${id}`;
      const isActive = id === activeId;

      tab.id = tabId;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
      tab.classList.toggle('is-active', isActive);
    });

    panels.forEach(panel => {
      const id = panel.getAttribute('data-tab');
      if (!id) return;

      const panelId = panel.id || `panel-${id}`;
      const isActive = id === activeId;

      panel.id = panelId;
      panel.setAttribute('role', 'tabpanel');
      panel.toggleAttribute('hidden', !isActive);
      panel.classList.toggle('is-active', isActive);

      const matchingTab = tabs.find(tab => tab.getAttribute('data-tab') === id);
      if (matchingTab) {
        matchingTab.setAttribute('aria-controls', panelId);
        panel.setAttribute('aria-labelledby', matchingTab.id);
      }
    });

    this.updateIndicator(tabs, activeId);
  }

  private updateIndicator(tabs: HTMLElement[], activeId: string): void {
    if (!this.indicator) return;

    const activeTab = tabs.find(tab => tab.getAttribute('data-tab') === activeId);
    if (!activeTab) return;

    const tablist = this.shadowRoot?.querySelector('.tablist');
    if (!tablist) return;

    const index = tabs.indexOf(activeTab);
    let offsetLeft = 0;
    for (let i = 0; i < index; i++) {
      offsetLeft += tabs[i].offsetWidth;
    }

    this.indicator.style.transform = `translateX(${offsetLeft}px)`;
    this.indicator.style.width = `${activeTab.offsetWidth}px`;
  }

  render() {
    return html`
      <div class="tabs" @click=${this.handleTabClick}>
        <div class="tablist" role="tablist">
          <div class="tab-indicator"></div>
          <slot name="tab"></slot>
        </div>
        <div class="panels">
          <slot name="panel"></slot>
        </div>
      </div>
    `;
  }
}


