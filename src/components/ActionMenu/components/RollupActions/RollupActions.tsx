import React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import type {
  ActionListSection,
  ActionListItemDescriptor,
} from '../../../../types';
import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {useFeatures} from '../../../../utilities/features';
import {classNames} from '../../../../utilities/css';
import {ActionList} from '../../../ActionList';
import {Button} from '../../../Button';
import {Popover} from '../../../Popover';

import styles from './RollupActions.scss';

export interface RollupActionsProps {
  /** Collection of actions for the list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
}

export function RollupActions({items = [], sections = []}: RollupActionsProps) {
  const i18n = useI18n();
  const {newDesignLanguage} = useFeatures();
  const classname = classNames(
    styles.RollupActivator,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const {value: rollupOpen, toggle: toggleRollupOpen} = useToggle(false);

  if (items.length === 0 && sections.length === 0) {
    return null;
  }

  const activatorMarkup = (
    <div className={classname}>
      <Button
        plain={!newDesignLanguage}
        outline={newDesignLanguage}
        icon={HorizontalDotsMinor}
        accessibilityLabel={i18n.translate(
          'Polaris.ActionMenu.RollupActions.rollupButton',
        )}
        onClick={toggleRollupOpen}
      />
    </div>
  );

  return (
    <Popover
      active={rollupOpen}
      activator={activatorMarkup}
      preferredAlignment="right"
      onClose={toggleRollupOpen}
      hideOnPrint
    >
      <ActionList
        items={items}
        sections={sections}
        onActionAnyItem={toggleRollupOpen}
      />
    </Popover>
  );
}
