import * as React from 'react';

import Scrollable from '../Scrollable';

import {UserMenu, ShopSwitcher, Section, Item} from './components';
import {contextTypes, SectionType} from './types';

import * as styles from './Navigation.scss';

export interface Props {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  /** @deprecated Pass a user menu into <TopBar /> instead. */
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

    if (userMenu) {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: the `userMenu` prop is deprecated and will be removed in the next major version. Pass a user menu into <TopBar /> instead.',
      );
    }

    const userMenuMarkup = userMenu && (
      <div className={styles.Menu}>{userMenu}</div>
    );

    const shopSwitcherMarkup = shopSwitcher && (
      <div className={styles.Menu}>{shopSwitcher}</div>
    );

    return (
      <nav className={styles.Navigation}>
        {userMenuMarkup}
        {shopSwitcherMarkup}
        <Scrollable className={styles.PrimaryNavigation}>{children}</Scrollable>
      </nav>
    );
  }
}
