import {Rect} from '../../../utilities/geometry';

export type PreferredPosition =
  | 'above'
  | 'below'
  | 'mostSpace'
  | 'right'
  | 'left';

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
  topBarOffset = 0,
) {
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;
  const spaceAbove = activatorRect.top - topBarOffset;
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

  const positionIfAbove =
    preferredPosition === 'right' || preferredPosition === 'left'
      ? {
          height: desiredHeight - verticalMargins,
          top: activatorBottom + containerRectTop - heightIfAbove,
          positioning: 'above',
        }
      : {
          height: heightIfAbove - verticalMargins,
          top: activatorTop + containerRectTop - heightIfAbove,
          positioning: 'above',
        };

  const positionIfBelow =
    preferredPosition === 'right' || preferredPosition === 'left'
      ? {
          height: desiredHeight - verticalMargins,
          top: activatorTop + containerRectTop,
          positioning: 'below',
        }
      : {
          height: heightIfBelow - verticalMargins,
          top: activatorBottom + containerRectTop,
          positioning: 'below',
        };

  const mostSpaceOnTop =
    (enoughSpaceFromTopScroll ||
      (distanceToTopScroll >= distanceToBottomScroll &&
        !enoughSpaceFromBottomScroll)) &&
    (spaceAbove > desiredHeight || spaceAbove > spaceBelow);

  const mostSpaceOnBottom =
    (enoughSpaceFromBottomScroll ||
      (distanceToBottomScroll >= distanceToTopScroll &&
        !enoughSpaceFromTopScroll)) &&
    (spaceBelow > desiredHeight || spaceBelow > spaceAbove);

  if (preferredPosition === 'above') {
    return mostSpaceOnTop ? positionIfAbove : positionIfBelow;
  }

  if (preferredPosition === 'below') {
    return mostSpaceOnBottom ? positionIfBelow : positionIfAbove;
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
  scrollableContainerRect: Rect,
  preferredHorizontalPosition?: 'left' | 'right',
) {
  const maximum = containerRect.width - overlayRect.width;
  const activatorRight =
    containerRect.width - (activatorRect.left + activatorRect.width);

  if (!preferredHorizontalPosition) {
    if (preferredAlignment === 'left') {
      return {
        position: Math.min(
          maximum,
          Math.max(0, activatorRect.left - overlayMargins.horizontal),
        ),
        width: 0,
      };
    } else if (preferredAlignment === 'right') {
      return {
        position: Math.min(
          maximum,
          Math.max(0, activatorRight - overlayMargins.horizontal),
        ),
        width: 0,
      };
    }
  }

  if (preferredHorizontalPosition) {
    const minimumSpaceToScroll = overlayMargins.horizontal;
    const desiredWidth = overlayRect.width;
    const spaceLeft = activatorRect.left;
    const spaceRight = scrollableContainerRect.width - activatorRect.right;
    const distanceToLeftScroll = activatorRect.left;
    const distanceToRightScroll = containerRect.width - activatorRect.right;
    const enoughSpaceFromLeftScroll =
      distanceToLeftScroll >= minimumSpaceToScroll;
    const enoughSpaceFromRightScroll =
      distanceToRightScroll >= minimumSpaceToScroll;
    const widthIfLeft = Math.min(spaceLeft, desiredWidth);
    const widthIfRight = Math.min(spaceRight, desiredWidth);

    const mostSpaceOnLeft =
      (enoughSpaceFromLeftScroll ||
        (distanceToLeftScroll >= distanceToRightScroll &&
          !enoughSpaceFromRightScroll)) &&
      (spaceLeft > desiredWidth || spaceLeft > spaceRight);

    const mostSpaceOnRight =
      (enoughSpaceFromRightScroll ||
        (distanceToRightScroll >= distanceToLeftScroll &&
          !enoughSpaceFromLeftScroll)) &&
      (spaceRight > desiredWidth || spaceRight > spaceLeft);

    const positionIfRight =
      activatorRect.left + activatorRect.width + containerRect.left;
    const positionIfLeft =
      activatorRect.left - overlayRect.width + containerRect.left;

    if (preferredHorizontalPosition === 'right') {
      return enoughSpaceFromRightScroll
        ? {position: positionIfRight, width: widthIfRight}
        : {position: positionIfLeft, width: widthIfLeft};
    } else {
      return enoughSpaceFromLeftScroll
        ? {position: positionIfLeft, width: widthIfLeft}
        : {
            position: positionIfRight,
            width: widthIfRight,
          };
    }
  }

  return {
    width: 0,
    position: Math.min(
      maximum,
      Math.max(
        0,
        activatorRect.center.x - overlayRect.width / 2 + containerRect.left,
      ),
    ),
  };
}

export function rectIsOutsideOfRect(inner: Rect, outer: Rect) {
  const {center} = inner;

  return (
    center.y < outer.top ||
    center.y > outer.top + outer.height ||
    inner.left < outer.left ||
    inner.left + inner.width > outer.left + outer.width
  );
}

export function intersectionWithViewport(
  rect: Rect,
  viewport: Rect = windowRect(),
) {
  const top = Math.max(rect.top, 0);
  const left = Math.max(rect.left, 0);
  const bottom = Math.min(rect.top + rect.height, viewport.height);
  const right = Math.min(rect.left + rect.width, viewport.width);

  return new Rect({
    top,
    left,
    height: bottom - top,
    width: right - left,
  });
}

export function windowRect() {
  return new Rect({
    top: window.scrollY,
    left: window.scrollX,
    height: window.innerHeight,
    width: document.body.clientWidth,
  });
}
