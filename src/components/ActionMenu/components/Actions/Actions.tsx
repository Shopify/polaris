import React, {useCallback, useState} from 'react';

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

export function Actions({actions = [], groups = []}: Props) {
  const {newDesignLanguage} = useFeatures();
  const [activeMenuGroup, setActiveMenuGroup] = useState<string | undefined>(
    undefined,
  );

  const handleMenuGroupToggle = useCallback(
    (group: string) => setActiveMenuGroup(activeMenuGroup ? undefined : group),
    [activeMenuGroup],
  );

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
      <SecondaryAction key={index} onClick={onAction} {...rest}>
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
    <div className={styles.ActionsLayout}>
      {newDesignLanguage ? (
        <ButtonGroup>{actionMarkup}</ButtonGroup>
      ) : (
        actionMarkup
      )}
    </div>
  );
}
