export function setRootProperty(name: string, value: string) {
  if (document == null) {
    return;
  }

  document.documentElement.style.setProperty(name, value);
}
