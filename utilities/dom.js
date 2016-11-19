// @flow

export function nodeContainsDescendant(
  rootNode: HTMLElement,
  descendant: HTMLElement,
): boolean {
  if (rootNode === descendant) { return true; }

  let parent = descendant.parentNode;

  while (parent != null) {
    if (parent === rootNode) { return true; }
    parent = parent.parentNode;
  }

  return false;
}
