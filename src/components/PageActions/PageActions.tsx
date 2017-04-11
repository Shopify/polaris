import * as React from 'react';

import {DisableableAction, ComplexAction} from '../types';
import Stack from '../Stack';
import ButtonGroup from '../ButtonGroup';
import {buttonsFrom} from '../Button';

import * as styles from './PageActions.scss';

export interface Props {
  primaryAction?: DisableableAction,
  secondaryActions?: ComplexAction[],
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
