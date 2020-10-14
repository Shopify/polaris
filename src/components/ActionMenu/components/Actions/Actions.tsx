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
  shouldRollUp?(value: boolean): void;
}

const ACTION_SPACING = 4;

export function Actions({actions = [], groups = [], shouldRollUp}: Props) {
  const i18n = useI18n();
  const {newDesignLanguage} = useFeatures();
  const actionsLayoutRef = useRef<HTMLDivElement>(null);
  const menuGroupWidthRef = useRef<number>(0);
  const [actionWidths, setActionWidths] = useState<number[]>([]);
  const [availableWidth, setAvailableWidth] = useState<number>(0);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );
  const [showableActions, setShowableActions] = useState<
    MenuActionDescriptor[]
  >([]);
  const [rolledUpActions, setRolledUpActions] = useState<
    (MenuActionDescriptor | MenuGroupDescriptor)[]
  >([]);
  const defaultRollupGroup: MenuGroupDescriptor = {
    title: i18n.translate('Polaris.Actions.moreActions'),
    actions: [],
  };
  const lastMenuGroup = [...groups].pop();
  const lastMenuGroupWidth = [...actionWidths].pop() || 0;

  const handleActionsOffsetWidth = useCallback((width: number) => {
    setActionWidths((actionWidths) => [...actionWidths, width]);
  }, []);

  const handleMenuGroupToggle = useCallback(
    (group: string) => setActiveMenuGroup(activeMenuGroup ? undefined : group),
    [activeMenuGroup],
  );

  const handleMenuGroupClose = useCallback(
    () => setActiveMenuGroup(undefined),
    [],
  );

  const handleResize = useMemo(
    () =>
      debounce(
        () => {
          if (!newDesignLanguage || !actionsLayoutRef.current) return;
          setAvailableWidth(actionsLayoutRef.current.offsetWidth);
        },
        20,
        {leading: false, trailing: true, maxWait: 40},
      ),
    [newDesignLanguage],
  );

  useEffect(() => {
    if (!actionsLayoutRef.current) return;
    setAvailableWidth(actionsLayoutRef.current.offsetWidth);
  }, [actionsLayoutRef]);

  useEffect(() => {
    if (!newDesignLanguage || actionWidths.length === 0 || availableWidth === 0)
      return;

    let currentAvailableWidth = availableWidth;

    setShowableActions([]);
    setRolledUpActions([]);

    [...actions, ...groups].forEach((action, index) => {
      if (
        actionWidths[index] +
          menuGroupWidthRef.current +
          ACTION_SPACING +
          lastMenuGroupWidth <=
        currentAvailableWidth
      ) {
        currentAvailableWidth -= actionWidths[index];
        setShowableActions((showableActions) => [...showableActions, action]);
      } else {
        // Find last group if it exists and always render it as a rolled up action below
        if (action === lastMenuGroup) return;

        currentAvailableWidth = 0;
        setRolledUpActions((rolledUpActions) => [...rolledUpActions, action]);
      }
    });
    if (shouldRollUp) {
      console.log(
        'rollup',

        {availableWidth, lastMenuGroupWidth},
      );
      shouldRollUp(availableWidth < lastMenuGroupWidth);
    }
  }, [
    actions,
    actionWidths,
    availableWidth,
    groups,
    lastMenuGroup,
    lastMenuGroupWidth,
    newDesignLanguage,
    shouldRollUp,
  ]);

  const className = classNames(
    styles.ActionsLayout,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const actionsMarkup = actions.map((action) => {
    if (
      (newDesignLanguage && showableActions.length > 0) ||
      rolledUpActions.includes(action)
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
    showableActions.length > 0
      ? showableActions.map(
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
            (group !== defaultRollupGroup && !rolledUpActions.includes(group));
    })
    .map((group) => {
      const {title, actions: groupActions, ...rest} = group;
      const finalRolledUpActions = rolledUpActions.reduce((memo, action) => {
        memo.push(...(isMenuGroup(action) ? action.actions : [action]));

        return memo;
      }, [] as ActionListItemDescriptor[]);

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
