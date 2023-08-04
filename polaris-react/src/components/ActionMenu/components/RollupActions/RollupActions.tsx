import React, {useState} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import type {
  ActionListSection,
  ActionListItemDescriptor,
} from '../../../../types';
import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {ActionList} from '../../../ActionList';
import {Button} from '../../../Button';
import {Popover} from '../../../Popover';
import {TextField} from '../../../TextField';

import styles from './RollupActions.scss';

export interface RollupActionsProps {
  /** Accessibilty label */
  accessibilityLabel?: string;
  /** Collection of actions for the list */
  items?: ActionListItemDescriptor[];
  /** Collection of sectioned action items */
  sections?: ActionListSection[];
}

export function RollupActions({
  accessibilityLabel,
  items = [],
  sections = [],
}: RollupActionsProps) {
  const i18n = useI18n();
  const [searchText, setSeachText] = useState('');

  const {value: rollupOpen, toggle: toggleRollupOpen} = useToggle(false);

  if (items.length === 0 && sections.length === 0) {
    return null;
  }

  const activatorMarkup = (
    <div className={styles.RollupActivator}>
      <Button
        outline
        icon={HorizontalDotsMinor}
        accessibilityLabel={
          accessibilityLabel ||
          i18n.translate('Polaris.ActionMenu.RollupActions.rollupButton')
        }
        onClick={toggleRollupOpen}
      />
    </div>
  );

  const filteredItems = items.filter((item) =>
    item.content?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredSections = sections?.filter((section) =>
    section.items.some((item) =>
      item.content?.toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  return (
    <Popover
      active={rollupOpen}
      activator={activatorMarkup}
      preferredAlignment="right"
      onClose={toggleRollupOpen}
      hideOnPrint
    >
      <TextField
        label="Search"
        labelHidden
        autoComplete=""
        value={searchText}
        onChange={(value) => setSeachText(value)}
      />
      <ActionList
        items={filteredItems}
        sections={filteredSections}
        onActionAnyItem={toggleRollupOpen}
      />
    </Popover>
  );
}
