import React from 'react';

import type {
  ComplexAction,
  DisableableAction,
  LoadableAction,
} from '../../types';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../LegacyStack';
import {ButtonGroup} from '../ButtonGroup';
import {buttonFrom, buttonsFrom} from '../Button';
import {isInterface} from '../../utilities/is-interface';
import {isReactElement} from '../../utilities/is-react-element';

import styles from './PageActions.scss';

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
      <ButtonGroup>
        {secondaryActions.map((action) => {
          const plainVariant = action.plain ? 'plain' : undefined;
          const primaryVariant = action.destructive ? 'primary' : undefined;
          return buttonFrom(action, {
            tone: action.destructive ? 'critical' : action.tone,
            variant: plainVariant ?? primaryVariant ?? action.variant,
          });
        })}
      </ButtonGroup>
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
