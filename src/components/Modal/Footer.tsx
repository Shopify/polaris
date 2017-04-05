import * as React from 'react';

import {buttonsFrom, Props as ButtonProps} from '../Button';
import ButtonGroup from '../ButtonGroup';
import Stack from '../Stack';
import * as styles from './Modal.scss';

export interface Props {
  primaryActions?: ButtonProps[],
  secondaryActions?: ButtonProps[],
  children?: React.ReactNode,
}

export default function Footer({
  primaryActions,
  secondaryActions,
  children,
}: Props) {
  const primaryActionButtons = primaryActions && buttonsFrom(primaryActions, {primary: true});
  const secondaryActionButtons = secondaryActions && buttonsFrom(secondaryActions);
  const actions = (primaryActionButtons || secondaryActionButtons)
    ? (
      <ButtonGroup>
        {secondaryActionButtons}
        {primaryActionButtons}
      </ButtonGroup>
    )
    : null;

  return (
    <div className={styles.Footer}>
      <div className={styles.FooterContent}>
        <Stack alignment="center">
          <Stack.Item fill>
            {children}
          </Stack.Item>
          {actions}
        </Stack>
      </div>
    </div>
  );
};
