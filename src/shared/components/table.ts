import { BaseComponent } from '../../core/base-component';
import styles from '../../styles/theme.css?inline';
import './button';

export type TableColumn = {
	key: string;
	label: string;
	align?: 'left' | 'center' | 'right';
	visible?: boolean;
	actions?: {
		edit?: boolean;
		delete?: boolean;
	};
};

export type TableRow = Record<string, unknown>;

type ActionEventDetail = {
	row: TableRow;
	rowIndex: number;
};

class UITable extends BaseComponent {
	connectedCallback(): void {
		this.setAttribute('data-ui', 'table');
		super.connectedCallback();
	}
	private columns: TableColumn[] = [];
	private rows: TableRow[] = [];

	set data(value: { columns: TableColumn[]; rows: TableRow[] }) {
		this.columns = value.columns;
		this.rows = value.rows;
		this.render();
	}

	get data(): { columns: TableColumn[]; rows: TableRow[] } {
		return { columns: this.columns, rows: this.rows };
	}

	render(): void {
		const visibleColumns = this.columns.filter(col => col.visible !== false);

		const header = visibleColumns
			.map(
				column =>
					`<th class="align-${column.align ?? 'left'}">${column.label}</th>`
			)
			.join('');

		const body = this.rows
			.map(
				(row, rowIndex) =>
					`<tr data-row-index="${rowIndex}">${visibleColumns
						.map(
							column => {
								if (column.actions) {
									return `<td class="align-center actions-cell">
										${column.actions.edit ? `<ui-button variant="primary" class='action-btn' icon='edit' size="sm" data-action="edit" data-row-index="${rowIndex}">Edit</ui-button>` : ''}
										${column.actions.delete ? `<ui-button variant="danger" class='action-btn' icon='trash' size="sm" data-action="delete" data-row-index="${rowIndex}">Delete</ui-button>` : ''}
									</td>`;
								}
								return `<td class="align-${column.align ?? 'left'}">${String(
									row[column.key] ?? ''
								)}</td>`;
							}
						)
						.join('')}</tr>`
			)
			.join('');

		this.shadowRoot!.innerHTML = `
			<style>${styles}</style>
			<div class="table-wrap">
				<table>
					<thead><tr>${header}</tr></thead>
					<tbody>${body}</tbody>
				</table>
			</div>
		`;

		this.shadowRoot!.querySelectorAll('.action-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const target = e.currentTarget as HTMLElement;
				const action = target.dataset.action as 'edit' | 'delete';
				const rowIndex = parseInt(target.dataset.rowIndex || '0', 10);
				
				// Fire separate event based on action type
				const eventName = action === 'edit' ? 'edit-action' : 'delete-action';
				this.dispatchEvent(new CustomEvent(eventName, {
					bubbles: true,
					composed: true,
					detail: { row: this.rows[rowIndex], rowIndex }
				}));
			});
		});
	}
}

export { UITable };

customElements.define('ui-table', UITable);
