import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
// eslint-disable-next-line shopify/strict-component-boundaries
import {Modifier as UserMenuModifier} from '../../../TopBar/components/UserMenu/context';
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

/** @deprecated Please avoid passing a user menu into <Navigation /> and only pass one into <TopBar /> instead. */
class UserMenu extends React.Component<Props, State> {
  state = {
    open: false,
  };

  componentDidMount() {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Navigation.UserMenu /> is deprecated and will be removed in the next major version. Please avoid passing a user menu into <Navigation /> and only pass one into <TopBar /> instead.',
    );
  }

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
