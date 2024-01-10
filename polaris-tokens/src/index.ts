import {deepmerge} from 'deepmerge-ts';

import type {BorderStyleProps} from './themes/base/border';
import {borderStylePropTokenGroups} from './themes/base/border';
import type {ColorStyleProps} from './themes/base/color';
import {colorStylePropTokenGroups} from './themes/base/color';
import type {FontStyleProps} from './themes/base/font';
import {fontStylePropTokenGroups} from './themes/base/font';
import type {MappedHeightStyleProps} from './themes/base/height';
import {heightStylePropTokenGroups} from './themes/base/height';
import type {WidthStyleProps} from './themes/base/width';
import {widthStylePropTokenGroups} from './themes/base/width';
import type {ShadowStyleProps} from './themes/base/shadow';
import {shadowStylePropTokenGroups} from './themes/base/shadow';
import type {SpaceStyleProps} from './themes/base/space';
import {spaceStylePropTokenGroups} from './themes/base/space';
import type {MotionStyleProps} from './themes/base/motion';
import {motionStylePropTokenGoups} from './themes/base/motion';

export type TokenizedStyleProps = BorderStyleProps &
  ColorStyleProps &
  FontStyleProps &
  MappedHeightStyleProps &
  WidthStyleProps &
  ShadowStyleProps &
  SpaceStyleProps &
  MotionStyleProps;

export const metaTokenGroups = deepmerge(
  borderStylePropTokenGroups,
  colorStylePropTokenGroups,
  fontStylePropTokenGroups,
  heightStylePropTokenGroups,
  widthStylePropTokenGroups,
  shadowStylePropTokenGroups,
  spaceStylePropTokenGroups,
  motionStylePropTokenGoups,
);

// Check the integrity of the style prop token groups; a CSS Property may only
// exist in a single token group.
if (process.env.NODE_ENV !== 'production') {
  type MetaTokenGroups = typeof metaTokenGroups;
  type TokenGroupNames = keyof MetaTokenGroups;
  type TokenizedStyleProps = MetaTokenGroups[TokenGroupNames][number];

  const acc: Partial<{[x in TokenizedStyleProps]: TokenGroupNames}> = {};
  for (const tokenGroup in metaTokenGroups) {
    if (!Object.prototype.hasOwnProperty.call(metaTokenGroups, tokenGroup)) {
      continue;
    }
    const props = metaTokenGroups[tokenGroup as TokenGroupNames];
    for (const prop of props) {
      if (acc[prop] && acc[prop] !== tokenGroup) {
        throw new Error(
          `Tokenized CSS Properties must only be a member of one token group. '${prop}' was found in two different groups: '${acc[prop]}' and '${tokenGroup}'`,
        );
      }
      acc[prop] = tokenGroup as TokenGroupNames;
    }
  }
}

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

export {createThemeClassName, flattenMetaTheme} from './themes/utils';

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
  ColorGlobalAlias,
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
