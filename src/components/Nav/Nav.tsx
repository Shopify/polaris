import * as React from 'react';

import {Scrollable} from '../../components';
import ScrollLock from '../ScrollLock';

import Item from './components/Item';
import UserMenu from './components/UserMenu';
import Section from './components/Section';
import {contextTypes, SectionType} from './types';

import * as styles from './Nav.scss';

export interface Props {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  userMenu?: React.ReactNode;
  onDismiss?(): void;
}

export default class Nav extends React.Component<Props, never> {
  static Item = Item;
  static UserMenu = UserMenu;
  static Section = Section;
  static childContextTypes = contextTypes;

  getChildContext() {
    return {location: this.props.location, onNavDismiss: this.props.onDismiss};
  }

  render() {
    const {children, userMenu} = this.props;

    return (
      <nav className={styles.Nav}>
        <div className={styles.UserMenu}>{userMenu}</div>
        <ScrollLock>
          <Scrollable className={styles.PrimaryNav}>{children}</Scrollable>
        </ScrollLock>
      </nav>
    );
  }
}
