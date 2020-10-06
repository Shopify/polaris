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
  const menuGroupRef = useRef<HTMLDivElement>(null);
  const menuGroupWidthRef = useRef<number>(0);
  const [actionWidths, setActionWidths] = useState<number[]>([]);
  const [availableWidth, setAvailableWidth] = useState<number>(0);
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );
  const [showableActions, setShowableActions] = useState<
    MenuActionDescriptor[] | null
  >(null);
  const [hiddenActions, setHiddenActions] = useState<MenuActionDescriptor[]>(
    [],
  );

  const handleOffsetWidth = useCallback(
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
    if (!menuGroupRef.current) return;
    menuGroupWidthRef.current = menuGroupRef.current?.offsetWidth;
  }, [menuGroupRef]);

  useEffect(() => {
    if (!newDesignLanguage || actionWidths.length === 0 || availableWidth === 0)
      return;

    let currentAvailableWidth = availableWidth;
    setShowableActions([]);
    setHiddenActions([]);

    actions.forEach((action, index) => {
      if (
        actionWidths[index] + menuGroupWidthRef.current + ACTION_SPACING <=
        currentAvailableWidth
      ) {
        currentAvailableWidth -= actionWidths[index];
        setShowableActions((showableActions) => [
          ...(showableActions || []),
          action,
        ]);
      } else {
        currentAvailableWidth = 0;
        setHiddenActions((hiddenActions) => [...hiddenActions, action]);
      }
    });
  }, [actionWidths, actions, availableWidth, newDesignLanguage]);

  const className = classNames(
    styles.ActionsLayout,
    newDesignLanguage && styles.newDesignLanguage,
  );

  const menuActions = [...actions, ...groups];

  const actionMarkup = menuActions.map((action, index) => {
    if ('title' in action) {
      const {title, actions, ...rest} = action;

      return actions.length > 0 ? (
        <div key={`MenuGroup-${index}`} ref={menuGroupRef}>
          <MenuGroup
            title={title}
            active={title === activeMenuGroup}
            actions={[...hiddenActions, ...actions]}
            {...rest}
            onOpen={handleMenuGroupToggle}
            onClose={handleMenuGroupClose}
          />
        </div>
      ) : null;
    }
    if (showableActions && showableActions.length >= 0) return null;
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
    <div className={className} ref={actionsLayoutRef}>
      {newDesignLanguage ? (
        <ButtonGroup spacing="extraTight">
          {showableActions && showableActions.length > 0
            ? showableActions.map((action) => (
                <SecondaryAction
                  key={action.content}
                  {...action}
                  getOffsetWidth={handleOffsetWidth}
                >
                  {action.content}
                </SecondaryAction>
              ))
            : null}
          {actionMarkup}
        </ButtonGroup>
      ) : (
        actionMarkup
      )}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}
