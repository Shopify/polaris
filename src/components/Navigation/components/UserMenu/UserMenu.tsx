import * as React from 'react';
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

/** @deprecated Use <TopBar.UserMenu /> instead. */
class UserMenu extends React.Component<Props, State> {
  state: State = {
    open: false,
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Navigation.UserMenu /> is deprecated and will be removed in the next major version. Use <TopBar.UserMenu /> instead.',
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

  private handleToggle = () => {
    const {open} = this.state;
    this.setState({open: !open});
  };
}

export default UserMenu;
