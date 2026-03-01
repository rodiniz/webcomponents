import { LitElement, html, css, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from '../../core/template';
import themeStyles from '../../styles/theme.css?inline';

@customElement('ui-pagination')
export class UIPagination extends LitElement {
  static styles = [unsafeCSS(themeStyles)];

  @property({ type: Number }) total: number = 0;
  @property({ type: Number, attribute: 'current-page' }) currentPage: number = 1;
  @property({ type: Number, attribute: 'page-size' }) pageSize: number = 10;

  connectedCallback(): void {
    this.setAttribute('data-ui', 'pagination');
    super.connectedCallback();
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  private handlePageChange(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }

    this.currentPage = page;

    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          page,
          pageSize: this.pageSize,
          total: this.total,
          totalPages: this.totalPages
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private getPageNumbers(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (current <= 3) {
      pages.push(1, 2, 3, 4, '...', total);
    } else if (current >= total - 2) {
      pages.push(1, '...', total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total);
    }

    return pages;
  }

  private handleClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const button = target.closest('.page-btn') as HTMLButtonElement;

    if (!button || button.disabled) return;

    const pageData = button.dataset.page;

    if (pageData === 'prev') {
      this.handlePageChange(this.currentPage - 1);
    } else if (pageData === 'next') {
      this.handlePageChange(this.currentPage + 1);
    } else if (pageData) {
      const page = parseInt(pageData, 10);
      if (!isNaN(page)) {
        this.handlePageChange(page);
      }
    }
  };

  render() {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages = this.getPageNumbers();

    const startItem = (current - 1) * this.pageSize + 1;
    const endItem = Math.min(current * this.pageSize, this.total);

    const infoText = this.total > 0 
      ? `Showing ${startItem} to ${endItem} of ${this.total}` 
      : 'No results';

    const renderPageButton = (page: number | string) => {
      if (page === '...') {
        return html`<button class="page-btn ellipsis" disabled>...</button>`;
      }
      const isActive = page === current;
      return html`
        <button 
          class=${classMap({ 'page-btn': true, 'active': isActive })}
          data-page="${page}"
          aria-label="Page ${page}"
          aria-current=${isActive ? 'page' : nothing}
        >
          ${page}
        </button>
      `;
    };

    return html`
      <div class="pagination-container" @click=${this.handleClick}>
        <div class="pagination-info">${infoText}</div>
        ${total > 1 ? html`
        <nav class="pagination" role="navigation" aria-label="Pagination">
          <button 
            class="page-btn nav-btn" 
            ?disabled=${current === 1}
            data-page="prev"
            aria-label="Previous page"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          ${pages.map(renderPageButton)}
          <button 
            class="page-btn nav-btn" 
            ?disabled=${current === total}
            data-page="next"
            aria-label="Next page"
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </nav>
        ` : ''}
      </div>
    `;
  }
}

import { nothing } from 'lit';
