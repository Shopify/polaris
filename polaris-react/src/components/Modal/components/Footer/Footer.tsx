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
      <Inline gap="2">
        {secondaryActionButtons}
        {primaryActionButton}
      </Inline>
    ) : null;

  return (
    <Inline blockAlign="center">
      <Box
        borderColor="border-subdued"
        borderStyle="solid"
        borderWidth="1"
        minHeight="var(--p-space-16)"
        padding="4"
        width="100%"
      >
        <Inline blockAlign="center" align="space-between">
          <Box>{children}</Box>
          {actions}
        </Inline>
      </Box>
    </Inline>
  );
}
