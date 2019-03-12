import {get} from '../../../../utilities/get';
import {
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
} from './types';

const REPLACE_REGEX = /{([^}]*)}/g;

export default function translate(
  id: string,
  translations: TranslationDictionary | TranslationDictionary[] | undefined,
  replacements?: PrimitiveReplacementDictionary | ComplexReplacementDictionary,
) {
  const text = get(translations, id) as string;

  if (!text) {
    return '';
  }

  if (replacements) {
    return text.replace(REPLACE_REGEX, (match: string) => {
      const replacement: string = match.substring(1, match.length - 1);

      if (!replacements.hasOwnProperty(replacement)) {
        throw new Error(
          `No replacement found for key '${replacement}'. The following replacements were passed: ${Object.keys(
            replacements,
          )
            .map((key) => `'${key}'`)
            .join(', ')}`,
        );
      }

      return replacements[replacement] as string;
    });
  }

  return text;
}
