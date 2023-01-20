import {get} from '../get';
import {merge} from '../merge';

const REPLACE_REGEX = /{([^}]*)}/g;

interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export class I18n {
  private locale?: string;
  private translation: TranslationDictionary = {};

  /**
   * @param translation A locale object or array of locale objects that overrides default translations. If specifying an array then your desired language dictionary should come first, followed by your fallback language dictionaries
   */
  constructor(
    translation: TranslationDictionary | TranslationDictionary[],
    locale?: string,
  ) {
    this.locale = locale;
    // slice the array to make a shallow copy of it, so we don't accidentally
    // modify the original translation array
    this.translation = Array.isArray(translation)
      ? merge(...translation.slice().reverse())
      : translation;
  }

  translate(
    id: string,
    replacements?: {[key: string]: string | number},
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
