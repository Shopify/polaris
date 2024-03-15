import {Rect} from '../../../utilities/geometry';

const MINIMUM_SURROUNDING_SPACE = 16;

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
  const positionedHorizontal =
    preferredPosition === 'right' || preferredPosition === 'left';
  const hasScrollBar = scrollableContainerRect.height > containerRect.height;
  const activatorTop = activatorRect.top;
  const activatorBottom = activatorTop + activatorRect.height;
  const verticalMargins = overlayMargins.activator + overlayMargins.container;
  const minimumSurroundingSpace = verticalMargins
    ? verticalMargins
    : MINIMUM_SURROUNDING_SPACE;
  const spaceAbove = positionedHorizontal
    ? activatorRect.top + activatorRect.height - topBarOffset
    : activatorRect.top - topBarOffset;
  const spaceBelow = positionedHorizontal
    ? containerRect.height - activatorRect.top
    : containerRect.height - activatorRect.top - activatorRect.height;
  const desiredHeight = overlayRect.height;
  const enoughSpaceFromTopEdge =
    spaceAbove >= desiredHeight + minimumSurroundingSpace;
  const enoughSpaceFromBottomEdge =
    spaceBelow >= desiredHeight + minimumSurroundingSpace;
  const containerRectTop = fixed ? 0 : containerRect.top;
  const mostSpaceOnTop =
    (enoughSpaceFromTopEdge ||
      (spaceAbove >= spaceBelow && !enoughSpaceFromBottomEdge)) &&
    (spaceAbove >= desiredHeight || spaceAbove >= spaceBelow);

  const mostSpaceOnBottom =
    (enoughSpaceFromBottomEdge ||
      (spaceBelow >= spaceAbove && !enoughSpaceFromTopEdge)) &&
    (spaceBelow >= desiredHeight || spaceBelow >= spaceAbove);

  const heightIfAbove = enoughSpaceFromTopEdge
    ? desiredHeight - verticalMargins
    : spaceAbove - minimumSurroundingSpace;
  const heightIfBelow = enoughSpaceFromBottomEdge
    ? desiredHeight - verticalMargins
    : spaceBelow - minimumSurroundingSpace;

  let positionIfAbove =
    activatorTop + containerRectTop - heightIfAbove - verticalMargins;
  let positionIfBelow = activatorBottom + containerRectTop;

  if (!positionedHorizontal) {
    if (preferredPosition === 'above') {
      return mostSpaceOnTop
        ? {
            height: heightIfAbove,
            top: positionIfAbove,
            positioning: 'above',
          }
        : {
            height: heightIfBelow,
            top: positionIfBelow,
            positioning: 'below',
          };
    }

    if (preferredPosition === 'below') {
      return mostSpaceOnBottom
        ? {
            height: heightIfBelow,
            top: positionIfBelow,
            positioning: 'below',
          }
        : {
            height: heightIfAbove,
            top: positionIfAbove,
            positioning: 'above',
          };
    }
  }

  if (positionedHorizontal) {
    positionIfAbove = !hasScrollBar
      ? containerRect.height - activatorBottom
      : scrollableContainerRect.bottom - activatorBottom;
    positionIfBelow = activatorTop + containerRect.top;

    return mostSpaceOnBottom
      ? {
          height: heightIfBelow,
          top: positionIfBelow,
          positioning: 'below',
        }
      : {
          height: heightIfAbove,
          bottom: positionIfAbove,
          positioning: 'above',
        };
  }

  if (enoughSpaceFromTopEdge && enoughSpaceFromBottomEdge) {
    return {height: heightIfBelow, top: positionIfBelow, positioning: 'below'};
  }

  return mostSpaceOnBottom
    ? {height: heightIfBelow, top: positionIfBelow, positioning: 'below'}
    : {height: heightIfAbove, top: positionIfAbove, positioning: 'above'};
}

interface HorizontalPosition {
  activatorRect: Rect;
  overlayRect: Rect;
  containerRect: Rect;
  overlayMargins: Margins;
  preferredAlignment: PreferredAlignment;
  preferredHorizontalPosition?: 'left' | 'right';
  overlayMinWidth: number;
}

export function calculateHorizontalPosition({
  activatorRect,
  overlayRect,
  containerRect,
  overlayMargins,
  preferredAlignment,
  preferredHorizontalPosition,
  overlayMinWidth = 0,
}: HorizontalPosition) {
  const maximumWidth = containerRect.width - overlayRect.width;
  const activatorRight =
    containerRect.width - (activatorRect.left + activatorRect.width);

  const minimumSurroundingSpace = overlayMargins.horizontal
    ? overlayMargins.horizontal
    : MINIMUM_SURROUNDING_SPACE;
  const desiredWidth = overlayRect.width;
  const distanceToLeftEdge = activatorRect.left;
  const distanceToRightEdge = containerRect.width - activatorRect.right;
  const enoughSpaceFromLeftEdge =
    distanceToLeftEdge >=
    (overlayMinWidth || desiredWidth) + minimumSurroundingSpace;
  const enoughSpaceFromRightEdge =
    distanceToRightEdge >=
    (overlayMinWidth || desiredWidth) + minimumSurroundingSpace;

  if (!preferredHorizontalPosition) {
    if (preferredAlignment === 'left') {
      return {
        left: Math.min(
          maximumWidth,
          Math.max(0, activatorRect.left - minimumSurroundingSpace),
        ),
        width: null,
      };
    } else if (preferredAlignment === 'right') {
      return {
        left: Math.min(
          maximumWidth,
          Math.max(0, activatorRight - minimumSurroundingSpace),
        ),
        width: null,
      };
    }
  }

  if (preferredHorizontalPosition) {
    const positionIfRight = activatorRect.left + activatorRect.width;
    const positionIfLeft = containerRect.width - activatorRect.left;

    const widthIfLeft = enoughSpaceFromLeftEdge
      ? desiredWidth
      : Math.min(distanceToLeftEdge - minimumSurroundingSpace, desiredWidth);

    const widthIfRight = enoughSpaceFromRightEdge
      ? desiredWidth
      : Math.min(distanceToRightEdge - minimumSurroundingSpace, desiredWidth);

    if (preferredHorizontalPosition === 'right') {
      return enoughSpaceFromRightEdge
        ? {
            left: positionIfRight,
            width:
              overlayMinWidth && widthIfRight < overlayMinWidth
                ? overlayMinWidth
                : null,
          }
        : {right: positionIfLeft, width: null};
    } else {
      return enoughSpaceFromLeftEdge
        ? {
            right: positionIfLeft,
            width:
              overlayMinWidth && widthIfLeft < overlayMinWidth
                ? overlayMinWidth
                : null,
          }
        : {
            left: positionIfRight,
            width: null,
          };
    }
  }

  return {
    width: null,
    left: Math.min(
      maximumWidth,
      Math.max(
        0,
        activatorRect.center.x - overlayRect.width / 2 + containerRect.left,
      ),
    ),
  };
}

export function rectIsOutsideOfRect(inner: Rect, outer: Rect) {
  const {center} = inner;

  return center.y < outer.top || center.y > outer.top + outer.height;
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
