export function setRootProperty(
  name: string,
  value: string,
  node?: HTMLElement,
) {
  if (!document) return;

  const styleNode = node ? node : document.documentElement;
  styleNode.style.setProperty(name, value);
}
