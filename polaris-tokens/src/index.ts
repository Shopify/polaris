import type {MappedBorderStyleProps} from './themes/base/border';
import {mappedBorderStyleProps} from './themes/base/border';
import type {MappedColorStyleProps} from './themes/base/color';
import {mappedColorStyleProps} from './themes/base/color';
import type {MappedFontStyleProps} from './themes/base/font';
import {mappedFontStyleProps} from './themes/base/font';
import type {MappedHeightStyleProps} from './themes/base/height';
import {mappedHeightStyleProps} from './themes/base/height';
import type {MappedWidthStyleProps} from './themes/base/width';
import {mappedWidthStyleProps} from './themes/base/width';
import type {MappedShadowStyleProps} from './themes/base/shadow';
import {mappedShadowStyleProps} from './themes/base/shadow';
import type {MappedSpaceStyleProps} from './themes/base/space';
import {mappedSpaceStyleProps} from './themes/base/space';
import type {MappedMotionStyleProps} from './themes/base/motion';
import {mappedMotionStyleProps} from './themes/base/motion';

export type TokenizedStyleProps = MappedBorderStyleProps &
  MappedColorStyleProps &
  MappedFontStyleProps &
  MappedHeightStyleProps &
  MappedWidthStyleProps &
  MappedShadowStyleProps &
  MappedSpaceStyleProps &
  MappedMotionStyleProps;

export const tokenizedStyleProps = [
  ...mappedBorderStyleProps,
  ...mappedColorStyleProps,
  ...mappedFontStyleProps,
  ...mappedHeightStyleProps,
  ...mappedWidthStyleProps,
  ...mappedShadowStyleProps,
  ...mappedSpaceStyleProps,
  ...mappedMotionStyleProps,
] as const;

export {breakpointsAliases} from './themes/base/breakpoints';

export type {BreakpointsAliasDirection} from './utils';

export {
  createVar,
  createVarName,
  getThemeVarNames,
  getMediaConditions,
  toPx,
  toPxs,
  toRem,
} from './utils';

export {metaThemes, metaThemeDefault} from './themes';

export type {
  ExtractMetaThemeValues,
  MetaTheme,
  MetaThemeShape,
  MetaTokenGroupShape,
  MetaTokenProperties,
  Theme,
  ThemeName,
} from './themes/types';

export {themeNameDefault, themeNames} from './themes/constants';

export {createThemeClassName} from './themes/utils';

export type {
  BorderTokenGroup,
  BorderTokenName,
  BorderRadiusScale,
  BorderRadiusAlias,
  BorderRadiusAliasOrScale,
  BorderWidthScale,
} from './themes/base/border';

export type {
  BreakpointsTokenGroup,
  BreakpointsTokenName,
  BreakpointsAlias,
} from './themes/base/breakpoints';

export type {
  ColorTokenGroup,
  ColorTokenName,
  ColorBackgroundAlias,
  ColorBorderAlias,
  ColorIconAlias,
  ColorTextAlias,
} from './themes/base/color';

export type {
  FontTokenGroup,
  FontTokenName,
  FontSizeScale,
  FontLineHeightScale,
  FontWeightAlias,
} from './themes/base/font';

export type {
  HeightTokenGroup,
  HeightTokenName,
  HeightScale,
} from './themes/base/height';

export type {
  MotionTokenGroup,
  MotionTokenName,
  MotionDurationScale,
  MotionKeyframesAlias,
} from './themes/base/motion';

export type {
  ShadowTokenGroup,
  ShadowTokenName,
  ShadowAlias,
  ShadowAliasOrScale,
} from './themes/base/shadow';

export type {
  SpaceTokenGroup,
  SpaceTokenName,
  SpaceScale,
} from './themes/base/space';

export type {
  WidthTokenGroup,
  WidthTokenName,
  WidthScale,
} from './themes/base/width';

export type {
  ZIndexTokenGroup,
  ZIndexTokenName,
  ZIndexZScale,
} from './themes/base/zIndex';
