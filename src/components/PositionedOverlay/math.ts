import {Rect} from '@shopify/javascript-utilities/geometry';

export type Alignment = 'center' | 'edge';

export type PreferredPosition = 'above' | 'below' | 'mostSpace';

const PADDING = 15;

export function calculateVerticalPosition(
  scrollableContainer: Rect,
  preferredPosition: PreferredPosition,
  activator: Rect,
  maxHeight: number,
  intrinsicHeight: number,
) {
  const relativeSpaceAbove = activator.top - scrollableContainer.top;
  const scrollablecontainerBottom = scrollableContainer.top + scrollableContainer.height;
  const activatorBottom = activator.top + activator.height;
  const relativeSpaceBelow = scrollablecontainerBottom - activatorBottom;
  const top = activator.top + activator.height + PADDING / 2;
  const bottom = window.innerHeight - activator.top + PADDING / 2;

  const desiredHeight = Math.min(intrinsicHeight, maxHeight);

  if (preferredPosition === 'above') {
    if (relativeSpaceAbove > (desiredHeight + PADDING) || relativeSpaceAbove > relativeSpaceBelow) {
      return {
        top,
        bottom,
        positioning: 'above',
        height: Math.min(heightPositionedTop(activator.top, scrollableContainer.top, PADDING), desiredHeight),
      };
    }
    return {
      top,
      bottom,
      positioning: 'below',
      height: Math.min(heightPositionedBottom(activator, scrollableContainer, PADDING), desiredHeight),
    };
  }

  if (preferredPosition === 'below') {
    if (relativeSpaceBelow > (desiredHeight + PADDING) || relativeSpaceBelow > relativeSpaceAbove) {
      return {
        top,
        bottom,
        positioning: 'below',
        height: Math.min(heightPositionedBottom(activator, scrollableContainer, PADDING), desiredHeight),
      };
    }
    return {
      top,
      bottom,
      positioning: 'above',
      height: Math.min(heightPositionedTop(activator.top, scrollableContainer.top, PADDING), desiredHeight),
    };
  }

  if (relativeSpaceAbove > relativeSpaceBelow) {
    return {
      top,
      bottom,
      positioning: 'above',
      height: Math.min(heightPositionedTop(activator.top, scrollableContainer.top, PADDING), desiredHeight),
    };
  }
  return {
    top,
    bottom,
    positioning: 'below',
    height: Math.min(heightPositionedBottom(activator, scrollableContainer, PADDING), desiredHeight),
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

  if (relativePosition > 0.85) {
    const containerRight = container.left + container.width;
    return  containerRight - overlay.width - (PADDING / 2);
  }

  if (relativePosition < 0.15) {
    return  container.left + (PADDING / 2);
  }

  return activator.center.x - overlay.width / 2;
}

function heightPositionedTop(activatorTop: number, scrollablecontainerTop: number, padding: number) {
  return activatorTop - scrollablecontainerTop - padding;
}

function heightPositionedBottom(activator: Rect, scrollablecontainer: Rect, padding: number) {
  const scrollablecontainerBottom = scrollablecontainer.top + scrollablecontainer.height;
  const activatorBottom = activator.top + activator.height;

  return scrollablecontainerBottom - activatorBottom - padding;
}
