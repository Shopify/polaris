import React, {useContext, useEffect} from 'react';
import {createPortal} from 'react-dom';

import {PortalsManagerContext} from '../../utilities/portals';
import {globalIdGeneratorFactory} from '../../utilities/unique-id';
import {useIsMountedRef} from '../../utilities/use-is-mounted-ref';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

const getUniqueID = globalIdGeneratorFactory('portal-');

export function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop,
}: PortalProps) {
  const isMounted = useIsMountedRef();
  const portalsContext = useContext(PortalsManagerContext);

  const portalId =
    idPrefix !== '' ? `${idPrefix}-${getUniqueID()}` : getUniqueID();

  useEffect(() => {
    if (isMounted) {
      onPortalCreated();
    }
  }, [onPortalCreated, isMounted]);

  return portalsContext && portalsContext.portalsContainerRef
    ? createPortal(
        <div data-portal-id={portalId}>{children}</div>,
        portalsContext.portalsContainerRef,
      )
    : null;
}

function noop() {}
