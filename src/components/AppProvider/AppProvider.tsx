import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import EASDK from './EASDK';

import {LinkLikeComponent} from '../UnstyledLink';

import Intl from './Intl';
import Link from './Link';
import StickyManager from './StickyManager';
import {createPolarisContext} from './utils';
import {polarisAppProviderContextTypes, TranslationDictionary} from './types';
import {Theme} from '../ThemeProvider/types';
import ThemeProvider from '../ThemeProvider';

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
    const {theme, children, ...rest} = this.props;
    this.polarisContext = createPolarisContext({
      ...rest,
      stickyManager: this.stickyManager,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    });
  }

  componentDidMount() {
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
  }: Props) {
    if (
      i18n !== this.props.i18n ||
      linkComponent !== this.props.linkComponent ||
      apiKey !== this.props.apiKey ||
      shopOrigin !== this.props.shopOrigin ||
      forceRedirect !== this.props.forceRedirect ||
      debug !== this.props.debug
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
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
      });
    }

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
  }

  getChildContext(): Context {
    return this.polarisContext;
  }

  render() {
    const {theme = {logo: null}} = this.props;
    return (
      <ThemeProvider theme={theme} useRoot>
        {React.Children.only(this.props.children)}
      </ThemeProvider>
    );
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
