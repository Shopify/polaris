import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';

import {usePortalsManager} from '../../utilities/portals';
import {useUniqueId} from '../../utilities/unique-id';
import {useIsMountedRef} from '../../utilities/use-is-mounted-ref';

export interface PortalProps {
  children?: React.ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

export function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop,
}: PortalProps) {
  const isMounted = useIsMountedRef();
  const {container} = usePortalsManager();

  const uniqueId = useUniqueId('portal');
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    if (isMounted) {
      onPortalCreated();
    }
  }, [onPortalCreated, isMounted]);

  return container
    ? createPortal(<div data-portal-id={portalId}>{children}</div>, container)
    : null;
}

function noop() {}
