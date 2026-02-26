import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';

class UIPagination extends BaseComponent {
	private _total = 0;
	private _currentPage = 1;
	private _pageSize = 10;

	connectedCallback(): void {
		this.setAttribute('data-ui', 'pagination');
		super.connectedCallback();
	}

	static get observedAttributes(): string[] {
		return ['total', 'current-page', 'page-size'];
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
		switch (name) {
			case 'total':
				this._total = parseInt(newValue, 10) || 0;
				break;
			case 'current-page':
				this._currentPage = parseInt(newValue, 10) || 1;
				break;
			case 'page-size':
				this._pageSize = parseInt(newValue, 10) || 10;
				break;
		}
		this.render();
	}

	get total(): number {
		return this._total;
	}

	set total(value: number) {
		this._total = value;
		this.setAttribute('total', String(value));
	}

	get currentPage(): number {
		return this._currentPage;
	}

	set currentPage(value: number) {
		this._currentPage = value;
		this.setAttribute('current-page', String(value));
	}

	get pageSize(): number {
		return this._pageSize;
	}

	set pageSize(value: number) {
		this._pageSize = value;
		this.setAttribute('page-size', String(value));
	}

	get totalPages(): number {
		return Math.ceil(this._total / this._pageSize);
	}

	private handlePageChange(page: number): void {
		if (page < 1 || page > this.totalPages || page === this._currentPage) {
			return;
		}

		this.currentPage = page;

		this.dispatchEvent(
			new CustomEvent('page-change', {
				detail: {
					page,
					pageSize: this._pageSize,
					total: this._total,
					totalPages: this.totalPages
				},
				bubbles: true,
				composed: true
			})
		);
	}

	private getPageNumbers(): (number | string)[] {
		const total = this.totalPages;
		const current = this._currentPage;

		if (total <= 7) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		// Always show first page, last page, current page, and pages around current
		const pages: (number | string)[] = [];

		if (current <= 3) {
			// Near start: 1 2 3 4 ... last
			pages.push(1, 2, 3, 4, '...', total);
		} else if (current >= total - 2) {
			// Near end: 1 ... last-3 last-2 last-1 last
			pages.push(1, '...', total - 3, total - 2, total - 1, total);
		} else {
			// Middle: 1 ... current-1 current current+1 ... last
			pages.push(1, '...', current - 1, current, current + 1, '...', total);
		}

		return pages;
	}

	render(): void {
		const total = this.totalPages;
		const current = this._currentPage;
		const pages = this.getPageNumbers();

		const startItem = (current - 1) * this._pageSize + 1;
		const endItem = Math.min(current * this._pageSize, this._total);

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="pagination-container">
				<div class="pagination-info">
					${this._total > 0 ? `Showing ${startItem} to ${endItem} of ${this._total}` : 'No results'}
				</div>
				${total > 1 ? `
				<nav class="pagination" role="navigation" aria-label="Pagination">
					<button 
						class="page-btn nav-btn" 
						${current === 1 ? 'disabled' : ''}
						data-page="prev"
						aria-label="Previous page"
					>
						<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
						</svg>
					</button>
					${pages.map(page => {
						if (page === '...') {
							return `<button class="page-btn ellipsis" disabled>...</button>`;
						}
						return `
							<button 
								class="page-btn ${page === current ? 'active' : ''}"
								data-page="${page}"
								aria-label="Page ${page}"
								${page === current ? 'aria-current="page"' : ''}
							>
								${page}
							</button>
						`;
					}).join('')}
					<button 
						class="page-btn nav-btn" 
						${current === total ? 'disabled' : ''}
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

		this.attachEventListeners();
	}

	private attachEventListeners(): void {
		if (!this.shadowRoot) return;

		this.shadowRoot.addEventListener('click', (e) => {
			const target = e.target as HTMLElement;
			const button = target.closest('.page-btn') as HTMLButtonElement;

			if (!button || button.disabled) return;

			const pageData = button.dataset.page;

			if (pageData === 'prev') {
				this.handlePageChange(this._currentPage - 1);
			} else if (pageData === 'next') {
				this.handlePageChange(this._currentPage + 1);
			} else if (pageData) {
				const page = parseInt(pageData, 10);
				if (!isNaN(page)) {
					this.handlePageChange(page);
				}
			}
		});
	}
}

customElements.define('ui-pagination', UIPagination);

export { UIPagination };
