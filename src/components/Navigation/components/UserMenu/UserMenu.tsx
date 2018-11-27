import * as React from 'react';
import {isEqual} from 'lodash';
import {autobind} from '@shopify/javascript-utilities/decorators';
// eslint-disable-next-line shopify/strict-component-boundaries
import {
  Consumer as UserMenuConsumer,
  UserMenuContext as UserMenuContextTypes,
} from '../../../TopBar/components/UserMenu/Context';
import {IconableAction} from '../../../../types';
import {Props as MessageProps} from '../Message';
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

interface TransmitterProps {
  userMenuProps: UserMenuContextTypes['mobileUserMenuProps'];
  setMobileUserMenuProps: UserMenuContextTypes['setMobileUserMenuProps'];
}

interface TransmitterState {
  userMenuProps: UserMenuContextTypes['mobileUserMenuProps'];
}

class Transmitter extends React.Component<TransmitterProps, TransmitterState> {
  static getDerivedStateFromProps(
    {setMobileUserMenuProps, userMenuProps}: TransmitterProps,
    {userMenuProps: prevUserMenuProps}: TransmitterState,
  ) {
    if (
      setMobileUserMenuProps &&
      userMenuProps &&
      !isEqual(userMenuProps, prevUserMenuProps)
    ) {
      setMobileUserMenuProps(userMenuProps);
      return {userMenuProps};
    }
    return null;
  }

  state = {
    // eslint-disable-next-line react/no-unused-state
    userMenuProps: undefined,
  };

  render() {
    return null;
  }
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
      <UserMenuConsumer>
        {({setMobileUserMenuProps}) => (
          <Transmitter
            setMobileUserMenuProps={setMobileUserMenuProps}
            userMenuProps={userMenuProps}
          />
        )}
      </UserMenuConsumer>
    );
  }

  @autobind
  private handleToggle() {
    const {open} = this.state;
    this.setState({open: !open});
  }
}

export default UserMenu;
