import {useEffect, useId} from 'react';
import {createPortal} from 'react-dom';

import {usePortalsManager} from '../../utilities/portals';

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
  const {container} = usePortalsManager();

  const uniqueId = useId();
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);

  return container
    ? createPortal(<div data-portal-id={portalId}>{children}</div>, container)
    : null;
}

function noop() {}
