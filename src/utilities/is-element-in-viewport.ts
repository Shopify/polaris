export function isElementInViewport(element: Element) {
  const {top, left, bottom, right} = element.getBoundingClientRect();

  return (
    top >= 0 &&
    right <= window.innerWidth &&
    bottom <= window.innerHeight &&
    left >= 0
  );
}
