import * as React from 'react';
import {isEqual} from 'lodash';
import withContext from '../../../../WithContext';
import {WithContextTypes} from '../../../../../types';
import Consumer from './Consumer';
import {UserMenuContextTypes} from './context';

interface Props {
  userMenuProps: UserMenuContextTypes['mobileUserMenuProps'];
}

type State = Props;
type ComposedProps = Props & WithContextTypes<UserMenuContextTypes>;

class Modifier extends React.Component<ComposedProps, State> {
  static getDerivedStateFromProps(
    {context: {setMobileUserMenuProps}, userMenuProps}: ComposedProps,
    {userMenuProps: prevUserMenuProps}: State,
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

export default withContext<Props, {}, UserMenuContextTypes>(Consumer)(Modifier);
