import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';

import Intl from './Intl';
import Link from './Link';

export const polarisProviderContextTypes: ValidationMap<any> = {
  polaris: PropTypes.any,
};

export interface WithProviderProps {
  polaris: {intl: Intl; link: Link};
}

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface PrimitiveReplacementDictionary {
  [key: string]: string | number;
}

export interface ComplexReplacementDictionary {
  [key: string]: string | number | React.ReactNode;
}
