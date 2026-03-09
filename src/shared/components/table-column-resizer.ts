import type { TableColumn } from './table.types';

export class ColumnResizer {
  private resizingKey: string | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  private handleMove?: (event: MouseEvent) => void;
  private handleUp?: () => void;

  isResizing(): boolean {
    return Boolean(this.resizingKey);
  }

  startResize(
    event: MouseEvent,
    column: TableColumn,
    onWidthChange: (key: string, width: number) => void
  ): void {
    if (!column.resizable) return;

    event.preventDefault();
    event.stopPropagation();

    const target = event.currentTarget as HTMLElement | null;
    const header = target?.closest('th') as HTMLElement | null;
    if (!header) return;

    if (this.isResizing()) {
      this.stopResize();
    }

    this.resizingKey = column.key;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = header.getBoundingClientRect().width;

    this.handleMove = (moveEvent: MouseEvent) => {
      if (!this.resizingKey) return;
      const delta = moveEvent.clientX - this.resizeStartX;
      const minWidth = column.minWidth ?? 80;
      const maxWidth = column.maxWidth ?? 600;
      const nextWidth = Math.min(maxWidth, Math.max(minWidth, this.resizeStartWidth + delta));
      onWidthChange(this.resizingKey, nextWidth);
    };

    this.handleUp = () => {
      this.stopResize();
    };

    window.addEventListener('mousemove', this.handleMove);
    window.addEventListener('mouseup', this.handleUp);
  }

  stopResize(): void {
    this.resizingKey = null;

    if (this.handleMove) {
      window.removeEventListener('mousemove', this.handleMove);
      this.handleMove = undefined;
    }

    if (this.handleUp) {
      window.removeEventListener('mouseup', this.handleUp);
      this.handleUp = undefined;
    }
  }
}
