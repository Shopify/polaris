import * as React from 'react';

import {LinkLikeComponent} from '../UnstyledLink';

import Intl from './Intl';
import Link from './Link';
import {polarisProviderContextTypes, TranslationDictionary} from './types';

export interface Props {
  i18n?: TranslationDictionary | TranslationDictionary[],
  linkComponent?: LinkLikeComponent,
}

export interface Context {
  polaris: {intl: Intl, link: Link},
}

export default class Provider extends React.Component<Props> {
  static childContextTypes = polarisProviderContextTypes;
  private intl: Intl;
  private link: Link;

  constructor(props: Props) {
    super(props);

    this.intl = new Intl(props.i18n);
    this.link = new Link(props.linkComponent);
  }

  componentWillReceiveProps({i18n, linkComponent}: Props) {
    if (i18n !== this.props.i18n) {
      this.intl = new Intl(i18n);
    }

    if (linkComponent !== this.props.linkComponent) {
      this.link = new Link(linkComponent);
    }
  }

  getChildContext(): Context {
    return {
      polaris: {
        intl: this.intl,
        link: this.link,
      },
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
