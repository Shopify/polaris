import React, {useState} from 'react';

import {useFeatures} from '../../utilities/features';
import {classNames} from '../../utilities/css';
import type {
  ActionListSection,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../types';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';

import {sortAndOverrideActionOrder} from './utilities';
import {MenuAction, MenuGroup, RollupActions} from './components';
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
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );

  if (actions.length === 0 && groups.length === 0) {
    return null;
  }

  const actionMenuClassNames = classNames(
    styles.ActionMenu,
    rollup && styles.rollup,
  );

  const rollupSections = groups.map((group) => convertGroupToSection(group));

  function renderActions() {
    const menuActions = [...actions, ...groups];

    const overriddenActions = sortAndOverrideActionOrder(menuActions);

    const actionMarkup = overriddenActions.map((action, index) => {
      if ('title' in action) {
        const {title, actions, ...rest} = action;

        return actions.length > 0 ? (
          <MenuGroup
            key={`MenuGroup-${index}`}
            title={title}
            active={title === activeMenuGroup}
            actions={actions}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
          />
        ) : null;
      }

      const {content, onAction, ...rest} = action;
      return newDesignLanguage ? (
        <Button key={index} onClick={onAction} {...rest}>
          {content}
        </Button>
      ) : (
        <MenuAction
          key={`MenuAction-${index}`}
          content={content}
          onAction={onAction}
          {...rest}
        />
      );
    });

    return (
      <div className={styles.ActionsLayout}>
        {newDesignLanguage ? (
          <ButtonGroup>{actionMarkup}</ButtonGroup>
        ) : (
          actionMarkup
        )}
      </div>
    );
  }

  function handleMenuGroupToggle(group: string) {
    setActiveMenuGroup(activeMenuGroup ? undefined : group);
  }

  function handleMenuGroupClose() {
    setActiveMenuGroup(undefined);
  }

  return (
    <div className={actionMenuClassNames}>
      {rollup ? (
        <RollupActions items={actions} sections={rollupSections} />
      ) : (
        renderActions()
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
