import React from 'react';
import ThemeProvider from '../ThemeProvider';
import {
  StickyManager,
  ScrollLockManager,
  createAppProviderContext,
} from './utilities';
import AppProviderContext, {AppProviderContextType} from './context';
import {AppProviderProps} from './types';

interface State {
  context: AppProviderContextType;
}

// The script in the styleguide that generates the Props Explorer data expects
// a component's props to be found in the Props interface. This silly workaround
// ensures that the Props Explorer table is generated correctly, instead of
// crashing if we write `AppProvider extends React.Component<AppProviderProps>`
interface Props extends AppProviderProps {}

export default class AppProvider extends React.Component<Props, State> {
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;

  constructor(props: Props) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    const {theme, children, ...rest} = this.props;

    this.state = {
      context: createAppProviderContext({
        ...rest,
        stickyManager: this.stickyManager,
        scrollLockManager: this.scrollLockManager,
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
      context: createAppProviderContext({
        i18n,
        linkComponent,
        apiKey,
        shopOrigin,
        forceRedirect,
        stickyManager: this.stickyManager,
      }),
    });
  }

  render() {
    const {theme = {logo: null}, children} = this.props;
    const {context} = this.state;

    return (
      <AppProviderContext.Provider value={context}>
        <ThemeProvider theme={theme}>
          {React.Children.only(children)}
        </ThemeProvider>
      </AppProviderContext.Provider>
    );
  }
}
