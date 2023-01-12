import React, {useEffect} from 'react';
import {createPortal} from 'react-dom';
import {nanoid} from 'nanoid';

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
  const container = document.getElementById('glints-portal-container');
  if (!container) {
    throw new Error(
      'No element with id `glints-portal-container` found, please add it outside where the root app is rendered',
    );
  }
  const uniqueId = `portal-${nanoid()}`;
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);

  return container
    ? createPortal(<div data-portal-id={portalId}>{children}</div>, container)
    : null;
}

function noop() {}
