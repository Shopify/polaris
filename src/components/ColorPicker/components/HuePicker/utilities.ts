import {clamp} from '../../../../utilities/clamp';

const VERTICAL_PADDING = 13;

export function calculateDraggerY(
  hue: number,
  sliderHeight: number,
  draggerHeight: number,
) {
  const offset = offsetForHue(hue, sliderHeight, draggerHeight);
  return clamp(offset, 0, sliderHeight);
}

export function hueForDraggerY(y: number, sliderHeight: number) {
  const offsetY = clamp(y, 0, sliderHeight);
  return hueForOffset(offsetY, sliderHeight);
}

function hueForOffset(offset: number, sliderHeight: number): number {
  const selectionHeight = offset - VERTICAL_PADDING;
  const slidableArea = sliderHeight - VERTICAL_PADDING * 2;
  return clamp((selectionHeight / slidableArea) * 360, 0, 360);
}

function offsetForHue(
  hue: number,
  sliderHeight: number,
  draggerHeight: number,
): number {
  const slidableArea = sliderHeight - (draggerHeight + VERTICAL_PADDING);
  return clamp(
    (hue / 360) * slidableArea + VERTICAL_PADDING,
    0,
    sliderHeight - draggerHeight,
  );
}
