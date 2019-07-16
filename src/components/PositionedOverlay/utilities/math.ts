import {Rect} from '@shopify/javascript-utilities/geometry';

export type PreferredPosition = 'above' | 'below' | 'mostSpace';
export type PreferredAlignment = 'left' | 'center' | 'right';

export interface Margins {
  activator: number;
  container: number;
  horizontal: number;
}

// scrollbar-width()
const SCROLLBAR_WIDTH = 16;
const BOX_SHADOW_NUDGE = 1;

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
  overlayMargins: Margins,
  preferredAlignment: PreferredAlignment,
) {
  const maximum = containerRect.width - overlayRect.width;
  console.log('CONTAINER WIDTH: ', containerRect.width);
  console.log('OVERLAY WIDTH: ', overlayRect.width);
  console.log('MAXIMUM: ', maximum);

  if (preferredAlignment === 'left') {
    return Math.min(
      maximum,
      Math.max(
        0,
        activatorRect.left - overlayMargins.horizontal + BOX_SHADOW_NUDGE,
      ),
    );
  } else if (preferredAlignment === 'right') {
    const activatorRight = activatorRect.left + activatorRect.width;
    console.log('ACTIVATOR WIDTH: ', activatorRect.width);
    console.log('ACTIVATOR RIGHT: ', activatorRight);
    console.log('OVERLAY LEFT MARGIN: ', overlayMargins.horizontal);
    console.log(
      'OVERLAY WIDTH + OVERLAY LEFT MARGIN: ',
      overlayRect.width +
        overlayMargins.horizontal +
        BOX_SHADOW_NUDGE -
        SCROLLBAR_WIDTH,
    );
    console.log(
      'ACTIVATOR RIGHT - OVERLAY WIDTH + OVERLAY LEFT MARGIN + BOX_SHADOW_NUDGE - SCROLLBAR_WIDTH: ',
      activatorRight -
        (overlayRect.width +
          overlayMargins.horizontal +
          BOX_SHADOW_NUDGE -
          SCROLLBAR_WIDTH),
    );

    return (
      maximum -
      Math.max(
        0,
        activatorRight -
          (overlayRect.width +
            overlayMargins.horizontal +
            BOX_SHADOW_NUDGE -
            SCROLLBAR_WIDTH),
      )
    );
  }

  return Math.min(
    maximum,
    Math.max(0, activatorRect.center.x - overlayRect.width / 2),
  );
}

export function rectIsOutsideOfRect(inner: Rect, outer: Rect) {
  const {center} = inner;

  return center.y < outer.top || center.y > outer.top + outer.height;
}
