import {get} from '../get';
import {merge} from '../merge';

const REPLACE_REGEX = /{([^}]*)}/g;

interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export class I18n {
  private translation: TranslationDictionary = {};

  /**
   * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your fallback language dictionaries should come first, followed by your primary language dictionary
   */
  constructor(translation: TranslationDictionary | TranslationDictionary[]) {
    this.translation = Array.isArray(translation)
      ? merge(...translation)
      : translation;
  }

  translate(
    id: string,
    replacements?: Record<string, string | number>,
  ): string {
    const text: string = get(this.translation, id, '');

    if (!text) {
      return '';
    }

    if (replacements) {
      return text.replace(REPLACE_REGEX, (match: string) => {
        const replacement: string = match.substring(1, match.length - 1)!;

        if (replacements[replacement] === undefined) {
          const replacementData = JSON.stringify(replacements);

          throw new Error(
            `Error in translation for key '${id}'. No replacement found for key '${replacement}'. The following replacements were passed: '${replacementData}'`,
          );
        }

        // This could be a string or a number, but JS doesn't mind which it gets
        // and can handle that cast internally. So let it, to save us calling
        // toString() on what's already a string in 90% of cases.
        return replacements[replacement] as string;
      });
    }

    return text;
  }

  translationKeyExists(path: string): boolean {
    return Boolean(get(this.translation, path));
  }
}
