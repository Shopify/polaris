import * as PropTypes from 'prop-types';
import {ValidationMap} from 'react';

import Intl from './Intl';
import Link from './Link';
import EASDK from './EASDK';

export const polarisAppProviderContextTypes: ValidationMap<any> = {
  polaris: PropTypes.any,
  easdk: PropTypes.any,
};

export interface WithAppProviderProps {
  polaris: {intl: Intl; link: Link; easdk: EASDK};
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
