import { BaseComponent } from '../../core/base-component';
import '../../shared/components/table';
import '../../shared/components/pagination';
import template from './table-demo.html?raw';
import styles from './table-demo.css?inline';
import type { TableColumn, TableRow } from '../../shared/components/table';
import '../../layouts/app-layout';
type TableDemoData = {
	columns: TableColumn[];
	rows: TableRow[];
	meta?: {
		total: number;
		limit: number;
		skip: number;
	};
};

type ProductsResponse = {
	products: Array<{
		id: number;
		title: string;
		brand: string;
		category: string;
		price: number;
		rating: number;
		stock: number;
	}>;
	total: number;
	limit: number;
	skip: number;
};

class TableDemo extends BaseComponent {
	private hasLoaded = false;
	private loading = false;
	private error: string | null = null;
	private data: TableDemoData | null = null;
	private currentPage = 1;
	private pageSize = 10;

	connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasLoaded) {
			this.hasLoaded = true;
			this.loadData();
		}
	}

	private async loadData(): Promise<void> {
		this.loading = true;
		this.error = null;
		this.render();

		try {
			const skip = (this.currentPage - 1) * this.pageSize;
			const response = await fetch(`https://dummyjson.com/products?limit=${this.pageSize}&skip=${skip}`);

			if (!response.ok) {
				throw new Error(`Request failed: ${response.status}`);
			}

			const payload = (await response.json()) as ProductsResponse;

			const columns: TableColumn[] = [
				{ key: 'title', label: 'Title' },
				{ key: 'brand', label: 'Brand' },
				{ key: 'category', label: 'Category' },
				{ key: 'price', label: 'Price', align: 'right' },
				{ key: 'rating', label: 'Rating', align: 'right' },
				{ key: 'stock', label: 'Stock', align: 'right' },
                { 
                    key: 'actions', 
                    label: 'Actions', 
                    align: 'center',
                    actions: { 
                    edit: true, 
                    delete: true 
                    } 
                }
			];

			const rows: TableRow[] = payload.products.map(product => ({
				title: product.title,
				brand: product.brand,
				category: product.category,
				price: `$${product.price.toFixed(2)}`,
				rating: product.rating.toFixed(1),
				stock: product.stock
			}));

			this.data = {
				columns,
				rows,
				meta: {
					total: payload.total,
					limit: payload.limit,
					skip: payload.skip
				}
			};
			this.loading = false;
			this.render();
		} catch (error) {
			this.loading = false;
			this.error = error instanceof Error ? error.message : 'Unknown error';
			this.render();
		}
	}

	render(): void {
		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			${template}
		`;

		const status = this.shadowRoot!.querySelector('#data-status');

	

		if (status) {
			status.textContent = this.loading
				? 'Loading...'
				: this.error
					? 'Error'
					: 'Loaded';
			status.className = `status ${
				this.loading ? 'loading' : this.error ? 'error' : 'success'
			}`;
		}		

		const table = this.shadowRoot!.querySelector('#demo-table') as
			| (HTMLElement & { data: { columns: TableColumn[]; rows: TableRow[] } })
			| null;

		if (table && this.data) {
			table.data = {
				columns: this.data.columns,
				rows: this.data.rows
			};
		}

		const pagination = this.shadowRoot!.querySelector('ui-pagination');

		if (pagination && this.data?.meta) {
			(pagination as any).total = this.data.meta.total;
			(pagination as any).currentPage = this.currentPage;
			(pagination as any).pageSize = this.pageSize;

			// Remove previous listener if exists
			const newPagination = pagination.cloneNode(true);
			pagination.parentNode?.replaceChild(newPagination, pagination);

			// Listen to page change events
			newPagination.addEventListener('page-change', ((e: CustomEvent) => {
				this.currentPage = e.detail.page;
				this.loadData();
			}) as EventListener);
		}

		// Listen to table row actions
		const tableElement = this.shadowRoot!.querySelector('#demo-table');
		if (tableElement) {
			tableElement.addEventListener('row-action', ((e: CustomEvent) => {
				const { action, row } = e.detail;
				const actionMessage = this.shadowRoot!.querySelector('#action-message') as HTMLElement;
				if (actionMessage) {
					const message = `${action.toUpperCase()} clicked for "${row.title}"`;
					actionMessage.textContent = message;
					actionMessage.style.display = 'block';
					// Auto hide after 5 seconds
					setTimeout(() => {
						const currentMessage = this.shadowRoot!.querySelector('#action-message') as HTMLElement;
						if (currentMessage) {
							currentMessage.style.display = 'none';
						}
					}, 5000);
				}
			}) as EventListener);
		}
	}
}

customElements.define('table-demo', TableDemo);

export { TableDemo };
