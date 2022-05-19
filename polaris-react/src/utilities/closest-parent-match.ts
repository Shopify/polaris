export function closestParentMatch(element: HTMLElement, matcher: string) {
  let parent = element.parentElement;

  while (parent) {
    if (parent.matches(matcher)) return parent;
    parent = parent.parentElement;
  }

  return parent;
}
