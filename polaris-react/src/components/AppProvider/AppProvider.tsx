import React, {Component} from 'react';
import type {ThemeName} from '@shopify/polaris-tokens';
import {
  createThemeClassName,
  themeNameDefault,
  themeNames,
} from '@shopify/polaris-tokens';

import {EphemeralPresenceManager} from '../EphemeralPresenceManager';
import {MediaQueryProvider} from '../MediaQueryProvider';
import {FocusManager} from '../FocusManager';
import {PortalsManager} from '../PortalsManager';
import {I18n, I18nContext} from '../../utilities/i18n';
import {ThemeContext, getTheme} from '../../utilities/use-theme';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {LinkContext} from '../../utilities/link';
import type {LinkLikeComponent} from '../../utilities/link';
import {FeaturesContext} from '../../utilities/features';
import type {FeaturesConfig} from '../../utilities/features';

import './global.scss';

const MAX_SCROLLBAR_WIDTH = 20;
const SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
const SCROLLBAR_TEST_ELEMENT_CHILD_SIZE =
  SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;

function measureScrollbars() {
  const parentEl = document.createElement('div');
  parentEl.setAttribute(
    'style',
    `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`,
  );

  const child = document.createElement('div');
  child.setAttribute(
    'style',
    `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`,
  );
  parentEl.appendChild(child);
  document.body.appendChild(parentEl);

  const scrollbarWidth =
    SCROLLBAR_TEST_ELEMENT_PARENT_SIZE -
    (parentEl.firstElementChild?.clientWidth ?? 0);

  const scrollbarWidthWithSafetyHatch = Math.min(
    scrollbarWidth,
    MAX_SCROLLBAR_WIDTH,
  );

  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${scrollbarWidthWithSafetyHatch}px`,
  );

  document.body.removeChild(parentEl);
}

interface State {
  intl: I18n;
  link: LinkLikeComponent | undefined;
}

export interface AppProviderProps {
  theme?: ThemeName;
  /** A locale object or array of locale objects that overrides default translations. If specifying an array then your primary language dictionary should come first, followed by your fallback language dictionaries */
  i18n: ConstructorParameters<typeof I18n>[0];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** For toggling features */
  features?: FeaturesConfig;
  /** Inner content of the application */
  children?: React.ReactNode;
}

export class AppProvider extends Component<AppProviderProps, State> {
  private stickyManager: StickyManager;
  private scrollLockManager: ScrollLockManager;

  constructor(props: AppProviderProps) {
    super(props);
    this.stickyManager = new StickyManager();
    this.scrollLockManager = new ScrollLockManager();

    const {i18n, linkComponent} = this.props;

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      link: linkComponent,
      intl: new I18n(i18n),
    };
  }

  componentDidMount() {
    if (document != null) {
      this.stickyManager.setContainer(document);
      this.setBodyStyles();
      this.setRootAttributes();

      const isSafari16 =
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome') &&
        (navigator.userAgent.includes('Version/16.1') ||
          navigator.userAgent.includes('Version/16.2') ||
          navigator.userAgent.includes('Version/16.3'));

      const isMobileApp16 =
        navigator.userAgent.includes('Shopify Mobile/iOS') &&
        (navigator.userAgent.includes('OS 16_1') ||
          navigator.userAgent.includes('OS 16_2') ||
          navigator.userAgent.includes('OS 16_3'));

      if (isSafari16 || isMobileApp16) {
        document.documentElement.classList.add(
          'Polaris-Safari-16-Font-Optical-Sizing-Patch',
        );
      }
    }
    measureScrollbars();
  }

  componentDidUpdate({
    i18n: prevI18n,
    linkComponent: prevLinkComponent,
  }: AppProviderProps) {
    const {i18n, linkComponent} = this.props;

    this.setRootAttributes();

    if (i18n === prevI18n && linkComponent === prevLinkComponent) {
      return;
    }

    this.setState({
      link: linkComponent,
      intl: new I18n(i18n),
    });
  }

  setBodyStyles = () => {
    document.body.style.backgroundColor = 'var(--p-color-bg)';
    document.body.style.color = 'var(--p-color-text)';
  };

  setRootAttributes = () => {
    const activeThemeName = this.getThemeName();

    themeNames.forEach((themeName) => {
      document.documentElement.classList.toggle(
        createThemeClassName(themeName),
        themeName === activeThemeName,
      );
    });
  };

  getThemeName = (): ThemeName => this.props.theme ?? themeNameDefault;

  render() {
    const {children, features} = this.props;
    const themeName = this.getThemeName();

    const {intl, link} = this.state;

    return (
      <ThemeContext.Provider value={getTheme(themeName)}>
        <FeaturesContext.Provider value={features}>
          <I18nContext.Provider value={intl}>
            <ScrollLockManagerContext.Provider value={this.scrollLockManager}>
              <StickyManagerContext.Provider value={this.stickyManager}>
                <LinkContext.Provider value={link}>
                  <MediaQueryProvider>
                    <PortalsManager>
                      <FocusManager>
                        <EphemeralPresenceManager>
                          {children}
                        </EphemeralPresenceManager>
                      </FocusManager>
                    </PortalsManager>
                  </MediaQueryProvider>
                </LinkContext.Provider>
              </StickyManagerContext.Provider>
            </ScrollLockManagerContext.Provider>
          </I18nContext.Provider>
        </FeaturesContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
