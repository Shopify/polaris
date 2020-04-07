import React from 'react';

import type {I18n} from './I18n';

export const I18nContext = React.createContext<I18n | undefined>(undefined);
