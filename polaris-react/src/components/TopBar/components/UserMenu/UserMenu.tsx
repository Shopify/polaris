import React from 'react';

import type {IconableAction} from '../../../../types';
import {Avatar} from '../../../Avatar';
import type {AvatarProps} from '../../../Avatar';
import {MessageIndicator} from '../../../MessageIndicator';
import {Menu} from '../Menu';
import type {MenuProps} from '../Menu';
import {Text} from '../../../Text';

import styles from './UserMenu.scss';

export interface UserMenuProps {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: {items: IconableAction[]}[];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the user menu */
  message?: MenuProps['message'];
  /** A string detailing the merchant’s full name to be displayed in the user menu */
  name: string;
  /** A string allowing further detail on the merchant’s name displayed in the user menu */
  detail?: string;
  /** A string that provides the accessibility labeling */
  accessibilityLabel?: string;
  /** The merchant’s initials, rendered in place of an avatar image when not provided */
  initials: AvatarProps['initials'];
  /** An avatar image representing the merchant */
  avatar?: AvatarProps['source'];
  /** A boolean property indicating whether the user menu is currently open */
  open: boolean;
  /** A callback function to handle opening and closing the user menu */
  onToggle(): void;
  /** A custom activator that can be used when the default activator is not desired */
  customActivator?: React.ReactNode;
  /** A width value that customizes the width of the user menu */
  customWidth?: string;
}

export function UserMenu({
  name,
  avatar,
  initials,
  actions,
  message,
  onToggle,
  open,
  accessibilityLabel,
  customActivator,
  customWidth,
}: UserMenuProps) {
  const showIndicator = Boolean(message);

  const activatorContentMarkup = customActivator ? (
    customActivator
  ) : (
    <>
      <span className={styles.Details}>
        <Text as="p" alignment="start" truncate>
          {name}
        </Text>
      </span>
      <MessageIndicator active={showIndicator}>
        <Avatar
          shape="square"
          size="small"
          initials={initials && initials.replace(' ', '')}
          source={avatar}
        />
      </MessageIndicator>
    </>
  );

  return (
    <Menu
      activatorContent={activatorContentMarkup}
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
      actions={actions}
      message={message}
      accessibilityLabel={accessibilityLabel}
      customWidth={customWidth}
    />
  );
}
