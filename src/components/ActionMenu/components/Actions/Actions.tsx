import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import debounce from 'lodash/debounce';

import {useFeatures} from '../../../../utilities/features';
import {useI18n} from '../../../../utilities/i18n';
import {classNames} from '../../../../utilities/css';
import type {
  ActionListItemDescriptor,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../../../types';
import {ButtonGroup} from '../../../ButtonGroup';
import {EventListener} from '../../../EventListener';
import {MenuGroup} from '../MenuGroup';
import {MenuAction} from '../MenuAction';
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
  const {newDesignLanguage} = useFeatures();
  const actionsLayoutRef = useRef<HTMLDivElement>(null);
  const menuGroupWidthRef = useRef<number>(0);
  const availableWidthRef = useRef<number>(0);
  const hasMeasured = useRef<boolean>(false);
  const actionWidthsRef = useRef<number[]>([]);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );
  const [measuredActions, setMeasuredActions] = useState<MeasuredActions>({
    showable: [],
    rolledUp: [],
  });
  const defaultRollupGroup: MenuGroupDescriptor = {
    title: i18n.translate('Polaris.Actions.moreActions'),
    actions: [],
  };
  const lastMenuGroup = [...groups].pop();
  const lastMenuGroupWidth = [...actionWidthsRef.current].pop() || 0;

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

  const measureActions = useCallback(() => {
    if (
      !newDesignLanguage ||
      actionWidthsRef.current.length === 0 ||
      availableWidthRef.current === 0 ||
      hasMeasured.current
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

    actionsAndGroups.forEach((action, index) => {
      const canFitAction =
        actionWidthsRef.current[index] +
          menuGroupWidthRef.current +
          ACTION_SPACING +
          lastMenuGroupWidth <=
        currentAvailableWidth;

      if (canFitAction) {
        currentAvailableWidth -=
          actionWidthsRef.current[index] + ACTION_SPACING * 2;
        newShowableActions = [...newShowableActions, action];
      } else {
        currentAvailableWidth = 0;
        // Find last group if it exists and always render it as a rolled up action below
        if (action === lastMenuGroup) return;
        newRolledUpActions = [...newRolledUpActions, action];
      }
    });

    setMeasuredActions({
      showable: newShowableActions,
      rolledUp: newRolledUpActions,
    });

    // Set hasMeasured to true to prevent re-renders until viewport has been resized
    hasMeasured.current = true;
  }, [actions, groups, lastMenuGroup, lastMenuGroupWidth, newDesignLanguage]);

  const handleResize = useMemo(
    () =>
      debounce(
        () => {
          if (!newDesignLanguage || !actionsLayoutRef.current) return;
          availableWidthRef.current = actionsLayoutRef.current.offsetWidth;
          // Set hasMeasured to false to allow re-measuring
          hasMeasured.current = false;
          measureActions();
        },
        50,
        {leading: false, trailing: true},
      ),
    [newDesignLanguage, measureActions],
  );

  useEffect(() => {
    if (!actionsLayoutRef.current) {
      return;
    }

    availableWidthRef.current = actionsLayoutRef.current.offsetWidth;
    measureActions();
  }, [measureActions]);

  const className = classNames(
    styles.ActionsLayout,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const actionsMarkup = actions.map((action) => {
    if (
      (newDesignLanguage && measuredActions.showable.length > 0) ||
      measuredActions.rolledUp.includes(action)
    )
      return null;

    const {content, onAction, ...rest} = action;

    return newDesignLanguage ? (
      <SecondaryAction
        key={content}
        onClick={onAction}
        {...rest}
        getOffsetWidth={handleActionsOffsetWidth}
      >
        {content}
      </SecondaryAction>
    ) : (
      <MenuAction
        key={content}
        content={content}
        onAction={onAction}
        {...rest}
      />
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

  const groupsMarkup = [...groups, defaultRollupGroup]
    .filter((group) => {
      return groups.length === 0 && group === defaultRollupGroup
        ? group
        : group === lastMenuGroup ||
            !measuredActions.rolledUp.some(
              (rolledUpGroup) =>
                isMenuGroup(rolledUpGroup) &&
                rolledUpGroup.title === group.title,
            );
    })
    .map((group) => {
      const {title, actions: groupActions, ...rest} = group;
      const finalRolledUpActions = measuredActions.rolledUp.reduce(
        (memo, action) => {
          memo.push(...(isMenuGroup(action) ? action.actions : [action]));

          return memo;
        },
        [] as ActionListItemDescriptor[],
      );

      const isDefaultGroup = group === defaultRollupGroup;

      if (
        isDefaultGroup &&
        groups.length === 0 &&
        finalRolledUpActions.length > 0
      ) {
        return (
          <MenuGroup
            key={title}
            title={title}
            active={title === activeMenuGroup}
            actions={[
              ...(finalRolledUpActions || actions),
              ...(!isDefaultGroup ? groupActions : []),
            ]}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
            getOffsetWidth={handleActionsOffsetWidth}
          />
        );
      } else if (
        !isDefaultGroup &&
        (groups.length > 0 || groupActions.length || actions.length)
      ) {
        return (
          <MenuGroup
            key={title}
            title={title}
            active={title === activeMenuGroup}
            actions={[
              ...(finalRolledUpActions || actions),
              ...(!isDefaultGroup ? groupActions : []),
            ]}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
            getOffsetWidth={handleActionsOffsetWidth}
          />
        );
      }
    });

  const groupedActionsMarkup = newDesignLanguage ? (
    <ButtonGroup spacing="extraTight">
      {rollUppableActionsMarkup}
      {actionsMarkup}
      {groupsMarkup}
    </ButtonGroup>
  ) : (
    <>
      {actionsMarkup}
      {groupsMarkup}
    </>
  );

  return (
    <div className={className} ref={actionsLayoutRef}>
      {groupedActionsMarkup}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}

function isMenuGroup(
  actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor,
): actionOrMenuGroup is MenuGroupDescriptor {
  return 'title' in actionOrMenuGroup;
}
