import React, {useMemo, useRef} from 'react';

import {PortalsManagerContext} from '../../utilities/portals';
import type {PortalsContainerElement} from '../../utilities/portals';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import type {FeaturesConfig} from '../../utilities/features';

import {PortalsContainer} from './components';

export interface PortalsManagerProps {
  children: React.ReactNode;
  features?: FeaturesConfig;
  container?: PortalsContainerElement;
}

export function PortalsManager({
  children,
  features,
  container,
}: PortalsManagerProps) {
  const isMounted = useIsAfterInitialMount();
  const ref = useRef<PortalsContainerElement>(null);

  const contextValue = useMemo(() => {
    if (container) {
      return {container, features};
    } else if (isMounted) {
      return {container: ref.current, features};
    } else {
      return {container: null, features};
    }
  }, [container, isMounted, features]);

  return (
    <PortalsManagerContext.Provider value={contextValue}>
      {children}
      {container ? null : <PortalsContainer ref={ref} />}
    </PortalsManagerContext.Provider>
  );
}
