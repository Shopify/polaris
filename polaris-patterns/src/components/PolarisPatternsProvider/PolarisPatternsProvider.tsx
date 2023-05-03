import type {PropsWithChildren} from 'react';
import React, {useEffect} from 'react';
import {I18nextProvider} from 'react-i18next';

import {DEFAULT_I18N_DETAILS, I18NEXT_NAMESPACE} from './constants';
import {i18next, I18nDetailsContext} from './i18n';

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface I18nDetails {
  locale: string;
}

export interface Props {
  /** User's current locale information.
   * @default {locale: 'en'}
   */
  i18nDetails?: I18nDetails;
  /** A locale's dictionary object. If not provided, only default english translations will be loaded. */
  translations?: TranslationDictionary;
}

export function PolarisPatternsProvider({
  translations,
  i18nDetails = DEFAULT_I18N_DETAILS,
  children,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    if (!i18next.hasResourceBundle(i18nDetails.locale, I18NEXT_NAMESPACE)) {
      i18next.addResourceBundle(
        i18nDetails.locale,
        I18NEXT_NAMESPACE,
        translations,
      );
    } else if (i18nDetails.locale === DEFAULT_I18N_DETAILS.locale) {
      i18next.addResourceBundle(
        i18nDetails.locale,
        I18NEXT_NAMESPACE,
        translations,
        true,
        true,
      );
    }

    if (i18next.language !== i18nDetails.locale) {
      i18next.changeLanguage(i18nDetails.locale);
    }
  }, [i18nDetails.locale, translations]);

  return (
    <I18nDetailsContext.Provider value={i18nDetails}>
      <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
    </I18nDetailsContext.Provider>
  );
}
