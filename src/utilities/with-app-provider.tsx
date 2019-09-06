import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {useI18n} from './i18n';
import {useLink} from './link';
import {useScrollLockManager} from './scroll-lock-manager';
import {useTheme} from './theme';
import {useStickyManager} from './sticky-manager';
import {useAppBridge} from './app-bridge';

export interface WithAppProviderProps {
  polaris: {
    link: ReturnType<typeof useLink>;
    theme: ReturnType<typeof useTheme>;
    intl: ReturnType<typeof useI18n>;
    scrollLockManager: ReturnType<typeof useScrollLockManager>;
    stickyManager: ReturnType<typeof useStickyManager>;
    appBridge: ReturnType<typeof useAppBridge>;
  };
}

export function withAppProvider<OwnProps>() {
  return function addProvider<C>(
    WrappedComponent: React.ComponentType<OwnProps & WithAppProviderProps> & C,
  ) {
    const WithAppProvider: React.FunctionComponent<OwnProps> = (props) => {
      const polaris: WithAppProviderProps['polaris'] = {
        link: useLink(),
        theme: useTheme(),
        intl: useI18n(),
        scrollLockManager: useScrollLockManager(),
        stickyManager: useStickyManager(),
        appBridge: useAppBridge(),
      };

      return <WrappedComponent {...(props as any)} polaris={polaris} />;
    };
    WithAppProvider.displayName = `WithAppProvider(${getDisplayName(
      WrappedComponent,
    )})`;

    const FinalComponent = hoistStatics(WithAppProvider, WrappedComponent);
    return FinalComponent;
  };
}

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
