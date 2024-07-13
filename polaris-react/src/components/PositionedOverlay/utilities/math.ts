import {Rect} from '../../../utilities/geometry';

const MINIMUM_SURROUNDING_SPACE = 16;

export type PreferredPosition =
  | 'above'
  | 'below'
  | 'mostSpace'
  | 'right'
  | 'left'
  | 'cover';

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
  // const hasScrollBar = scrollableContainerRect.height > containerRect.height;
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

  const positionIfAbove =
    activatorTop + containerRectTop - heightIfAbove - verticalMargins;
  const positionIfBelow = activatorBottom + containerRectTop;

  console.table([
    {variable: 'activatorRect.top', value: activatorRect.top},
    {variable: 'containerRect.top', value: containerRect.top},
    {
      variable: 'scrollableContainerRect.top',
      value: scrollableContainerRect.top,
    },

    {variable: 'overlayRect.height', value: overlayRect.height},
    {variable: 'activatorRect.height', value: activatorRect.height},
    {variable: 'containerRect.height', value: containerRect.height},
    {
      variable: 'scrollableContainerRect.height',
      value: scrollableContainerRect.height,
    },
    {variable: 'verticalMargins', value: verticalMargins},
    {
      variable: 'spaceAbove',
      value: spaceAbove,
    },
    {
      variable: 'spaceBelow',
      value: spaceBelow,
    },
    {
      variable: 'enoughSpaceFromTopEdge',
      value: enoughSpaceFromTopEdge,
    },
    {
      variable: 'enoughSpaceFromBottomEdge',
      value: enoughSpaceFromBottomEdge,
    },
    {
      variable: 'mostSpaceOnTop',
      value: mostSpaceOnTop,
    },
    {
      variable: 'mostSpaceOnBottom',
      value: mostSpaceOnBottom,
    },
    {
      variable: 'positionIfAbove',
      value: positionIfAbove,
    },
    {
      variable: 'positionIfBelow',
      value: positionIfBelow,
    },
    {variable: 'desiredHeight', value: desiredHeight},
    {
      variable: 'heightIfAbove',
      value: heightIfAbove,
    },
    {
      variable: 'heightIfBelow',
      value: heightIfBelow,
    },
    {
      variable: 'hasScrollBar',
      value: scrollableContainerRect.height > containerRect.height,
    },
  ]);

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

  // if (positionedHorizontal) {
  //   positionIfAbove = !hasScrollBar
  //     ? containerRect.height - activatorBottom
  //     : scrollableContainerRect.bottom - activatorBottom;
  //   positionIfBelow = activatorTop + containerRect.top;

  //   return mostSpaceOnBottom
  //     ? {
  //         height: heightIfBelow,
  //         top: positionIfBelow,
  //         positioning: 'below',
  //       }
  //     : {
  //         height: heightIfAbove,
  //         bottom: positionIfAbove,
  //         positioning: 'above',
  //       };
  // }

  if (enoughSpaceFromTopEdge && enoughSpaceFromBottomEdge) {
    return {height: heightIfBelow, top: positionIfBelow, positioning: 'below'};
  }

  return mostSpaceOnBottom
    ? {height: heightIfBelow, top: positionIfBelow, positioning: 'below'}
    : {height: heightIfAbove, top: positionIfAbove, positioning: 'above'};
}

export function calculateHorizontalPosition(
  activatorRect: Rect,
  overlayRect: Rect,
  containerRect: Rect,
  overlayMargins: Margins,
  preferredAlignment: PreferredAlignment,
) {
  const maximum = containerRect.width - overlayRect.width;

  if (preferredAlignment === 'left') {
    return Math.min(
      maximum,
      Math.max(0, activatorRect.left - overlayMargins.horizontal),
    );
  } else if (preferredAlignment === 'right') {
    const activatorRight =
      containerRect.width - (activatorRect.left + activatorRect.width);

    return Math.min(
      maximum,
      Math.max(0, activatorRight - overlayMargins.horizontal),
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
