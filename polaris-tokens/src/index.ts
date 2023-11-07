import type {BorderCSSProperties} from './themes/base/border';
import type {ColorCSSProperties} from './themes/base/color';
import type {FontCSSProperties} from './themes/base/font';
import type {HeightCSSProperties} from './themes/base/height';
import type {WidthCSSProperties} from './themes/base/width';
import type {ShadowCSSProperties} from './themes/base/shadow';
import type {SpaceCSSProperties} from './themes/base/space';
import type {MotionCSSProperties} from './themes/base/motion';

export type ComputedTokenCSSProperties = BorderCSSProperties &
  ColorCSSProperties &
  FontCSSProperties &
  HeightCSSProperties &
  WidthCSSProperties &
  ShadowCSSProperties &
  SpaceCSSProperties &
  MotionCSSProperties;

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
