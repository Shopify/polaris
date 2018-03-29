import * as React from 'react';

import {LinkLikeComponent} from '../UnstyledLink';

import Intl from './Intl';
import Link from './Link';
import {createPolarisContext} from './utils';
import {polarisProviderContextTypes, TranslationDictionary} from './types';

export interface Props {
  /** A locale object or array of locale objects that overrides default translations */
  i18n?: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
}

export interface Context {
  polaris: {intl: Intl; link: Link};
}

export default class Provider extends React.Component<Props> {
  static childContextTypes = polarisProviderContextTypes;
  public polarisContext: Context;

  constructor(props: Props) {
    super(props);

    this.polarisContext = createPolarisContext({
      i18n: props.i18n,
      linkComponent: props.linkComponent,
    });
  }

  componentWillReceiveProps({i18n, linkComponent}: Props) {
    if (
      i18n !== this.props.i18n ||
      linkComponent !== this.props.linkComponent
    ) {
      this.polarisContext = createPolarisContext({i18n, linkComponent});
    }
  }

  getChildContext(): Context {
    return this.polarisContext;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
