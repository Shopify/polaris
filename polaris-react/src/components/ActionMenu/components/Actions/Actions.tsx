import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {debounce} from '../../../../utilities/debounce';
import {useI18n} from '../../../../utilities/i18n';
import type {
  ActionListSection,
  ActionListItemDescriptor,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../../../types';
import {ButtonGroup} from '../../../ButtonGroup';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../../EventListener';
import {MenuGroup} from '../MenuGroup';
import {SecondaryAction} from '../SecondaryAction';

import styles from './Actions.scss';

interface Props {
  /** Collection of page-level secondary actions */
  actions?: MenuActionDescriptor[];
  /** Collection of page-level action groups */
  groups?: MenuGroupDescriptor[];
}

interface MeasuredActions {
  showable: MenuActionDescriptor[];
  rolledUp: (MenuActionDescriptor | MenuGroupDescriptor)[];
}

const ACTION_SPACING = 8;

export function Actions({actions = [], groups = []}: Props) {
  const i18n = useI18n();
  const actionsLayoutRef = useRef<HTMLDivElement>(null);
  const availableWidthRef = useRef<number>(0);
  const moreActionsWidthRef = useRef<HTMLDivElement>(null);
  const actionsAndGroupsLengthRef = useRef<number>(0);
  const timesMeasured = useRef(0);
  const actionWidthsRef = useRef<number[]>([]);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );
  const [measuredActions, setMeasuredActions] = useState<MeasuredActions>({
    showable: [],
    rolledUp: [],
  });

  const moreActionsText = i18n.translate(
    'Polaris.ActionMenu.Actions.moreActions',
  );

  const moreActionsRollupGroup = groups.find(
    ({title}) => title === moreActionsText,
  ) || {
    title: moreActionsText,
    actions: [],
  };

  const moreActionsRollupWidth = moreActionsWidthRef.current?.offsetWidth || 0;

  const handleActionsOffsetWidth = useCallback((width: number) => {
    actionWidthsRef.current = [...actionWidthsRef.current, width];
  }, []);

  const handleMenuGroupToggle = useCallback(
    (group: string) => setActiveMenuGroup(activeMenuGroup ? undefined : group),
    [activeMenuGroup],
  );

  const handleMenuGroupClose = useCallback(
    () => setActiveMenuGroup(undefined),
    [],
  );

  const updateActions = useCallback(() => {
    let actionsAndGroups = [...actions, ...groups];

    if (groups.length > 0) {
      // We don't want to include actions from the last group
      // since it is always rendered with its own actions
      actionsAndGroups = [...actionsAndGroups].slice(
        0,
        actionsAndGroups.length - 1,
      );
    }
    const showable = actionsAndGroups.slice(0, measuredActions.showable.length);
    const rolledUp = actionsAndGroups.slice(
      measuredActions.showable.length,
      actionsAndGroups.length,
    );

    setMeasuredActions({showable, rolledUp});
  }, [actions, groups, measuredActions.showable.length]);

  const measureActions = useCallback(() => {
    if (
      actionWidthsRef.current.length === 0 ||
      availableWidthRef.current === 0
    ) {
      return;
    }

    const actionsAndGroups = [...actions, ...groups];

    if (actionsAndGroups.length === 1) {
      setMeasuredActions({showable: actionsAndGroups, rolledUp: []});
      return;
    }

    let currentAvailableWidth = availableWidthRef.current;
    let newShowableActions: MenuActionDescriptor[] = [];
    let newRolledUpActions: (MenuActionDescriptor | MenuGroupDescriptor)[] = [];
    let showMoreActions = false;

    actionsAndGroups.forEach((action, index) => {
      const {title, content} = action;
      const currentActionWidth = actionWidthsRef.current[index];
      const canFitAction =
        currentActionWidth + ACTION_SPACING <= currentAvailableWidth;
      console.log(content || title, canFitAction);
      if (canFitAction) {
        currentAvailableWidth -= currentActionWidth + ACTION_SPACING * 2;
        newShowableActions = [...newShowableActions, action];
      } else {
        if (
          showMoreActions === false &&
          moreActionsRollupWidth <= currentAvailableWidth
        ) {
          showMoreActions = true;
        }

        currentAvailableWidth = 0;
        newRolledUpActions = [...newRolledUpActions, action];
      }
    });

    setMeasuredActions({
      showable: newShowableActions,
      rolledUp: newRolledUpActions,
    });

    timesMeasured.current += 1;
    actionsAndGroupsLengthRef.current = actionsAndGroups.length;
  }, [actions, groups]);

  const handleResize = useMemo(
    () =>
      debounce(
        () => {
          if (!actionsLayoutRef.current) return;
          availableWidthRef.current = actionsLayoutRef.current.offsetWidth;
          // Set timesMeasured to 0 to allow re-measuring
          timesMeasured.current = 0;
          measureActions();
        },
        50,
        {leading: false, trailing: true},
      ),
    [measureActions],
  );

  useEffect(() => {
    if (!actionsLayoutRef.current) {
      return;
    }

    availableWidthRef.current = actionsLayoutRef.current.offsetWidth;
    if (
      // Allow measuring twice
      // This accounts for the initial paint and re-flow
      timesMeasured.current >= 2 &&
      [...actions, ...groups].length === actionsAndGroupsLengthRef.current
    ) {
      updateActions();
      return;
    }
    measureActions();
  }, [actions, groups, measureActions, updateActions]);

  const actionsMarkup = actions.map((action) => {
    if (
      measuredActions.showable.length > 0 ||
      measuredActions.rolledUp.includes(action)
    )
      return null;

    const {content, onAction, ...rest} = action;

    return (
      <SecondaryAction
        key={content}
        onClick={onAction}
        {...rest}
        getOffsetWidth={handleActionsOffsetWidth}
      >
        {content}
      </SecondaryAction>
    );
  });

  const rollUppableActionsMarkup =
    measuredActions.showable.length > 0
      ? measuredActions.showable.map(
          (action) =>
            action.content && (
              <SecondaryAction
                key={action.content}
                {...action}
                getOffsetWidth={handleActionsOffsetWidth}
              >
                {action.content}
              </SecondaryAction>
            ),
        )
      : null;

  const filteredGroups = groups.filter((group) => {
    const isRolledUp = !measuredActions.rolledUp.some(
      (rolledUpGroup) =>
        isMenuGroup(rolledUpGroup) && rolledUpGroup.title === group.title,
    );

    return !isRolledUp || group.title === moreActionsRollupGroup.title;
  });

  const groupsMarkup = [...filteredGroups, moreActionsRollupGroup].map(
    (group) => {
      const {title, actions: groupActions, ...rest} = group;
      const isDefaultGroup = group.title === moreActionsRollupGroup.title;
      const finalRolledUpActions: ActionListItemDescriptor[] = [];
      const finalRolledUpGroups: ActionListSection[] = [];

      measuredActions.rolledUp.forEach((action) => {
        isMenuGroup(action)
          ? finalRolledUpGroups.push({
              title: action.title,
              items: action.actions,
            })
          : finalRolledUpActions.push(action);
      });

      console.log(
        title,
        isDefaultGroup,
        finalRolledUpActions,
        finalRolledUpGroups,
      );

      if (!isDefaultGroup) {
        return (
          <MenuGroup
            key={title}
            title={title}
            active={title === activeMenuGroup}
            actions={groupActions}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
            getOffsetWidth={handleActionsOffsetWidth}
          />
        );
      } else if (isDefaultGroup && finalRolledUpActions.length > 0) {
        return (
          <MenuGroup
            key={title}
            title={title}
            active={title === activeMenuGroup}
            actions={finalRolledUpActions}
            sections={finalRolledUpGroups}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
            getOffsetWidth={handleActionsOffsetWidth}
          />
        );
      }
    },
  );

  const groupedActionsMarkup = (
    <ButtonGroup spacing="extraTight">
      {rollUppableActionsMarkup}
      {actionsMarkup}
      {groupsMarkup}
    </ButtonGroup>
  );

  return (
    <div className={styles.ActionsLayout} ref={actionsLayoutRef}>
      {groupedActionsMarkup}
      <EventListener event="resize" handler={handleResize} />
      <div
        aria-hidden
        className={styles.MoreActionsMeasurer}
        ref={moreActionsWidthRef}
      >
        <MenuGroup
          {...moreActionsRollupGroup}
          onOpen={() => {}}
          onClose={() => {}}
        />
      </div>
    </div>
  );
}

function isMenuGroup(
  actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor,
): actionOrMenuGroup is MenuGroupDescriptor {
  return 'title' in actionOrMenuGroup;
}
