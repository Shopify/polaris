import * as React from 'react';

import Intl from './Intl';
import {polarisProviderContextTypes, TranslationDictionary} from './types';

export interface Props {
  i18n?: TranslationDictionary | TranslationDictionary[],
}

export interface Context {
  polaris: Intl,
}

export default class Provider extends React.Component<Props> {
  static childContextTypes = polarisProviderContextTypes;
  private intl: Intl;

  constructor(props: Props) {
    super(props);

    this.intl = new Intl(props.i18n);
  }

  componentWillReceiveProps({i18n}: Props) {
    if (i18n !== this.props.i18n) {
      this.intl.setTranslation(i18n);
    }
  }

  getChildContext(): Context {
    return {polaris: this.intl};
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
