import {get} from '../../../../utilities/get';
import merge from '../../../../utilities/merge';
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
    this.translation = Array.isArray(translation)
      ? merge(...translation)
      : translation;
  }

  translate = (
    id: string,
    replacements?:
      | PrimitiveReplacementDictionary
      | ComplexReplacementDictionary,
  ): string => {
    return translate(id, this.translation, replacements);
  };

  translationKeyExists(path: string): boolean {
    return Boolean(get(this.translation, path));
  }
}
