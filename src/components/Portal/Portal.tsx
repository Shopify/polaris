import React, {useState, useRef, useContext, useEffect} from 'react';
import {createPortal} from 'react-dom';

import {PortalsManagerContext} from '../../utilities/portals';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

export const UNIQUE_CONTAINER_ID = 'polaris-portal-container';

export function Portal({children, onPortalCreated = noop}: PortalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const portalsContext = useContext(PortalsManagerContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      onPortalCreated();
    }
  }, [isMounted, onPortalCreated]);

  if (!portalsContext) {
    return;
  }

  return portalsContext.portalsContainerRef && isMounted
    ? createPortal(children, portalsContext.portalsContainerRef)
    : null;
}

function noop() {}
