import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import {useI18n} from './i18n';
import {useStickyManager} from './sticky-manager';
import {useMediaQuery} from './media-query';

export interface WithAppProviderProps {
  polaris: {
    intl: ReturnType<typeof useI18n>;
    stickyManager: ReturnType<typeof useStickyManager>;
    mediaQuery: ReturnType<typeof useMediaQuery>;
  };
}

export function withAppProvider<OwnProps>() {
  return function addProvider<C>(
    WrappedComponent: React.ComponentType<OwnProps & WithAppProviderProps> & C,
  ) {
    const WithAppProvider: React.FunctionComponent<OwnProps> = (props) => {
      const polaris: WithAppProviderProps['polaris'] = {
        intl: useI18n(),
        stickyManager: useStickyManager(),
        mediaQuery: useMediaQuery(),
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
