import {Rect} from '@shopify/javascript-utilities/geometry';

export type PreferredPosition = 'above' | 'below' | 'mostSpace';

export type PreferredAlignment = 'left' | 'center' | 'right';

export interface Margins {
  activator: number;
  container: number;
  horizontal: number;
}

export function calculateVerticalPosition(
  activatorRect: Rect,
  overlayRect: Rect,
  overlayMargins: Margins,
  scrollableContainerRect: Rect,
  containerRect: Rect,
  preferredPosition: PreferredPosition,
  fixed: boolean | undefined,
) {
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;
  const spaceAbove = activatorRect.top;
  const spaceBelow =
    containerRect.height - activatorRect.top - activatorRect.height;

  const desiredHeight = overlayRect.height;
  const verticalMargins = overlayMargins.activator + overlayMargins.container;
  const minimumSpaceToScroll = overlayMargins.container;
  const distanceToTopScroll =
    activatorRect.top - Math.max(scrollableContainerRect.top, 0);
  const distanceToBottomScroll =
    containerRect.top +
    Math.min(
      containerRect.height,
      scrollableContainerRect.top + scrollableContainerRect.height,
    ) -
    (activatorRect.top + activatorRect.height);
  const enoughSpaceFromTopScroll = distanceToTopScroll >= minimumSpaceToScroll;
  const enoughSpaceFromBottomScroll =
    distanceToBottomScroll >= minimumSpaceToScroll;
  const heightIfBelow = Math.min(spaceBelow, desiredHeight);
  const heightIfAbove = Math.min(spaceAbove, desiredHeight);
  const containerRectTop = fixed ? 0 : containerRect.top;

  const positionIfAbove = {
    height: heightIfAbove - verticalMargins,
    top: activatorTop + containerRectTop - heightIfAbove,
    positioning: 'above',
  };

  const positionIfBelow = {
    height: heightIfBelow - verticalMargins,
    top: activatorBottom + containerRectTop,
    positioning: 'below',
  };

  if (preferredPosition === 'above') {
    return (enoughSpaceFromTopScroll ||
      (distanceToTopScroll >= distanceToBottomScroll &&
        !enoughSpaceFromBottomScroll)) &&
      (spaceAbove > desiredHeight || spaceAbove > spaceBelow)
      ? positionIfAbove
      : positionIfBelow;
  }

  if (preferredPosition === 'below') {
    return (enoughSpaceFromBottomScroll ||
      (distanceToBottomScroll >= distanceToTopScroll &&
        !enoughSpaceFromTopScroll)) &&
      (spaceBelow > desiredHeight || spaceBelow > spaceAbove)
      ? positionIfBelow
      : positionIfAbove;
  }

  if (enoughSpaceFromTopScroll && enoughSpaceFromBottomScroll) {
    return spaceAbove > spaceBelow ? positionIfAbove : positionIfBelow;
  }

  return distanceToTopScroll > minimumSpaceToScroll
    ? positionIfAbove
    : positionIfBelow;
}

export function calculateHorizontalPosition(
  activatorRect: Rect,
  overlayRect: Rect,
  containerRect: Rect,
  preferredAlignment: PreferredAlignment,
) {
  const borderWidth = 1;
  const rightHorizontalPosition = activatorRect.left + activatorRect.width - overlayRect.width - borderWidth;
  const leftHorizontalPosition = activatorRect.left + borderWidth;
  const centerHorizontalPosition = activatorRect.center.x - overlayRect.width / 2;

  // If right aligned or the popover goes over the right side of the page
  if(preferredAlignment === 'right' || centerHorizontalPosition + overlayRect.width > containerRect.width){
    return rightHorizontalPosition;
  }
  // If left aligned or the popover goes over the left side of the page
  else if( preferredAlignment === 'left' || centerHorizontalPosition < 0){
    return leftHorizontalPosition;
  }

  return centerHorizontalPosition;
}

export function rectIsOutsideOfRect(inner: Rect, outer: Rect) {
  const {center} = inner;

  return center.y < outer.top || center.y > outer.top + outer.height;
}
