import type {ReactNode} from 'react';
import {useEffect} from 'react';
import {createPortal} from 'react-dom';

import {usePortalsManager} from '../../utilities/portals';
import {useUniqueId} from '../../utilities/unique-id';

export interface PortalProps {
  children?: ReactNode;
  idPrefix?: string;
  onPortalCreated?(): void;
}

export function Portal({
  children,
  idPrefix = '',
  onPortalCreated = noop,
}: PortalProps) {
  const {container} = usePortalsManager();

  const uniqueId = useUniqueId('portal');
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);

  return container
    ? createPortal(<div data-portal-id={portalId}>{children}</div>, container)
    : null;
}

function noop() {}
