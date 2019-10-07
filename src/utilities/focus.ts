import {FOCUSABLE_SELECTOR} from '@shopify/javascript-utilities/focus';
import {isElementInViewport} from './is-element-in-viewport';

type Filter = (element: Element) => void;

export function handleMouseUpByBlurring({
  currentTarget,
}: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
  currentTarget.blur();
}

export function nextFocusableNode(
  node: HTMLElement,
  filter?: Filter,
): HTMLElement | Element | null {
  const allFocusableElements = [
    ...document.querySelectorAll(FOCUSABLE_SELECTOR),
  ];
  const sliceLocation = allFocusableElements.indexOf(node) + 1;
  const focusableElementsAfterNode = allFocusableElements.slice(sliceLocation);

  for (const focusableElement of focusableElementsAfterNode) {
    if (
      isElementInViewport(focusableElement) &&
      (!filter || (filter && filter(focusableElement)))
    ) {
      return focusableElement;
    }
  }

  return null;
}

export function focusNextFocusableNode(node: HTMLElement, filter?: Filter) {
  const nextFocusable = nextFocusableNode(node, filter);
  if (nextFocusable && nextFocusable instanceof HTMLElement) {
    nextFocusable.focus();
    return true;
  }

  return false;
}
