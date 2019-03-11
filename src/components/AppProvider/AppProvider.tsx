import * as React from 'react';
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

interface State {
  polaris: Context;
}

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `AppProvider extends React.Component<AppProviderProps>`
interface Props extends AppProviderProps {}

export default class AppProvider extends React.Component<Props, State> {
  static childContextTypes = polarisAppProviderContextTypes;
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;
  private subscriptions: {(): void}[] = [];

  constructor(props: Props) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {theme, children, ...rest} = this.props;

    this.state = {
      polaris: createAppProviderContext({
        ...rest,
        stickyManager: this.stickyManager,
        scrollLockManager: this.scrollLockManager,
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
      }),
    };
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
    }
  }

  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent,
    apiKey: prevApiKey,
    shopOrigin: prevShopOrigin,
    forceRedirect: prevForceRedirect,
  }: Props) {
    const {i18n, linkComponent, apiKey, shopOrigin, forceRedirect} = this.props;

    if (
      i18n === prevI18n &&
      linkComponent === prevLinkComponent &&
      apiKey === prevApiKey &&
      shopOrigin === prevShopOrigin &&
      forceRedirect === prevForceRedirect
    ) {
      return;
    }

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      polaris: createAppProviderContext({
        i18n,
        linkComponent,
        apiKey,
        shopOrigin,
        forceRedirect,
        stickyManager: this.stickyManager,
        subscribe: this.subscribe,
        unsubscribe: this.unsubscribe,
      }),
    });

    this.subscriptions.forEach((subscriberCallback) => subscriberCallback());
  }

  getChildContext(): Context {
    return this.state.polaris;
  }

  render() {
    const {theme = {logo: null}} = this.props;
    return (
      <ThemeProvider theme={theme}>
        {React.Children.only(this.props.children)}
      </ThemeProvider>
    );
  }

  subscribe = (callback: () => void) => {
    this.subscriptions.push(callback);
  };

  unsubscribe = (callback: () => void) => {
    this.subscriptions = this.subscriptions.filter(
      (subscription) => subscription !== callback,
    );
  };
}
