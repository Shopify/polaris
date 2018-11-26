import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
// eslint-disable-next-line shopify/strict-component-boundaries
import {UserMenuContext, UserMenuContextTypes} from '../../../Frame/Frame';
import {IconableAction} from '../../../../types';
import {Props as MessageProps} from '../Message';
import TopBar from '../../../TopBar';
import {Props as AvatarProps} from '../../../Avatar';

interface UserActionSection {
  id: string;
  items: IconableAction[];
}

export interface Props {
  name: string;
  detail?: string;
  actions: UserActionSection[];
  message?: MessageProps;
  avatarInitials: string;
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
      actions,
      message,
      name,
      detail,
      initials: avatarInitials,
      avatar: avatarSource,
      onToggle: this.handleToggle,
      open,
    };

    return (
      <UserMenuContext.Consumer>
        {({
          mobileUserMenuProps,
          setMobileUserMenuProps,
        }: UserMenuContextTypes) => {
          if (!mobileUserMenuProps && setMobileUserMenuProps) {
            setMobileUserMenuProps(userMenuProps);
          }
          return null;
        }}
      </UserMenuContext.Consumer>
    );
  }

  @autobind
  private handleToggle() {
    const {open} = this.state;
    this.setState({open: !open});
  }
}

export default UserMenu;
