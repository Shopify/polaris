import * as React from 'react';
import Menu, {Props as MenuProps} from '../Menu';
import Avatar, {Props as AvatarProps} from '../../../Avatar';

export interface Props {
  name?: MenuProps['title'];
  detail?: MenuProps['detail'];
  actions?: MenuProps['actions'];
  message?: MenuProps['message'];
  avatarInitials: AvatarProps['initials'];
  avatarSource?: AvatarProps['source'];
  activatorAccessibilityLabel?: string;
}

function UserMenu({
  name,
  detail,
  actions,
  message,
  avatarInitials,
  avatarSource,
  activatorAccessibilityLabel,
}: Props) {
  const avatar = (
    <Avatar
      size="small"
      source={avatarSource}
      initials={avatarInitials && avatarInitials.replace(' ', '')}
    />
  );

  return (
    <Menu
      title={name}
      detail={detail}
      actions={actions}
      message={message}
      avatar={avatar}
      activatorAccessibilityLabel={
        activatorAccessibilityLabel || 'Show user menu'
      }
    />
  );
}

export default UserMenu;
