import React, {useCallback, useState} from 'react';

import {classNames} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';
import type {
  ActionListSection,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../types';

import {Actions, RollupActions} from './components';
import styles from './ActionMenu.scss';

export interface ActionMenuProps {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
  /** Roll up all actions into a Popover > ActionList */
  rollup?: boolean;
}

export function ActionMenu({
  actions = [],
  groups = [],
  rollup,
}: ActionMenuProps) {
  const {newDesignLanguage} = useFeatures();
  const [shouldRollUp, setShouldRollup] = useState(false);
  const handleShouldRollup = useCallback((value: boolean) => {
    setShouldRollup(value);
  }, []);

  if (actions.length === 0 && groups.length === 0) {
    return null;
  }

  const actionMenuClassNames = classNames(
    styles.ActionMenu,
    rollup && styles.rollup,
  );

  const rollupSections = groups.map((group) => convertGroupToSection(group));

  return (
    <div className={actionMenuClassNames}>
      {rollup || (newDesignLanguage && shouldRollUp) ? (
        <RollupActions items={actions} sections={rollupSections} />
      ) : (
        <Actions
          actions={actions}
          groups={groups}
          shouldRollUp={handleShouldRollup}
        />
      )}
    </div>
  );
}

export function hasGroupsWithActions(groups: ActionMenuProps['groups'] = []) {
  return groups.length === 0
    ? false
    : groups.some((group) => group.actions.length > 0);
}

function convertGroupToSection({
  title,
  actions,
}: MenuGroupDescriptor): ActionListSection {
  return {title, items: actions};
}
