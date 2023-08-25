import deepmerge from 'deepmerge';

import type {Exact} from '../types';
import {createExact} from '../utilities';

import type {MetaThemeVariant, MetaThemeVariantPartialShape} from './types';
import {themeNameLightUplift} from './constants';
import {metaThemeBase} from './base';

export const createMetaThemeVariantPartial =
  createExact<MetaThemeVariantPartialShape>();

export function createMetaThemeVariant<
  T extends Exact<MetaThemeVariantPartialShape, T>,
>(metaThemeVariantPartial: T): MetaThemeVariant {
  return deepmerge(metaThemeBase, metaThemeVariantPartial);
}

export function createThemeClassName(themeName: string) {
  return themeName === themeNameLightUplift
    ? themeName
    : `p-theme-${themeName}`;
}

export function createThemeSelector(themeName: string) {
  return `html.${createThemeClassName(themeName)}`;
}
