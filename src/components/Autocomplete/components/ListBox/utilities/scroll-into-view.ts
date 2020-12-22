export function scrollIntoView(
  element: HTMLElement,
  scrollableContainer: Element,
) {
  const elementTop = element.offsetTop;
  const elementBottom = elementTop + element.clientHeight;
  const viewportTop = scrollableContainer.scrollTop;
  const viewportBottom = viewportTop + scrollableContainer.clientHeight;

  let direction: boolean | undefined;

  if (elementTop < viewportTop) {
    direction = true;
  } else if (elementBottom > viewportBottom) {
    direction = false;
  }

  if (typeof direction === 'boolean') {
    requestAnimationFrame(() => {
      if (element) {
        element.scrollIntoView(direction);
      }
    });
  }
}
