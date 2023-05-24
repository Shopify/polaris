import React from 'react';

import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {Box} from '../../../Box';
import {HorizontalStack} from '../../../HorizontalStack';

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
      <HorizontalStack gap="2">
        {secondaryActionButtons}
        {primaryActionButton}
      </HorizontalStack>
    ) : null;

  return (
    <HorizontalStack gap="4" blockAlign="center">
      <Box
        borderColor="border-subdued"
        borderBlockStartWidth="1"
        minHeight="var(--p-space-16)"
        padding="4"
        paddingInlineStart="5"
        paddingInlineEnd="5"
        width="100%"
      >
        <HorizontalStack gap="4" blockAlign="center" align="space-between">
          <Box>{children}</Box>
          {actions}
        </HorizontalStack>
      </Box>
    </HorizontalStack>
  );
}
