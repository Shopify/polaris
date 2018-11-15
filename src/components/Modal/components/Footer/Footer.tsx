import * as React from 'react';
<<<<<<< HEAD
import {buttonsFrom, ButtonGroup, Stack} from 'components';
import {ComplexAction, AppBridgeAction} from 'types';
=======

import {ComplexAction, AppBridgeAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import ButtonGroup from '../../../ButtonGroup';
import Stack from '../../../Stack';

>>>>>>> master
import * as styles from './Footer.scss';

export interface Props {
  /** Primary action */
  primaryAction?: AppBridgeAction | ComplexAction;
  /** Collection of secondary actions */
  secondaryActions?: AppBridgeAction[] | ComplexAction[];
  /** The content to display inside modal */
  children?: React.ReactNode;
}

export default function Footer({
  primaryAction,
  secondaryActions,
  children,
}: Props) {
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
