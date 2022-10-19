import React from 'react';

import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {Box} from '../../../Box';
import {Columns} from '../../../Columns';
import {Inline} from '../../../Inline';

export interface FooterProps {
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** The content to display inside modal */
  children?: React.ReactNode;
}

export function Footer({
  primaryAction,
  secondaryActions,
  children,
}: FooterProps) {
  const primaryActionButton =
    (primaryAction && buttonsFrom(primaryAction, {primary: true})) || null;
  const secondaryActionButtons =
    (secondaryActions && buttonsFrom(secondaryActions)) || null;
  const actions =
    primaryActionButton || secondaryActionButtons ? (
      <ButtonGroup>
        {secondaryActionButtons}
        {primaryActionButton}
      </ButtonGroup>
    ) : null;

  return (
    <Box
      borderTop="divider"
      minHeight="var(--p-space-16)"
      padding="4"
      width="100%"
    >
      <Columns columns={{xs: '1fr auto'}}>
        <Inline alignY="center">{children}</Inline>
        <Inline align="end" alignY="center">
          {actions}
        </Inline>
      </Columns>
    </Box>
  );
}
