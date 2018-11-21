import * as React from 'react';

import Scrollable from '../Scrollable';

import {UserMenu, ShopSwitcher, Section, Item} from './components';
import {contextTypes, SectionType} from './types';

import * as styles from './Navigation.scss';

export interface Props {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  userMenu?: React.ReactNode;
  shopSwitcher?: React.ReactNode;
  onDismiss?(): void;
}

export default class Navigation extends React.Component<Props, never> {
  static Item = Item;
  static UserMenu = UserMenu;
  static ShopSwitcher = ShopSwitcher;
  static Section = Section;
  static childContextTypes = contextTypes;

  getChildContext() {
    return {
      location: this.props.location,
      onNavigationDismiss: this.props.onDismiss,
    };
  }

  render() {
    const {children, userMenu, shopSwitcher} = this.props;

    return (
      <nav className={styles.Navigation}>
        <div className={styles.Menu}>{userMenu}</div>
        <div className={styles.Menu}>{shopSwitcher}</div>
        <Scrollable className={styles.PrimaryNavigation}>{children}</Scrollable>
      </nav>
    );
  }
}
