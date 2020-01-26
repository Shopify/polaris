import React, {useCallback} from 'react';

import {MenuGroupDescriptor} from '../../../../types';

import {ActionList} from '../../../ActionList';
import {Popover} from '../../../Popover';
import {MenuAction} from '../MenuAction';

import styles from './MenuGroup.scss';

export interface MenuGroupProps extends MenuGroupDescriptor {
  /** Visually hidden menu description for screen readers */
  accessibilityLabel?: string;
  /** Whether or not the menu is open */
  active?: boolean;
  /** Callback for opening the MenuGroup by title */
  onOpen(title: string): void;
  /** Callback for closing the MenuGroup by title */
  onClose(title: string): void;
}

export function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  onClose,
  onOpen,
}: MenuGroupProps) {
  const handleClose = useCallback(() => {
    onClose(title);
  }, [onClose, title]);

  const handleOpen = useCallback(() => {
    onOpen(title);
  }, [onOpen, title]);

  if (!actions.length) {
    return null;
  }

  const popoverActivator = (
    <MenuAction
      disclosure
      content={title}
      icon={icon}
      accessibilityLabel={accessibilityLabel}
      onAction={handleOpen}
    />
  );

  return (
    <Popover
      active={Boolean(active)}
      activator={popoverActivator}
      preferredAlignment="left"
      onClose={handleClose}
    >
      <ActionList items={actions} onActionAnyItem={handleClose} />
      {details && <div className={styles.Details}>{details}</div>}
    </Popover>
  );
}
