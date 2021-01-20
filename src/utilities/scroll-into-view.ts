export function scrollIntoView(element: HTMLElement) {
  requestAnimationFrame(() => {
    if (element) {
      element.scrollIntoView();
    }
  });
}
