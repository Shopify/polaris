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

  const actionMarkup =
    primaryActionButton || secondaryActionButtons ? (
      <Inline align="end" gap="2" wrap={false}>
        {secondaryActionButtons}
        {primaryActionButton}
      </Inline>
    ) : null;

  const customMarkup = children ? (
    <Box width={!actionMarkup ? '100%' : undefined}>{children}</Box>
  ) : null;

  return (
    <Box
      borderBlockStart="divider"
      paddingBlockStart="4"
      paddingBlockEnd="4"
      paddingInlineStart="5"
      paddingInlineEnd="5"
      width="100%"
    >
      <Inline
        wrap={false}
        gap="4"
        blockAlign="center"
        align={actionMarkup && customMarkup ? 'space-between' : 'end'}
      >
        {customMarkup}
        {actionMarkup}
      </Inline>
    </Box>
  );
}
