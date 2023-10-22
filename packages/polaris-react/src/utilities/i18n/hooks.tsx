import {useContext} from 'react';

import {MissingAppProviderError} from '../errors';

import {I18nContext} from './context';

export function useI18n() {
  const i18n = useContext(I18nContext);

  if (!i18n) {
    throw new MissingAppProviderError('No i18n was provided.');
  }

  return i18n;
}
