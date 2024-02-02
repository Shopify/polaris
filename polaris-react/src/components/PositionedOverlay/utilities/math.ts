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
  const heightIfAbove = Math.min(spaceAbove, desiredHeight);
  const heightIfBelow = Math.min(spaceBelow, desiredHeight);
  const containerRectTop = fixed ? 0 : containerRect.top;

  const positionIfAbove =
    preferredPosition === 'right' || preferredPosition === 'left'
      ? {
          height: heightIfAbove - verticalMargins,
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
          height: heightIfBelow - verticalMargins,
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
  _scrollableContainerRect: Rect,
  preferredHorizontalPosition?: 'left' | 'right',
  overlayMinWidth = 0,
) {
  const maximumWidth = containerRect.width - overlayRect.width;
  const activatorRight =
    containerRect.width - (activatorRect.left + activatorRect.width);

  const minimumSurroundingSpace = overlayMargins.horizontal
    ? overlayMargins.horizontal
    : 16;
  const desiredWidth = overlayRect.width;
  const distanceToLeftEdge = activatorRect.left;
  const distanceToRightEdge = containerRect.width - activatorRect.right;
  const enoughSpaceFromLeftEdge =
    distanceToLeftEdge >= (overlayMinWidth || desiredWidth);
  const enoughSpaceFromRightEdge =
    distanceToRightEdge >= (overlayMinWidth || desiredWidth);

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

    const widthIfLeft = Math.min(
      distanceToLeftEdge - minimumSurroundingSpace,
      desiredWidth,
    );

    const widthIfRight = Math.min(
      distanceToRightEdge - minimumSurroundingSpace,
      desiredWidth,
    );

    console.table([
      {variable: 'maximumWidth', value: maximumWidth},
      {variable: 'desiredWidth', value: desiredWidth},
      {variable: 'overlayMinWidth', value: overlayMinWidth},
      {variable: 'activatorRect.width', value: activatorRect.width},
      {variable: 'overlayRect.width', value: overlayRect.width},
      {variable: 'containerRect.width', value: containerRect.width},
      {
        variable: 'widthIfLeft',
        value: widthIfLeft,
      },
      {
        variable: 'widthIfRight',
        value: widthIfRight,
      },

      {
        variable: 'activatorRect.left',
        value: activatorRect.left,
      },
      {
        variable: 'activatorRect.right',
        value: activatorRect.right,
      },
      {
        variable: 'enoughSpaceFromLeftEdge',
        value: enoughSpaceFromLeftEdge,
      },
      {
        variable: 'enoughSpaceFromRightEdge',
        value: enoughSpaceFromRightEdge,
      },
      {
        variable: 'distanceToLeftEdge',
        value: distanceToLeftEdge,
      },
      {
        variable: 'distanceToRightEdge',
        value: distanceToRightEdge,
      },

      {
        variable: 'positionIfLeft',
        value: positionIfLeft,
      },
      {
        variable: 'positionIfRight',
        value: positionIfRight,
      },
    ]);

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
