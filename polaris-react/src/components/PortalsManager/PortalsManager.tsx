import React, {useMemo, useRef} from 'react';

import {PortalsManagerContext} from '../../utilities/portals';
import type {PortalsContainerElement} from '../../utilities/portals';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';

import {PortalsContainer} from './components';

export interface PortalsManagerProps {
  children: React.ReactNode;
  container?: PortalsContainerElement;
}

export function PortalsManager({children, container}: PortalsManagerProps) {
  const isMounted = useIsAfterInitialMount();
  const ref = useRef<PortalsContainerElement>(null);

  const contextValue = useMemo(() => {
    if (container) {
      return {container};
    } else if (isMounted) {
      return {container: ref.current};
    } else {
      return {container: null};
    }
  }, [container, isMounted]);

  return (
    <PortalsManagerContext.Provider value={contextValue}>
      {children}
      {container ? null : <PortalsContainer ref={ref} />}
    </PortalsManagerContext.Provider>
  );
}
