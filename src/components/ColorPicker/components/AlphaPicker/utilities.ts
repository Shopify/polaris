import {clamp} from '../../../../utilities/clamp';

const VERTICAL_PADDING = 13;

export function calculateDraggerY(
  alpha: number,
  sliderHeight: number,
  draggerHeight: number,
) {
  const offset = offsetForAlpha(alpha, sliderHeight, draggerHeight);
  return clamp(offset, 0, sliderHeight);
}

export function alphaForDraggerY(y: number, sliderHeight: number) {
  const offsetY = clamp(y, 0, sliderHeight);
  return alphaForOffset(offsetY, sliderHeight);
}

export function alphaForOffset(offset: number, sliderHeight: number): number {
  const selectionHeight = offset - VERTICAL_PADDING;
  const slidableArea = sliderHeight - VERTICAL_PADDING * 2;
  return clamp(1 - selectionHeight / slidableArea, 0, 1);
}

function offsetForAlpha(
  alpha: number,
  sliderHeight: number,
  draggerHeight: number,
) {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(
    (1 - alpha) * slidableArea + VERTICAL_PADDING,
    0,
    sliderHeight - draggerHeight,
  );
}
