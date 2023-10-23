import React from 'react';

import type {ComplexAction} from '../../../../types';
import {buttonFrom, buttonsFrom} from '../../../Button';
import {Box} from '../../../Box';
import {InlineStack} from '../../../InlineStack';

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
    (primaryAction &&
      buttonsFrom(primaryAction, {
        variant: 'primary',
        tone: primaryAction?.destructive ? 'critical' : primaryAction.tone,
      })) ||
    null;
  const secondaryActionButtons =
    (secondaryActions &&
      secondaryActions.map((action) =>
        buttonFrom(action, {
          tone: action.destructive ? 'critical' : action.tone,
          variant: action.plain ? 'plain' : action.variant,
        }),
      )) ||
    null;
  const actions =
    primaryActionButton || secondaryActionButtons ? (
      <InlineStack gap="200">
        {secondaryActionButtons}
        {primaryActionButton}
      </InlineStack>
    ) : null;

  return (
    <InlineStack gap="400" blockAlign="center">
      <Box
        borderColor="border"
        borderBlockStartWidth="025"
        padding="400"
        width="100%"
      >
        <InlineStack gap="400" blockAlign="center" align="space-between">
          <Box>{children}</Box>
          {actions}
        </InlineStack>
      </Box>
    </InlineStack>
  );
}
