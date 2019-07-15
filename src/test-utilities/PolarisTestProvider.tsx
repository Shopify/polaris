import React from 'react';
// eslint-disable-next-line shopify/strict-component-boundaries
import {FrameContext} from '../components/Frame';
import {createThemeContext, ThemeContext} from '../utilities/theme';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../utilities/scroll-lock-manager';
import {StickyManager, StickyManagerContext} from '../utilities/sticky-manager';
import {AppBridgeContext} from '../utilities/app-bridge';
import {I18n, I18nContext} from '../utilities/i18n';
import translations from '../../locales/en.json';
import {Link, LinkContext} from '../utilities/link';
import {ReturnedContext} from './types';

export interface Props extends Partial<ReturnedContext> {
  children: React.ReactElement<any>;
  strict?: boolean;
}

export function PolarisTestProvider({
  strict,
  children,
  themeProvider = createThemeContext(),
  frame = {
    showToast: noop,
    hideToast: noop,
    setContextualSaveBar: noop,
    removeContextualSaveBar: noop,
    startLoading: noop,
    stopLoading: noop,
  },
  intl = new I18n(translations),
  scrollLockManager = new ScrollLockManager(),
  stickyManager = new StickyManager(),
  appBridge = undefined,
  link = new Link(undefined),
  ...props
}: Props) {
  const childWithProps =
    Object.keys(props).length > 0
      ? React.cloneElement(children, props)
      : children;

  const Wrapper = strict ? React.StrictMode : React.Fragment;

  return (
    <Wrapper>
      <I18nContext.Provider value={intl}>
        <ScrollLockManagerContext.Provider value={scrollLockManager}>
          <StickyManagerContext.Provider value={stickyManager}>
            <ThemeContext.Provider value={themeProvider}>
              <AppBridgeContext.Provider value={appBridge}>
                <LinkContext.Provider value={link}>
                  <FrameContext.Provider value={frame}>
                    {childWithProps}
                  </FrameContext.Provider>
                </LinkContext.Provider>
              </AppBridgeContext.Provider>
            </ThemeContext.Provider>
          </StickyManagerContext.Provider>
        </ScrollLockManagerContext.Provider>
      </I18nContext.Provider>
    </Wrapper>
  );
}

function noop() {}
