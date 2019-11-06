declare module 'hsluv' {
  export type ColorTuple = [number, number, number];
  export function hsluvToRgb(hsluv: ColorTuple): ColorTuple;
  export function rgbToHsluv(rgb: ColorTuple): ColorTuple;
  export function hpluvToRgb(hpluv: ColorTuple): ColorTuple;
  export function rgbToHpluv(rgb: ColorTuple): ColorTuple;
  export function hsluvToHex(hsluv: ColorTuple): string;
  export function hexToHsluv(hex: string): ColorTuple;
  export function hpluvToHex(hpluv: ColorTuple): string;
  export function hexToHpluv(hex: string): ColorTuple;
  export function lchToHpluv(lch: ColorTuple): ColorTuple;
  export function hpluvToLch(hpluv: ColorTuple): ColorTuple;
  export function lchToHsluv(lch: ColorTuple): ColorTuple;
  export function hsluvToLch(hsluv: ColorTuple): ColorTuple;
  export function lchToLuv(lch: ColorTuple): ColorTuple;
  export function luvToLch(luv: ColorTuple): ColorTuple;
  export function xyzToLuv(xyz: ColorTuple): ColorTuple;
  export function luvToXyz(luv: ColorTuple): ColorTuple;
  export function xyzToRgb(xyz: ColorTuple): ColorTuple;
  export function rgbToXyz(rbg: ColorTuple): ColorTuple;
  export function lchToRgb(lch: ColorTuple): ColorTuple;
  export function rgbToLch(rgb: ColorTuple): ColorTuple;
}
