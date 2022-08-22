import React, {Component} from 'react';

import {
  // eslint-disable-next-line import/no-deprecated
  CustomProperties,
  CustomPropertiesProps,
  DEFAULT_COLOR_SCHEME,
} from '../CustomProperties';
import {MediaQueryProvider} from '../MediaQueryProvider';
import {FocusManager} from '../FocusManager';
import {PortalsManager} from '../PortalsManager';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {LinkContext, LinkLikeComponent} from '../../utilities/link';
import {FeaturesConfig, FeaturesContext} from '../../utilities/features';
import {
  UniqueIdFactory,
  UniqueIdFactoryContext,
  globalIdGeneratorFactory,
} from '../../utilities/unique-id';

import './AppProvider.scss';

interface State {
  link: LinkLikeComponent | undefined;
}

export interface AppProviderProps {
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** For toggling features */
  features?: FeaturesConfig;
  /** Inner content of the application */
  children?: React.ReactNode;
  /** @deprecated Determines what color scheme is applied to child content. */
  colorScheme?: CustomPropertiesProps['colorScheme'];
}

export class AppProvider extends Component<AppProviderProps, State> {
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;
  private uniqueIdFactory: UniqueIdFactory;

  constructor(props: AppProviderProps) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();
    this.uniqueIdFactory = new UniqueIdFactory(globalIdGeneratorFactory);

    const {linkComponent} = this.props;

    // eslint-disable-next-line react/state-in-constructor
    this.state = {link: linkComponent};
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
      this.setBodyStyles();
    }
  }

  componentDidUpdate({
    colorScheme: prevColorScheme,
    linkComponent: prevLinkComponent,
  }: AppProviderProps) {
    const {colorScheme, linkComponent} = this.props;

    if (colorScheme !== prevColorScheme) {
      this.setBodyStyles();
    }

    if (linkComponent === prevLinkComponent) {
      return;
    }

    this.setState({link: linkComponent});
  }

  setBodyStyles = () => {
    // Inlining the following custom properties to maintain backward
    // compatibility with the legacy ThemeProvider implementation.
    document.body.setAttribute(
      'p-color-scheme',
      this.props.colorScheme || DEFAULT_COLOR_SCHEME,
    );
    document.body.style.backgroundColor = 'var(--p-background)';
    document.body.style.color = 'var(--p-text)';

    if (this.props.colorScheme && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: The `colorScheme` prop on the `AppProvider` has been deprecated. See the v10 migration guide for replacing dark color scheme styles. https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md',
      );
    }
  };

  render() {
    const {children, features = {}, colorScheme} = this.props;

    const {link} = this.state;

    return (
      <FeaturesContext.Provider value={features}>
        <ScrollLockManagerContext.Provider value={this.scrollLockManager}>
          <StickyManagerContext.Provider value={this.stickyManager}>
            <UniqueIdFactoryContext.Provider value={this.uniqueIdFactory}>
              <LinkContext.Provider value={link}>
                <CustomProperties colorScheme={colorScheme}>
                  <MediaQueryProvider>
                    <PortalsManager>
                      <FocusManager>{children}</FocusManager>
                    </PortalsManager>
                  </MediaQueryProvider>
                </CustomProperties>
              </LinkContext.Provider>
            </UniqueIdFactoryContext.Provider>
          </StickyManagerContext.Provider>
        </ScrollLockManagerContext.Provider>
      </FeaturesContext.Provider>
    );
  }
}
