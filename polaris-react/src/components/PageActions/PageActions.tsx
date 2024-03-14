import React from 'react';

import type {
  ComplexAction,
  DisableableAction,
  LoadableAction,
} from '../../types';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../LegacyStack';
import {ButtonGroup} from '../ButtonGroup';
import {buttonsFrom} from '../Button';
import {isInterface} from '../../utilities/is-interface';
import {isReactElement} from '../../utilities/is-react-element';

import styles from './PageActions.module.css';

export interface PageActionsProps {
  /** The primary action for the page */
  primaryAction?: (DisableableAction & LoadableAction) | React.ReactNode;
  /** The secondary actions for the page */
  secondaryActions?: ComplexAction[] | React.ReactNode;
}

type MaybeJSX = JSX.Element | null;

export function PageActions({
  primaryAction,
  secondaryActions,
}: PageActionsProps) {
  let primaryActionMarkup: MaybeJSX = null;
  if (isReactElement(primaryAction)) {
    primaryActionMarkup = <>{primaryAction}</>;
  } else if (primaryAction) {
    primaryActionMarkup = buttonsFrom(primaryAction, {variant: 'primary'});
  }

  let secondaryActionsMarkup: MaybeJSX = null;
  if (isInterface(secondaryActions) && secondaryActions.length > 0) {
    secondaryActionsMarkup = (
      <ButtonGroup>{buttonsFrom(secondaryActions)}</ButtonGroup>
    );
  } else if (isReactElement(secondaryActions)) {
    secondaryActionsMarkup = <>{secondaryActions}</>;
  }

  return (
    <div className={styles.PageActions}>
      <LegacyStack distribution="trailing" spacing="tight">
        {secondaryActionsMarkup}
        {primaryActionMarkup}
      </LegacyStack>
    </div>
  );
}
