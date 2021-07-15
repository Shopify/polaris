export function scrollIntoView(element: HTMLElement, container: HTMLElement) {
  requestAnimationFrame(() => {
    if (element) {
      const offset = element.offsetTop - container.scrollTop;
      container.scrollBy({top: offset});
    }
  });
}
