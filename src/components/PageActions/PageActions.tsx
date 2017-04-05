import * as React from 'react';
import Stack from '../Stack';
import ButtonGroup from '../ButtonGroup';
import {buttonsFrom, Props as ButtonProps} from '../Button/Button';
import * as styles from './PageActions.scss';

export interface Props {
  primaryAction?: ButtonProps,
  secondaryActions?: ButtonProps[],
}

export default function PageActions({
  primaryAction,
  secondaryActions,
}: Props) {
  const primaryActionMarkup = primaryAction && buttonsFrom(primaryAction, {primary: true});

  const secondaryActionsMarkup = secondaryActions && (
    <ButtonGroup>
      {buttonsFrom(secondaryActions)}
    </ButtonGroup>
  );

  const distribution = secondaryActionsMarkup ? 'equalSpacing' : 'trailing';

  return (
    <div className={styles.PageActions}>
      <Stack distribution={distribution} spacing="tight">
        {secondaryActionsMarkup}
        {primaryActionMarkup}
      </Stack>
    </div>
  );
}
