import React from 'react';

import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {Box} from '../../../Box';
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
      <Inline align="end" gap="2">
        {secondaryActionButtons}
        {primaryActionButton}
      </Inline>
    ) : null;

  const childMarkup = children ? (
    <Inline blockAlign="center" align="space-between">
      <Box width="100%">{children}</Box>
      {actions}
    </Inline>
  ) : (
    actions
  );

  return (
    <Inline blockAlign="center">
      <Box
        borderBlockStart="divider"
        minHeight="var(--p-space-16)"
        padding="4"
        width="100%"
      >
        {childMarkup}
      </Box>
    </Inline>
  );
}
