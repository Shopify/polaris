import * as React from 'react';
import {IconableAction} from '../../../../types';

import Avatar, {Props as AvatarProps} from '../../../Avatar';
import MessageIndicator from '../../../MessageIndicator';
// eslint-disable-next-line shopify/strict-component-boundaries
import {UserMenuContext, UserMenuContextTypes} from '../../../Frame/Frame';

import Menu, {MessageProps} from '../Menu';

import * as styles from './UserMenu.scss';

export interface Props {
  /** An array of action objects that are rendered inside of a popover triggered by this menu */
  actions: {items: IconableAction[]}[];
  /** Accepts a message that facilitates direct, urgent communication with the merchant through the user menu */
  message?: MessageProps;
  /** A string detailing the merchant's full name to be displayed in the user menu */
  name: string;
  /** A string allowing further details on the merchant's name displayed in the user menu */
  detail?: string;
  /** The merchant's initials, rendered in place of an avatar image when not provided */
  initials: AvatarProps['initials'];
  /** An avatar image representing the merchant */
  avatar?: AvatarProps['source'];
  /** A boolean property indicating whether the user menu is currently open */
  open: boolean;
  /** A callback function to handle opening and closing the user menu */
  onToggle(): void;
}

function UserMenuComponent({
  name,
  detail,
  avatar,
  initials,
  actions,
  message,
  onToggle,
  open,
}: Props) {
  const showIndicator = Boolean(message);

  const activatorContentMarkup = (
    <div className={styles.UserMenu}>
      <MessageIndicator active={showIndicator}>
        <Avatar
          size="small"
          source={avatar}
          initials={initials && initials.replace(' ', '')}
        />
      </MessageIndicator>
      <span className={styles.Details}>
        <p className={styles.Name} title="altText">
          {name}
        </p>
        <p className={styles.Detail}>{detail}</p>
      </span>
    </div>
  );

  return (
    <Menu
      activatorContent={activatorContentMarkup}
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
      actions={actions}
      message={message}
    />
  );
}

export default function UserMenu(props: Props) {
  return (
    <UserMenuContext.Consumer>
      {({mobileUserMenuProps, mobileView}: UserMenuContextTypes) => {
        if (mobileUserMenuProps && mobileView) {
          return <UserMenuComponent {...mobileUserMenuProps} />;
        }
        return <UserMenuComponent {...props} />;
      }}
    </UserMenuContext.Consumer>
  );
}
