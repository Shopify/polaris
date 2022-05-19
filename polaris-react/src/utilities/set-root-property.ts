export function setRootProperty(
  name: string,
  value: string,
  node?: HTMLElement,
) {
  if (!document) return;

  const element = node || document.documentElement;
  element.style.setProperty(name, value);
}
