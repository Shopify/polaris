import {createContext} from 'react';

import type {I18n} from './I18n';

export const I18nContext = createContext<I18n | undefined>(undefined);
