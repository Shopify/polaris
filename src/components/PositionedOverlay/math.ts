import {Rect} from '@shopify/javascript-utilities/geometry';

export type Alignment = 'center' | 'edge';

export type PreferredPosition = 'above' | 'below' | 'mostSpace';

export function calculateVerticalPosition(
  scrollableContainer: Rect,
  preferredPosition: PreferredPosition,
  activator: Rect,
  desiredHeight: number,
) {
  const relativeSpaceAbove = activator.top - scrollableContainer.top;
  const scrollablecontainerBottom = scrollableContainer.top + scrollableContainer.height;
  const activatorBottom = activator.top + activator.height;
  const relativeSpaceBelow = scrollablecontainerBottom - activatorBottom;
  const padding = 15;
  const top = activator.top + activator.height + padding / 2;
  const bottom = window.innerHeight - activator.top + padding / 2;

  if (preferredPosition === 'above') {
    if (relativeSpaceAbove > desiredHeight || relativeSpaceAbove > relativeSpaceBelow) {
      return {
        top,
        bottom,
        positioning: 'above',
        height: heightPositionedTop(activator.top, scrollableContainer.top, padding),
      };
    }
    return {
      top,
      bottom,
      positioning: 'below',
      height: heightPositionedBottom(activator, scrollableContainer, padding),
    };
  }

  if (preferredPosition === 'below') {
    if (relativeSpaceBelow > desiredHeight || relativeSpaceBelow > relativeSpaceAbove) {
      return {
        top,
        bottom,
        positioning: 'below',
        height: heightPositionedBottom(activator, scrollableContainer, padding),
      };
    }
    return {
      top,
      bottom,
      positioning: 'above',
      height: heightPositionedTop(activator.top, scrollableContainer.top, padding),
    };
  }

  if (relativeSpaceAbove > relativeSpaceBelow) {
    return {
      top,
      bottom,
      positioning: 'above',
      height: heightPositionedTop(activator.top, scrollableContainer.top, padding),
    };
  }
  return {
    top,
    bottom,
    positioning: 'below',
    height: heightPositionedBottom(activator, scrollableContainer, padding),
  };
}

export function calculateHorizontalPosition(
  alignment: Alignment,
  activator: Rect,
  container: Rect,
  overlay: Rect,
) {
  const relativePosition = (activator.center.x - container.left) / container.width;
  const offset = relativePosition < 0.5
    ? 0.5 * activator.width
    : overlay.width - (activator.width / 2);

  if (alignment === 'edge') {
    return activator.center.x - offset;
  }

  if (isCloseToLeftContainerEdge(activator, container)) {
    return container.left;
  }

  if (isCloseToRightContainerEdge(activator, container)) {
    const containerRight = container.left + container.width;
    return  containerRight - overlay.width;
  }

  return activator.center.x -  Math.min(overlay.width / 2, activator.center.x - container.left);
}

function heightPositionedTop(activatorTop: number, scrollablecontainerTop: number, padding: number) {
  return activatorTop - scrollablecontainerTop - padding;
}

function heightPositionedBottom(activator: Rect, scrollablecontainer: Rect, padding: number) {
  const scrollablecontainerBottom = scrollablecontainer.top + scrollablecontainer.height;
  const activatorBottom = activator.top + activator.height;

  return scrollablecontainerBottom - activatorBottom - padding;
}

function isCloseToLeftContainerEdge(activator: Rect, container: Rect) {
  return activator.left - (activator.width / 2) < container.left;
}

function isCloseToRightContainerEdge(activator: Rect, container: Rect) {
  const containerRight = container.left + container.width;

  return activator.center.x + activator.width > containerRight;
}
