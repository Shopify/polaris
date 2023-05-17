import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';

import {usePortalsManager} from '../../utilities/portals';
import {useUniqueId} from '../../utilities/unique-id';
import {
  useFeatures,
  summerEditions2023ClassName,
} from '../../utilities/features';

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
  const {polarisSummerEditions2023} = useFeatures();

  const uniqueId = useUniqueId('portal');
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);

  return container
    ? createPortal(
        <div
          data-portal-id={portalId}
          className={
            polarisSummerEditions2023 ? summerEditions2023ClassName : undefined
          }
        >
          {children}
        </div>,
        container,
      )
    : null;
}

function noop() {}
