import type {IconableAction} from '../../../../types';
import {Avatar, AvatarProps} from '../../../Avatar';
import {MessageIndicator} from '../../../MessageIndicator';
import {Menu, MenuProps} from '../Menu';

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
  /** @deprecated Accepts a color scheme for the contents of the user menu */
  colorScheme?: MenuProps['colorScheme'];
}

export function UserMenu({
  name,
  detail,
  avatar,
  initials,
  actions,
  message,
  onToggle,
  open,
  colorScheme,
  accessibilityLabel,
}: UserMenuProps) {
  const showIndicator = Boolean(message);

  const activatorContentMarkup = (
    <>
      <MessageIndicator active={showIndicator}>
        <Avatar
          size="small"
          source={avatar}
          initials={initials && initials.replace(' ', '')}
        />
      </MessageIndicator>
      <span className={styles.Details}>
        <p className={styles.Name}>{name}</p>
        <p className={styles.Detail}>{detail}</p>
      </span>
    </>
  );

  if (colorScheme && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `colorScheme` prop on the `UserMenu` component has been deprecated. See the v10 migration guide for replacing dark color scheme styles. https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md',
    );
  }

  return (
    <Menu
      activatorContent={activatorContentMarkup}
      open={open}
      onOpen={onToggle}
      onClose={onToggle}
      actions={actions}
      message={message}
      colorScheme={colorScheme}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
