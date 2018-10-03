import merge from 'lodash/merge';
import get from 'lodash/get';
import {autobind} from '@shopify/javascript-utilities/decorators';
import defaultTranslation from 'src/locales';
import {
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
} from './types';
import translate from './translate';

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

  translationKeyExists(path: string): boolean {
    return Boolean(get(this.translation, path));
  }
}
