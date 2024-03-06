import React, {useEffect, useId} from 'react';
import {createPortal} from 'react-dom';

import {usePortalsManager} from '../../utilities/portals';
import {useTheme} from '../../utilities/use-theme';
import {ThemeProvider} from '../ThemeProvider';

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
  const theme = useTheme();
  const {container} = usePortalsManager();

  const uniqueId = useId();
  const portalId = idPrefix !== '' ? `${idPrefix}-${uniqueId}` : uniqueId;

  useEffect(() => {
    onPortalCreated();
  }, [onPortalCreated]);

  return container
    ? createPortal(
        <ThemeProvider theme={theme.themeName} data-portal-id={portalId}>
          {children}
        </ThemeProvider>,
        container,
      )
    : null;
}

function noop() {}
