import * as React from 'react';
import isEqual from 'lodash/isEqual';
import {autobind} from '@shopify/javascript-utilities/decorators';
import EASDK from './EASDK';

import {LinkLikeComponent} from '../UnstyledLink';

import Intl from './Intl';
import Link from './Link';
import StickyManager from './StickyManager';
import {createPolarisContext, setColors} from './utils';
import {
  polarisAppProviderContextTypes,
  TranslationDictionary,
  Theme,
  ThemeContext,
} from './types';

export interface Props {
  /** A locale object or array of locale objects that overrides default translations */
  i18n?: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** The API key for your application from the Partner dashboard */
  apiKey?: string;
  /** The current shop’s origin, provided in the session from the Shopify API */
  shopOrigin?: string;
  /** Forces a redirect to the relative admin path when not rendered in an iframe */
  forceRedirect?: boolean;
  /** Prints logs of each message passed through the EASDK */
  debug?: boolean;
  /** Custom logos and colors provided to select components */
  theme?: Theme;
}

export interface Context {
  polaris: {
    intl: Intl;
    link: Link;
    stickyManager: StickyManager;
    theme?: ThemeContext;
    subscribe?(callback: () => void): void;
    unsubscribe?(callback: () => void): void;
  };
  easdk?: EASDK;
}

export default class AppProvider extends React.Component<Props> {
  static childContextTypes = polarisAppProviderContextTypes;
  public polarisContext: Context;
  private stickyManager: StickyManager;
  private subscriptions: {(): void}[] = [];

  constructor(props: Props) {
    super(props);
    this.stickyManager = new StickyManager();
    this.polarisContext = createPolarisContext({
      ...props,
      stickyManager: this.stickyManager,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    });
  }

  componentDidMount() {
    const {theme} = this.props;
    setColors(theme);

    if (document != null) {
      this.stickyManager.setContainer(document);
    }
  }

  componentWillReceiveProps({
    i18n,
    linkComponent,
    apiKey,
    shopOrigin,
    forceRedirect,
    debug,
    theme,
  }: Props) {
    if (
      i18n !== this.props.i18n ||
      linkComponent !== this.props.linkComponent ||
      apiKey !== this.props.apiKey ||
      shopOrigin !== this.props.shopOrigin ||
      forceRedirect !== this.props.forceRedirect ||
      debug !== this.props.debug ||
      theme !== this.props.theme
    ) {
      const stickyManager = this.stickyManager;
      this.polarisContext = createPolarisContext({
        i18n,
        linkComponent,
        apiKey,
        shopOrigin,
        forceRedirect,
        debug,
        stickyManager,
        theme,
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
      });
    }

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());

    if (isEqual(theme, this.props.theme)) {
      return;
    }

    setColors(theme);
  }

  getChildContext(): Context {
    return this.polarisContext;
  }

  render() {
    return React.Children.only(this.props.children);
  }

  @autobind
  subscribe(callback: () => void) {
    this.subscriptions.push(callback);
  }

  @autobind
  unsubscribe(callback: () => void) {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback,
    );
  }
}
