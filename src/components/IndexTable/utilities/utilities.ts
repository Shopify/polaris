export function getTableHeadingsBySelector(
  wrapperElement: HTMLElement | null,
  selector: string,
) {
  return wrapperElement
    ? Array.from(wrapperElement.querySelectorAll<HTMLElement>(selector))
    : [];
}
