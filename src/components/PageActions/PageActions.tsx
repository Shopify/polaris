import * as React from 'react';

import {ComplexAction, DisableableAction, LoadableAction} from '../../types';
import Stack from '../Stack';
import ButtonGroup from '../ButtonGroup';
import {buttonsFrom} from '../Button';

import * as styles from './PageActions.scss';

export interface Props {
  /** The primary action for the page */
  primaryAction?: DisableableAction & LoadableAction,
  /** The secondary actions for the page */
  secondaryActions?: ComplexAction[],
}

export default function PageActions({
  primaryAction,
  secondaryActions,
}: Props) {
  const primaryActionMarkup = primaryAction
    ? buttonsFrom(primaryAction, {primary: true})
    : null;

  const secondaryActionsMarkup = secondaryActions
    ? (
      <ButtonGroup>
        {buttonsFrom(secondaryActions)}
      </ButtonGroup>
    )
    : null;

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
