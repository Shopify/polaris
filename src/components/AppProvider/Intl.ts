import merge from 'lodash/merge';
import {autobind} from '@shopify/javascript-utilities/decorators';

import defaultTranslation from '../../locales';

import {
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
} from './types';

import {translate} from './utils';

export interface ChangeTranslation {
  (translation: TranslationDictionary): void;
}

export default class Intl {
  constructor(
    private translation:
      | TranslationDictionary
      | TranslationDictionary[]
      | undefined,
  ) {
    this.setTranslation(translation);
  }

  setTranslation(
    translation: TranslationDictionary | TranslationDictionary[] | undefined,
  ) {
    const i18n = Array.isArray(translation)
      ? merge({}, ...translation)
      : translation;

    this.translation = i18n
      ? merge({}, defaultTranslation, i18n)
      : defaultTranslation;
  }

  @autobind
  translate(
    id: string,
    replacements?:
      | PrimitiveReplacementDictionary
      | ComplexReplacementDictionary,
  ): string {
    return translate(id, this.translation, replacements);
  }
}
