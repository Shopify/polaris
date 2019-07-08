import {createContext} from 'react';
import {I18n} from './I18n';

export const I18nContext = createContext(new I18n({}));
