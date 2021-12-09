export const colorPurpleText = 'rgb(80, 73, 90)';
export const colorPurpleDarker = 'rgb(35, 0, 81)';
export const colorPurpleDark = 'rgb(80, 36, 143)';
export const colorPurple = 'rgb(156, 106, 222)';
export const colorPurpleLight = 'rgb(227, 208, 255)';
export const colorPurpleLighter = 'rgb(246, 240, 253)';
export const colorIndigoText = 'rgb(62, 65, 85)';
export const colorIndigoDarker = 'rgb(0, 6, 57)';
export const colorIndigoDark = 'rgb(32, 46, 120)';
export const colorIndigo = 'rgb(92, 106, 196)';
export const colorIndigoLight = 'rgb(179, 188, 245)';
export const colorIndigoLighter = 'rgb(244, 245, 250)';
export const colorBlueText = 'rgb(62, 78, 87)';
export const colorBlueDarker = 'rgb(0, 20, 41)';
export const colorBlueDark = 'rgb(8, 78, 138)';
export const colorBlue = 'rgb(0, 111, 187)';
export const colorBlueLight = 'rgb(180, 225, 250)';
export const colorBlueLighter = 'rgb(235, 245, 250)';
export const colorTealText = 'rgb(64, 83, 82)';
export const colorTealDarker = 'rgb(0, 49, 53)';
export const colorTealDark = 'rgb(0, 132, 142)';
export const colorTeal = 'rgb(71, 193, 191)';
export const colorTealLight = 'rgb(183, 236, 236)';
export const colorTealLighter = 'rgb(224, 245, 245)';
export const colorGreenText = 'rgb(65, 79, 62)';
export const colorGreenDarker = 'rgb(23, 54, 48)';
export const colorGreenDark = 'rgb(16, 128, 67)';
export const colorGreen = 'rgb(80, 184, 60)';
export const colorGreenLight = 'rgb(187, 229, 179)';
export const colorGreenLighter = 'rgb(227, 241, 223)';
export const colorYellowText = 'rgb(89, 81, 48)';
export const colorYellowDarker = 'rgb(87, 59, 0)';
export const colorYellowDark = 'rgb(138, 97, 22)';
export const colorYellow = 'rgb(238, 194, 0)';
export const colorYellowLight = 'rgb(255, 234, 138)';
export const colorYellowLighter = 'rgb(252, 241, 205)';
export const colorOrangeText = 'rgb(89, 68, 48)';
export const colorOrangeDarker = 'rgb(74, 21, 4)';
export const colorOrangeDark = 'rgb(192, 87, 23)';
export const colorOrange = 'rgb(244, 147, 66)';
export const colorOrangeLight = 'rgb(255, 197, 139)';
export const colorOrangeLighter = 'rgb(252, 235, 219)';
export const colorRedText = 'rgb(88, 60, 53)';
export const colorRedDarker = 'rgb(51, 1, 1)';
export const colorRedDark = 'rgb(191, 7, 17)';
export const colorRed = 'rgb(222, 54, 24)';
export const colorRedLight = 'rgb(254, 173, 154)';
export const colorRedLighter = 'rgb(251, 234, 229)';
export const colorInk = 'rgb(33, 43, 54)';
export const colorInkLight = 'rgb(69, 79, 91)';
export const colorInkLighter = 'rgb(99, 115, 129)';
export const colorInkLightest = 'rgb(145, 158, 171)';
export const colorSkyDark = 'rgb(196, 205, 213)';
export const colorSky = 'rgb(223, 227, 232)';
export const colorSkyLight = 'rgb(244, 246, 248)';
export const colorSkyLighter = 'rgb(249, 250, 251)';
export const colorBlack = 'rgb(0, 0, 0)';
export const colorWhite = 'rgb(255, 255, 255)';
export const durationNone = 0;
export const durationFast = 100;
export const durationBase = 200;
export const durationSlow = 300;
export const durationSlower = 400;
export const durationSlowest = 500;
export const spacingNone = 0;
export const spacingExtraTight = '4px';
export const spacingTight = '8px';
export const spacingBaseTight = '12px';
export const spacingBase = '16px';
export const spacingLoose = '20px';
export const spacingExtraLoose = '32px';
export const fontStackBase = "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif";
export const fontStackMonospace = "Monaco, Consolas, 'Lucida Console', monospace";

// When this package shipped only CJS, bundlers applied some cjs-to-esm interop
// dark magic that meant you could access content from index.common.js from an
// esm file in many ways.
// The following were all valid ways to access tokens:
//
// import {colorInk as namedImport} from '@shopify/polaris-tokens'
// import * as namespaceImport from '@shopify/polaris-tokens'
// import defaultImport from '@shopify/polaris-tokens'
// console.log(colorInk, namespaceImport.colorInk, defaultImport.colorInk)
//
// In order to avoid adding this esm file being a breaking change, we must
// provide a default export to maintain compatibility.
// This is a deprecated way of accessing tokens. Consumers should use either
// named imports (`import {colorInk}`) or a namespace import
// (`import * as tokens`).
// This default export should be removed in polaris-tokens v3 if we don't
// remove this file entirely.
export default {
  colorPurpleText,
  colorPurpleDarker,
  colorPurpleDark,
  colorPurple,
  colorPurpleLight,
  colorPurpleLighter,
  colorIndigoText,
  colorIndigoDarker,
  colorIndigoDark,
  colorIndigo,
  colorIndigoLight,
  colorIndigoLighter,
  colorBlueText,
  colorBlueDarker,
  colorBlueDark,
  colorBlue,
  colorBlueLight,
  colorBlueLighter,
  colorTealText,
  colorTealDarker,
  colorTealDark,
  colorTeal,
  colorTealLight,
  colorTealLighter,
  colorGreenText,
  colorGreenDarker,
  colorGreenDark,
  colorGreen,
  colorGreenLight,
  colorGreenLighter,
  colorYellowText,
  colorYellowDarker,
  colorYellowDark,
  colorYellow,
  colorYellowLight,
  colorYellowLighter,
  colorOrangeText,
  colorOrangeDarker,
  colorOrangeDark,
  colorOrange,
  colorOrangeLight,
  colorOrangeLighter,
  colorRedText,
  colorRedDarker,
  colorRedDark,
  colorRed,
  colorRedLight,
  colorRedLighter,
  colorInk,
  colorInkLight,
  colorInkLighter,
  colorInkLightest,
  colorSkyDark,
  colorSky,
  colorSkyLight,
  colorSkyLighter,
  colorBlack,
  colorWhite,
  durationNone,
  durationFast,
  durationBase,
  durationSlow,
  durationSlower,
  durationSlowest,
  spacingNone,
  spacingExtraTight,
  spacingTight,
  spacingBaseTight,
  spacingBase,
  spacingLoose,
  spacingExtraLoose,
  fontStackBase,
  fontStackMonospace,
}
