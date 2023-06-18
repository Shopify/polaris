import {NotificationMajor} from '@shopify/polaris-icons';
import React from 'react';

import {Icon} from '../../../Icon';
import type {Notification} from '../../../../types';

// eslint-disable-next-line @shopify/strict-component-boundaries
import {MessageIndicator} from './components/MessageIndicator';
// eslint-disable-next-line @shopify/strict-component-boundaries
import {Menu, MenuProps} from './components/Menu';

export interface NotificationsMenuProps {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  notifications: {items: Notification[]}[];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the user menu */
  message?: MenuProps['message'];
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
  /** A boolean property indicating whether the user menu is currently open */
  open: boolean;
  /** A boolean property indicating whether the user menu is currently open */
  unreadCount: number;
  /** A callback function to handle opening and closing the user menu */
  onToggle(): void;
  /** Accepts a color scheme for the contents of the user menu */
  colorScheme?: MenuProps['colorScheme'];
}

export function NotificationsMenu({
  notifications,
  unreadCount,
  message,
  onToggle,
  open,
  colorScheme,
  accessibilityLabel,
}: NotificationsMenuProps) {
  const activatorContentMarkup = (
    <MessageIndicator unreadCount={unreadCount}>
      <Icon source={NotificationMajor} color="base" />
    </MessageIndicator>
  );

  return (
    <Menu
      activatorContent={activatorContentMarkup}
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
      notifications={notifications}
      message={message}
      colorScheme={colorScheme}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
