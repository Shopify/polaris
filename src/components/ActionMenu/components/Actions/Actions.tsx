import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import debounce from 'lodash/debounce';

import {useFeatures} from '../../../../utilities/features';
import {classNames} from '../../../../utilities/css';
import type {
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

const ACTION_SPACING = 4;

export function Actions({actions = [], groups = []}: Props) {
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
  const lastMenuGroup = [...groups].pop();
  const lastMenuGroupWidth = lastMenuGroup ? [...actionWidths].pop() : 0;
  const handleActionsOffsetWidth = useCallback(
    (width: number) =>
      setActionWidths((actionWidths) => [...actionWidths, width]),
    [],
  );
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
  }, [
    actions,
    actionWidths,
    availableWidth,
    groups,
    lastMenuGroup,
    lastMenuGroupWidth,
    newDesignLanguage,
  ]);

  const className = classNames(
    styles.ActionsLayout,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const actionsMarkup = actions.map((action, index) => {
    if (showableActions && showableActions.length >= 0) return null;
    const {content, onAction, ...rest} = action;
    return newDesignLanguage ? (
      <SecondaryAction
        key={index}
        onClick={onAction}
        {...rest}
        getOffsetWidth={handleActionsOffsetWidth}
      >
        {content}
      </SecondaryAction>
    ) : (
      <MenuAction
        key={`MenuAction-${index}`}
        content={content}
        onAction={onAction}
        {...rest}
      />
    );
  });
  // Map over default group (will need translations) if group.length === 0 and rollup actions > 0
  const groupsMarkup = groups
    .filter((group) => {
      // Make sure no hidden groups render
      // Return true if group is lastMenu group or group doesn't exist in rolledup
      return group === lastMenuGroup || !rolledUpActions.includes(group);
    })
    .map((action, index) => {
      // Always render final group with default title if need be
      const {title, actions, ...rest} = action;
      const finalRolledUpActions = rolledUpActions
        .map((action) => (isMenuGroup(action) ? action.actions : action))
        // VS Code doesn't recognize .flat()
        .flat();

      return actions.length > 0 ? (
        <MenuGroup
          key={`MenuGroup-${index}`}
          title={title}
          active={title === activeMenuGroup}
          actions={[...finalRolledUpActions, ...actions]}
          {...rest}
          onOpen={handleMenuGroupToggle}
          onClose={handleMenuGroupClose}
          getOffsetWidth={handleActionsOffsetWidth}
        />
      ) : null;
    });

  return (
    <div className={className} ref={actionsLayoutRef}>
      {newDesignLanguage ? (
        <ButtonGroup spacing="extraTight">
          {showableActions && showableActions.length > 0
            ? showableActions.map((action) => {
                return (
                  !isMenuGroup(action) && (
                    <SecondaryAction
                      key={action.content}
                      {...action}
                      getOffsetWidth={handleActionsOffsetWidth}
                    >
                      {action.content}
                    </SecondaryAction>
                  )
                );
              })
            : null}
          {groupsMarkup}
          {actionsMarkup}
        </ButtonGroup>
      ) : (
        <>
          {groupsMarkup}
          {actionsMarkup}
        </>
      )}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}

function isMenuGroup(
  actionOrMenuGroup: MenuGroupDescriptor | MenuActionDescriptor,
): actionOrMenuGroup is MenuGroupDescriptor {
  return 'title' in actionOrMenuGroup;
}
