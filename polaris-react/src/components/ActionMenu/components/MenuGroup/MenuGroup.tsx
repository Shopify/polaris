import React, {useCallback} from 'react';

import type {ActionListSection, MenuGroupDescriptor} from '../../../../types';
import {ActionList} from '../../../ActionList';
import {Popover} from '../../../Popover';
import {SecondaryAction} from '../SecondaryAction';

import styles from './MenuGroup.module.scss';

export interface MenuGroupProps extends MenuGroupDescriptor {
  /** Visually hidden menu description for screen readers */
  accessibilityLabel?: string;
  /** Whether or not the menu is open */
  active?: boolean;
  /** Callback when the menu is clicked */
  onClick?(openActions: () => void): void;
  /** Callback for opening the MenuGroup by title */
  onOpen(title: string): void;
  /** Callback for closing the MenuGroup by title */
  onClose(title: string): void;
  /** Collection of sectioned action items */
  sections?: readonly ActionListSection[];
}

export function MenuGroup({
  accessibilityLabel,
  active,
  actions,
  details,
  title,
  icon,
  disabled,
  onClick,
  onClose,
  onOpen,
  sections,
}: MenuGroupProps) {
  const handleClose = useCallback(() => {
    onClose(title);
  }, [onClose, title]);

  const handleOpen = useCallback(() => {
    onOpen(title);
  }, [onOpen, title]);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(handleOpen);
    } else {
      handleOpen();
    }
  }, [onClick, handleOpen]);

  const popoverActivator = (
    <SecondaryAction
      disclosure
      disabled={disabled}
      icon={icon}
      accessibilityLabel={accessibilityLabel}
      onClick={handleClick}
    >
      {title}
    </SecondaryAction>
  );

  return (
    <Popover
      active={Boolean(active)}
      activator={popoverActivator}
      preferredAlignment="left"
      onClose={handleClose}
      hideOnPrint
    >
      <ActionList
        items={actions}
        sections={sections}
        onActionAnyItem={handleClose}
      />
      {details && <div className={styles.Details}>{details}</div>}
    </Popover>
  );
}
