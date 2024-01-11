import React, {useCallback, useRef, useState} from 'react';

import type {
  ActionListItemDescriptor,
  ActionListSection,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../../../types';
import {MenuGroup} from '../MenuGroup';
import {useI18n} from '../../../../utilities/i18n';
import {SecondaryAction} from '../SecondaryAction';

import styles from './Actions.module.scss';
import type {ActionsMeasurements} from './components';
import {ActionsMeasurer} from './components';
import {getVisibleAndHiddenActionsIndices} from './utilities';

interface Props {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  onActionRollup?(hasRolledUp: boolean): void;
}
interface MeasuredActionsIndices {
  visibleActions: number[];
  hiddenActions: number[];
  visibleGroups: number[];
  hiddenGroups: number[];
}

export function Actions({actions = [], groups = [], onActionRollup}: Props) {
  const i18n = useI18n();
  const rollupActiveRef = useRef<boolean | null>(null);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );
  const [
    {visibleActions, hiddenActions, visibleGroups, hiddenGroups},
    setMeasuredActionsIndices,
  ] = useState<MeasuredActionsIndices>({
    visibleActions: [],
    hiddenActions: [],
    visibleGroups: [],
    hiddenGroups: [],
  });

  const defaultRollupGroup: MenuGroupDescriptor = {
    title: i18n.translate('Polaris.ActionMenu.Actions.moreActions'),
    actions: [],
  };

  const handleMenuGroupToggle = useCallback(
    (group: string) => setActiveMenuGroup(activeMenuGroup ? undefined : group),
    [activeMenuGroup],
  );

  const handleMenuGroupClose = useCallback(
    () => setActiveMenuGroup(undefined),
    [],
  );

  const actionsMarkup = actions.map((action, index) => {
    if (!visibleActions.includes(index)) {
      return null;
    }

    const {content, onAction, ...rest} = action;

    return (
      <SecondaryAction key={content} onClick={onAction} {...rest}>
        {content}
      </SecondaryAction>
    );
  });

  const groupsToFilters =
    hiddenGroups.length > 0 || hiddenActions.length > 0
      ? [...groups, defaultRollupGroup]
      : [...groups];

  const filteredGroups = groupsToFilters.filter((group, index) => {
    const hasNoGroupsProp = groups.length === 0;
    const isVisibleGroup = visibleGroups.includes(index);
    const isDefaultGroup = group === defaultRollupGroup;

    if (hasNoGroupsProp) {
      return hiddenActions.length > 0;
    }

    if (isDefaultGroup) {
      return true;
    }

    return isVisibleGroup;
  });

  const hiddenActionObjects = hiddenActions.map((index) => actions[index]);
  const hiddenGroupObjects = hiddenGroups.map((index) => groups[index]);

  const groupsMarkup = filteredGroups.map((group) => {
    const {title, actions: groupActions, ...rest} = group;
    const isDefaultGroup = group === defaultRollupGroup;
    const allHiddenItems = [...hiddenActionObjects, ...hiddenGroupObjects];
    const [finalRolledUpActions, finalRolledUpSectionGroups] =
      allHiddenItems.reduce(
        ([actions, sections], action) => {
          if (isMenuGroup(action)) {
            sections.push({
              title: action.title,
              items: action.actions.map((sectionAction) => ({
                ...sectionAction,
                disabled: action.disabled || sectionAction.disabled,
              })),
            });
          } else {
            actions.push(action);
          }

          return [actions, sections];
        },
        [[] as ActionListItemDescriptor[], [] as ActionListSection[]],
      );
    if (!isDefaultGroup) {
      // Render a normal MenuGroup with just its actions
      return (
        <MenuGroup
          key={title}
          title={title}
          active={title === activeMenuGroup}
          actions={groupActions}
          {...rest}
          onOpen={handleMenuGroupToggle}
          onClose={handleMenuGroupClose}
        />
      );
    }
    return (
      <MenuGroup
        key={title}
        title={title}
        active={title === activeMenuGroup}
        actions={[...finalRolledUpActions, ...groupActions]}
        sections={finalRolledUpSectionGroups}
        {...rest}
        onOpen={handleMenuGroupToggle}
        onClose={handleMenuGroupClose}
      />
    );
  });

  const handleMeasurement = useCallback(
    (measurements: ActionsMeasurements) => {
      const {
        hiddenActionsWidths: actionsWidths,
        containerWidth,
        disclosureWidth,
      } = measurements;

      const {visibleActions, hiddenActions, visibleGroups, hiddenGroups} =
        getVisibleAndHiddenActionsIndices(
          actions,
          groups,
          disclosureWidth,
          actionsWidths,
          containerWidth,
        );

      if (onActionRollup) {
        const isRollupActive =
          hiddenActions.length > 0 || hiddenGroups.length > 0;
        if (rollupActiveRef.current !== isRollupActive) {
          onActionRollup(isRollupActive);
          rollupActiveRef.current = isRollupActive;
        }
      }
      setMeasuredActionsIndices({
        visibleActions,
        hiddenActions,
        visibleGroups,
        hiddenGroups,
      });
    },
    [actions, groups, onActionRollup],
  );

  const actionsMeasurer = (
    <ActionsMeasurer
      actions={actions}
      groups={groups}
      handleMeasurement={handleMeasurement}
    />
  );

  return (
    <div className={styles.ActionsLayoutOuter}>
      {actionsMeasurer}
      <div className={styles.ActionsLayout}>
        {actionsMarkup}
        {groupsMarkup}
      </div>
    </div>
  );
}

function isMenuGroup(
  actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor,
): actionOrMenuGroup is MenuGroupDescriptor {
  return 'title' in actionOrMenuGroup;
}
