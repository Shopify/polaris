import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import ThemeProvider, {Theme} from '../ThemeProvider';
import {LinkLikeComponent} from '../UnstyledLink';
import {
  StickyManager,
  ScrollLockManager,
  TranslationDictionary,
  createAppProviderContext,
} from './utilities';
import {Context, polarisAppProviderContextTypes} from './types';
// eslint-disable-next-line shopify/strict-component-boundaries
import '../ThemeProvider/DefaultStyles.scss';

export interface Props {
  /** A locale object or array of locale objects that overrides default translations */
  i18n?: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** The API key for your application from the Partner dashboard */
  apiKey?: string;
  /**
   * The current shop’s origin, provided in the session from the Shopify API (to be provided without the https://)
   * @default getShopOrigin()
   * @see {@link https://help.shopify.com/en/api/embedded-apps/app-bridge#set-up-your-app|Shopify App Bridge docs}
   **/
  shopOrigin?: string;
  /** Forces a redirect to the relative admin path when not rendered in an iframe */
  forceRedirect?: boolean;
  /** Custom logos and colors provided to select components */
  theme?: Theme;
}

export default class AppProvider extends React.Component<Props> {
  static childContextTypes = polarisAppProviderContextTypes;
  public polarisContext: Context;
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;
  private subscriptions: {(): void}[] = [];

  constructor(props: Props) {
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
  }: Props) {
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
