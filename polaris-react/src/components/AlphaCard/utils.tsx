import React from 'react';

import {useI18n} from '../../utilities/i18n';
import {useToggle} from '../../utilities/use-toggle';
import {Popover} from '../Popover';
import {Button, buttonFrom} from '../Button';
import {ActionList} from '../ActionList';
import type {ComplexAction} from '../../types';

interface SecondaryActions {
  secondaryActions: ComplexAction[];
  secondaryActionsDisclosureText?: string;
  plainButton?: boolean;
}

export function secondaryActionsFrom({
  secondaryActions,
  secondaryActionsDisclosureText,
  plainButton = false,
}: SecondaryActions) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const i18n = useI18n();
  const {
    value: secondaryActionsPopoverOpen,
    toggle: toggleSecondaryActionsPopoverOpen,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useToggle(false);

  let secondaryActionsMarkup = null;

  if (secondaryActions?.length === 1) {
    secondaryActionsMarkup = buttonFrom(secondaryActions[0]);
  }

  if (secondaryActions?.length > 1) {
    secondaryActionsMarkup = (
      <Popover
        active={secondaryActionsPopoverOpen}
        activator={
          <Button
            disclosure
            plain={plainButton}
            onClick={toggleSecondaryActionsPopoverOpen}
          >
            {secondaryActionsDisclosureText ||
              i18n.translate('Polaris.Common.more')}
          </Button>
        }
        onClose={toggleSecondaryActionsPopoverOpen}
      >
        <ActionList items={secondaryActions} />
      </Popover>
    );
  }

  return <>{secondaryActionsMarkup}</>;
}
