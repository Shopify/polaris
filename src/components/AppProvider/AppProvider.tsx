import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import ThemeProvider from '../ThemeProvider';
import {
  StickyManager,
  ScrollLockManager,
  createAppProviderContext,
} from './utilities';
import {
  AppProviderProps,
  Context,
  polarisAppProviderContextTypes,
} from './types';

export default class AppProvider extends React.Component<AppProviderProps> {
  static childContextTypes = polarisAppProviderContextTypes;
  public polarisContext: Context;
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;
  private subscriptions: {(): void}[] = [];

  constructor(props: AppProviderProps) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {theme, children, ...rest} = this.props;
    this.polarisContext = createAppProviderContext({
      ...rest,
      stickyManager: this.stickyManager,
      scrollLockManager: this.scrollLockManager,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
    });
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps({
    i18n,
    linkComponent,
    apiKey,
    shopOrigin,
    forceRedirect,
  }: AppProviderProps) {
    if (
      i18n !== this.props.i18n ||
      linkComponent !== this.props.linkComponent ||
      apiKey !== this.props.apiKey ||
      shopOrigin !== this.props.shopOrigin ||
      forceRedirect !== this.props.forceRedirect
    ) {
      const stickyManager = this.stickyManager;
      this.polarisContext = createAppProviderContext({
        i18n,
        linkComponent,
        apiKey,
        shopOrigin,
        forceRedirect,
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
      <ThemeProvider theme={theme}>
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
