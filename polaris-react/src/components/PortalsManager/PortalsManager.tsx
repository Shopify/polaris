import React, {useMemo, useState} from 'react';

import {PortalsManagerContext} from '../../utilities/portals';
import type {PortalsContainerElement} from '../../utilities/portals';

import {PortalsContainer} from './components';

export interface PortalsManagerProps {
  children: React.ReactNode;
  container?: PortalsContainerElement;
}

export function PortalsManager({children, container}: PortalsManagerProps) {
  const [portalContainerElement, setPortalContainerElement] =
    useState<PortalsContainerElement>(null);

  const currentContainer = container ?? portalContainerElement;
  const contextValue = useMemo(
    () => ({container: currentContainer}),
    [currentContainer],
  );

  return (
    <PortalsManagerContext.Provider value={contextValue}>
      {children}
      {container ? null : <PortalsContainer ref={setPortalContainerElement} />}
    </PortalsManagerContext.Provider>
  );
}
