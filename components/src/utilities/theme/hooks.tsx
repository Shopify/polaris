import {useContext} from 'react';

import {MissingAppProviderError} from '../errors';

import {ThemeContext} from './context';

export function useTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new MissingAppProviderError('No Theme was provided.');
  }

  return theme;
}
