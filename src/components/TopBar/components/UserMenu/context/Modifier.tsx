import * as React from 'react';
import withContext from '../../../../WithContext';
import {WithContextTypes} from '../../../../../types';
import {UserMenuProps} from '../components';
import Consumer from './Consumer';
import {UserMenuContextTypes} from './context';

interface Props {
  userMenuProps: UserMenuProps;
}

type ComposedProps = Props & WithContextTypes<UserMenuContextTypes>;

class Modifier extends React.PureComponent<ComposedProps, {}> {
  static getDerivedStateFromProps({
    context: {setMobileUserMenuProps},
    userMenuProps,
  }: ComposedProps) {
    if (setMobileUserMenuProps) {
      setMobileUserMenuProps(userMenuProps);
    }
    return null;
  }

  state = {};

  render() {
    return null;
  }
}

export default withContext<Props, {}, UserMenuContextTypes>(Consumer)(Modifier);
