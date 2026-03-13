export function getSlotFromEvent(event: Event): HTMLSlotElement | null {
  const target = event.target;
  return target instanceof HTMLSlotElement ? target : null;
}

export function slotHasAssignedContent(slot: HTMLSlotElement, options: { textOnly?: boolean } = {}): boolean {
  const { textOnly = false } = options;
  const assignedNodes = slot.assignedNodes({ flatten: true });

  if (!textOnly) {
    return assignedNodes.length > 0;
  }

  return assignedNodes.some(node => (node.textContent ?? '').trim().length > 0);
}

export function slotHasContentFromEvent(event: Event, options: { textOnly?: boolean } = {}): boolean {
  const slot = getSlotFromEvent(event);
  return slot ? slotHasAssignedContent(slot, options) : false;
}

export function getAssignedElementsFromSlot(
  root: ShadowRoot | null | undefined,
  slotName: string
): HTMLElement[] {
  if (!root) return [];

  const slot = root.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement | null;
  return slot ? (slot.assignedElements({ flatten: true }) as HTMLElement[]) : [];
}