import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {UserMenuModifier} from '../../../TopBar';
import {IconableAction} from '../../../../types';
import {Props as MessageProps} from '../Message';
import {Props as AvatarProps} from '../../../Avatar';

interface UserActionSection {
  id: string;
  items: IconableAction[];
}

export interface Props {
  name?: string;
  detail?: string;
  actions?: UserActionSection[];
  message?: MessageProps;
  avatarInitials: AvatarProps['initials'];
  avatarSource?: AvatarProps['source'];
}

interface State {
  open: boolean;
}

class UserMenu extends React.Component<Props, State> {
  state = {
    open: false,
  };

  render() {
    const {
      name,
      detail,
      actions,
      message,
      avatarInitials,
      avatarSource,
    } = this.props;
    const {open} = this.state;

    const userMenuProps = {
      actions: actions || [],
      message,
      name: name || '',
      detail,
      initials: avatarInitials,
      avatar: avatarSource,
      onToggle: this.handleToggle,
      open,
    };

    return <UserMenuModifier userMenuProps={userMenuProps} />;
  }

  @autobind
  private handleToggle() {
    const {open} = this.state;
    this.setState({open: !open});
  }
}

export default UserMenu;
