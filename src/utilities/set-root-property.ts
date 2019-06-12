export function setRootProperty(
  name: string,
  value: string,
  node: Element | null,
) {
  if (document == null) {
    return;
  }

  const styleNode =
    node && node instanceof HTMLElement ? node : document.documentElement;
  styleNode && styleNode.style.setProperty(name, value);
}
