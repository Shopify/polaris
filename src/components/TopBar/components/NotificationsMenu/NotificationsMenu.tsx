import {NotificationMajor} from '@shopify/polaris-icons';
import React from 'react';

import {Icon} from '../../../Icon';
import type {Notification} from '../../../../types';
import {MessageIndicator} from '../../../MessageIndicator';

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
  /** A callback function to handle opening and closing the user menu */
  onToggle(): void;
  /** Accepts a color scheme for the contents of the user menu */
  colorScheme?: MenuProps['colorScheme'];
}

export function NotificationsMenu({
  notifications,
  message,
  onToggle,
  open,
  colorScheme,
  accessibilityLabel,
}: NotificationsMenuProps) {
  const showIndicator = Boolean(message);

  const activatorContentMarkup = (
    <MessageIndicator active={showIndicator}>
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
