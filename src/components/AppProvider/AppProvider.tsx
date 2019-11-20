import React, {useMemo, useEffect} from 'react';
import {ThemeConfig} from '../../utilities/theme';
import {TelemetryContext, TelemetryObject} from '../../utilities/telemetry';
import {ThemeProvider} from '../ThemeProvider';
import {useLazyRef} from '../../utilities/use-lazy-ref';
import {MediaQueryProvider} from '../MediaQueryProvider';
import {I18n, I18nContext, TranslationDictionary} from '../../utilities/i18n';
import {
  ScrollLockManager,
  ScrollLockManagerContext,
} from '../../utilities/scroll-lock-manager';
import {
  createAppBridge,
  AppBridgeContext,
  AppBridgeOptions,
} from '../../utilities/app-bridge';
import {
  StickyManager,
  StickyManagerContext,
} from '../../utilities/sticky-manager';
import {LinkContext, LinkLikeComponent} from '../../utilities/link';
import {Features, FeaturesContext} from '../../utilities/features';
import {
  UniqueIdFactory,
  UniqueIdFactoryContext,
  globalIdGeneratorFactory,
} from '../../utilities/unique-id';

export interface AppProviderProps extends AppBridgeOptions {
  /** A locale object or array of locale objects that overrides default translations */
  i18n: TranslationDictionary | TranslationDictionary[];
  /** A custom component to use for all links used by Polaris components */
  linkComponent?: LinkLikeComponent;
  /** Custom logos and colors provided to select components */
  theme?: ThemeConfig;
  /** For toggling features */
  features?: Features;
  /** Inner content of the application */
  children?: React.ReactNode;
  UNSTABLE_telemetry?: TelemetryObject;
}

export function AppProvider({
  apiKey,
  shopOrigin,
  forceRedirect,
  i18n: i18nProp,
  linkComponent,
  theme = {},
  features = {},
  UNSTABLE_telemetry,
  children,
}: AppProviderProps) {
  const stickyManager = useLazyRef(() => new StickyManager());
  const scrollLockManager = useLazyRef(() => new ScrollLockManager());
  const uniqueIdFactory = useLazyRef(
    () => new UniqueIdFactory(globalIdGeneratorFactory),
  );

  const appBridge = useMemo(
    () => createAppBridge({shopOrigin, apiKey, forceRedirect}),
    [apiKey, shopOrigin, forceRedirect],
  );
  const i18n = useMemo(() => new I18n(i18nProp), [i18nProp]);

  useEffect(() => {
    stickyManager.current.setContainer(document);
  }, [stickyManager]);

  return (
    <FeaturesContext.Provider value={features}>
      <I18nContext.Provider value={i18n}>
        <ScrollLockManagerContext.Provider value={scrollLockManager.current}>
          <StickyManagerContext.Provider value={stickyManager.current}>
            <UniqueIdFactoryContext.Provider value={uniqueIdFactory.current}>
              <AppBridgeContext.Provider value={appBridge}>
                <LinkContext.Provider value={linkComponent}>
                  <ThemeProvider theme={theme}>
                    <TelemetryContext.Provider value={UNSTABLE_telemetry}>
                      <MediaQueryProvider>{children}</MediaQueryProvider>
                    </TelemetryContext.Provider>
                  </ThemeProvider>
                </LinkContext.Provider>
              </AppBridgeContext.Provider>
            </UniqueIdFactoryContext.Provider>
          </StickyManagerContext.Provider>
        </ScrollLockManagerContext.Provider>
      </I18nContext.Provider>
    </FeaturesContext.Provider>
  );
}
