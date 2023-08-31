import deepmerge from 'deepmerge';

import type {Exact} from '../types';
import {createExact} from '../utilities';

import type {ThemeVariant, ThemeVariantPartialShape} from './types';
import {themeNameLightUplift} from './constants';
import {themeBase} from './base';

export const createThemeVariantPartial =
  createExact<ThemeVariantPartialShape>();

export function createThemeVariant<
  T extends Exact<ThemeVariantPartialShape, T>,
>(themeVariantPartial: T): ThemeVariant {
  return deepmerge(themeBase, themeVariantPartial);
}

export function createThemeClassName(themeName: string) {
  return themeName === themeNameLightUplift
    ? themeName
    : `p-theme-${themeName}`;
}

export function createThemeSelector(themeName: string) {
  return `html.${createThemeClassName(themeName)}`;
}
