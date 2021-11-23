import type {ReactNode} from 'react';

import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {Stack} from '../../../Stack';

import styles from './Footer.scss';

export interface FooterProps {
  /** Primary action */
  primaryAction?: ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: ComplexAction[];
  /** The content to display inside modal */
  children?: ReactNode;
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
    <div className={styles.Footer}>
      <div className={styles.FooterContent}>
        <Stack alignment="center">
          <Stack.Item fill>{children}</Stack.Item>
          {actions}
        </Stack>
      </div>
    </div>
  );
}
