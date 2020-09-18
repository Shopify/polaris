import React, {useEffect, useCallback, useRef, useState} from 'react';

import {sortAndOverrideActionOrder} from '../../utilities';
import {useFeatures} from '../../../../utilities/features';
import type {
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../../../types';
import {ButtonGroup} from '../../../ButtonGroup';
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

interface DividedActions {
  secondaryActions: MenuActionDescriptor[];
  menuGroups: MenuGroupDescriptor[];
}

export function Actions({actions = [], groups = []}: Props) {
  const {newDesignLanguage} = useFeatures();
  const actionsLayoutRef = useRef<HTMLDivElement>(null);
  const menuGroupRef = useRef<HTMLDivElement>(null);
  const [actionWidths, setActionWidths] = useState<number[]>([]);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );
  const [
    showableActions,
    setShowableActions,
  ] = useState<DividedActions | null>();
  const handleOffsetWidth = useCallback(
    (width: number) =>
      setActionWidths((actionWidths) => [...actionWidths, width]),
    [],
  );
  const handleMenuGroupToggle = useCallback(
    (group: string) => setActiveMenuGroup(activeMenuGroup ? undefined : group),
    [activeMenuGroup],
  );

  useEffect(() => {
    // We may not want this check 🤔
    if (actionWidths.length === 0) return;
    const overriddenActions = sortAndOverrideActionOrder([
      ...actions,
      ...groups,
    ]);
    setShowableActions([{content: 'sup'}]);
    console.log({overriddenActions, showableActions});
    const showable = [];
    const additional = [];
    overriddenActions.forEach((action, index) => {
      if ('title' in action) return null;

      if (index === 0) {
        showable.push(action);
      }
      if (index === 1) {
        additional.push(action);
      }
      console.log('hide / show stuff');
      console.log({actionWidths, showable, additional});
      console.log(actionsLayoutRef?.current?.offsetWidth);
      console.log(menuGroupRef?.current?.offsetWidth);
      // if title push to menu group
      // if action and fittable push to secondary
      console.log({action});
    });
  }, [actions, actionsLayoutRef, actionWidths, groups, menuGroupRef]);

  const handleMenuGroupClose = useCallback(
    () => setActiveMenuGroup(undefined),
    [],
  );

  const menuActions = [...actions, ...groups];

  const overriddenActions = sortAndOverrideActionOrder(menuActions);

  const actionMarkup = overriddenActions.map((action, index) => {
    if ('title' in action) {
      const {title, actions, ...rest} = action;

      return actions.length > 0 ? (
        <div key={`MenuGroup-${index}`} ref={menuGroupRef}>
          <MenuGroup
            title={title}
            active={title === activeMenuGroup}
            actions={actions}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
          />
        </div>
      ) : null;
    }

    const {content, onAction, ...rest} = action;
    return newDesignLanguage ? (
      <SecondaryAction
        key={index}
        onClick={onAction}
        {...rest}
        getOffsetWidth={handleOffsetWidth}
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

  return (
    <div className={styles.ActionsLayout} ref={actionsLayoutRef}>
      {newDesignLanguage ? (
        <ButtonGroup noWrap={newDesignLanguage}>
          {showableActions?.secondaryActions?.map((action) => (
            <SecondaryAction key={action.content} {...action}>
              {action.content}
            </SecondaryAction>
          ))}
          {actionMarkup}
        </ButtonGroup>
      ) : (
        actionMarkup
      )}
    </div>
  );
}
