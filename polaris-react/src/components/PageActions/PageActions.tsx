import React from 'react';

import type {
  ComplexAction,
  DisableableAction,
  LoadableAction,
} from '../../types';
import {Stack} from '../Stack';
import {ButtonGroup} from '../ButtonGroup';
import {buttonsFrom} from '../Button';
import {isInterface} from '../../utilities/is-interface';
import {isReactElement} from '../../utilities/is-react-element';

import styles from './PageActions.scss';

export interface PageActionsProps {
  /** The primary action for the page */
  primaryAction?: DisableableAction & LoadableAction;
  /** The secondary actions for the page */
  secondaryActions?: ComplexAction[] | React.ReactNode;
}

type MaybeJSX = JSX.Element | null;

export function PageActions({
  primaryAction,
  secondaryActions,
}: PageActionsProps) {
  const primaryActionMarkup = primaryAction
    ? buttonsFrom(primaryAction, {primary: true})
    : null;

  let secondaryActionsMarkup: MaybeJSX = null;
  if (isInterface(secondaryActions) && secondaryActions.length > 0) {
    secondaryActionsMarkup = (
      <ButtonGroup>{buttonsFrom(secondaryActions)}</ButtonGroup>
    );
  } else if (isReactElement(secondaryActions)) {
    secondaryActionsMarkup = <>{secondaryActions}</>;
  }

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
