import * as React from 'react';
import {LinkLikeComponent} from '../UnstyledLink';
import Intl from './Intl';
import Link from './Link';
import StickyManager from './StickyManager';
import {createPolarisContext} from './utils';
import {polarisProviderContextTypes, TranslationDictionary} from './types';

export interface Props {
  /** A locale object or array of locale objects that overrides default translations */
  i18n?: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** A class used to manage Sticky components elements in a container */
  stickyManager?: StickyManager;
}

export interface Context {
  polaris: {
    intl: Intl;
    link: Link;
    stickyManager: StickyManager;
  };
}

export default class Provider extends React.Component<Props> {
  static childContextTypes = polarisProviderContextTypes;
  public polarisContext: Context;
  private stickyManager: StickyManager;

  constructor(props: Props) {
    super(props);
    this.stickyManager = new StickyManager();
    this.polarisContext = createPolarisContext({
      i18n: props.i18n,
      linkComponent: props.linkComponent,
      stickyManager: this.stickyManager,
    });
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
    }
  }

  componentWillReceiveProps({i18n, linkComponent}: Props) {
    if (
      i18n !== this.props.i18n ||
      linkComponent !== this.props.linkComponent
    ) {
      const stickyManager = this.stickyManager;
      this.polarisContext = createPolarisContext({
        i18n,
        linkComponent,
        stickyManager,
      });
    }
  }

  getChildContext(): Context {
    return this.polarisContext;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
