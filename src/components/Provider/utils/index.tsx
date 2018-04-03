import * as React from 'react';
import get from 'lodash/get';
import merge from 'lodash/merge';
import replace from 'lodash/replace';
import hoistStatics from 'hoist-non-react-statics';

import {
  polarisProviderContextTypes,
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
  WithProviderProps,
} from '../types';

import Intl from '../Intl';
import Link from '../Link';
import {Props as ProviderProps} from '../Provider';
import EASDK from '../EASDK';

import {name, version} from '../../../../package.json';

const METADATA = {
  interface: {
    name,
    version,
  },
};

const REPLACE_REGEX = /{([^}]*)}/g;

export function translate(
  id: string,
  translations: TranslationDictionary | TranslationDictionary[] | undefined,
  replacements?: PrimitiveReplacementDictionary | ComplexReplacementDictionary,
) {
  const text = get(translations, id) as string;

  if (!text) {
    return '';
  }

  if (replacements) {
    return replace(text, REPLACE_REGEX, (match: string) => {
      const replacement: string = match.substring(1, match.length - 1);

      if (!replacements.hasOwnProperty(replacement)) {
        throw new Error(
          `No replacement found for key '${replacement}'. The following replacements were passed: ${Object.keys(
            replacements,
          )
            .map((key) => `'${key}'`)
            .join(', ')}`,
        );
      }

      return replacements[replacement] as string;
    });
  }

  return text;
}

export function withProvider() {
  return function addProvider<OwnProps, C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithProviderProps> & C
      | React.SFC<OwnProps & WithProviderProps> & C,
  ): any & C {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithTranslation extends React.Component<
      {},
      OwnProps & WithProviderProps
    > {
      static contextTypes = WrappedComponent.contextTypes
        ? merge(WrappedComponent.contextTypes, polarisProviderContextTypes)
        : polarisProviderContextTypes;

      render() {
        const {polaris, easdk} = this.context;
        const polarisContext = {...polaris, easdk};
        return <WrappedComponent {...this.props} polaris={polarisContext} />;
      }
    }

    const FinalComponent = hoistStatics(
      WithTranslation,
      WrappedComponent as React.ComponentClass<any>,
    );
    return FinalComponent as React.ComponentClass<any> & C;
  };
}

export function createPolarisContext({
  i18n,
  linkComponent,
  apiKey,
  shopOrigin,
  forceRedirect,
  debug,
}: ProviderProps = {}) {
  const intl = new Intl(i18n);
  const link = new Link(linkComponent);
  const easdk = apiKey
    ? new EASDK(
        {
          apiKey,
          shopOrigin,
          forceRedirect,
          debug,
        },
        METADATA,
      )
    : undefined;

  return {
    polaris: {
      intl,
      link,
    },
    easdk,
  };
}
