import React, {useCallback} from 'react';

import type {MenuGroupDescriptor} from '../../../../types';
import {useFeatures} from '../../../../utilities/features';
import {ActionList} from '../../../ActionList';
import {Popover} from '../../../Popover';
import {MenuAction} from '../MenuAction';
import {SecondaryAction} from '../SecondaryAction';

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
  /** Callback for getting the offsetWidth of the MenuGroup */
  getOffsetWidth?(width: number): void;
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
  getOffsetWidth,
}: MenuGroupProps) {
  const {newDesignLanguage} = useFeatures();

  const handleClose = useCallback(() => {
    onClose(title);
  }, [onClose, title]);

  const handleOpen = useCallback(() => {
    onOpen(title);
  }, [onOpen, title]);

  const handleOffsetWidth = useCallback(
    (width: number) => {
      if (!newDesignLanguage || !getOffsetWidth) return;
      getOffsetWidth(width);
    },
    [getOffsetWidth, newDesignLanguage],
  );

  const popoverActivator = newDesignLanguage ? (
    <SecondaryAction
      disclosure
      icon={icon}
      accessibilityLabel={accessibilityLabel}
      onClick={handleOpen}
      getOffsetWidth={handleOffsetWidth}
    >
      {title}
    </SecondaryAction>
  ) : (
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
      hideOnPrint
    >
      <ActionList items={actions} onActionAnyItem={handleClose} />
      {details && <div className={styles.Details}>{details}</div>}
    </Popover>
  );
}
