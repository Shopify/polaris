import * as React from 'react';

import {Scrollable} from '../../components';
import ScrollLock from '../ScrollLock';

import UserMenu from './components/UserMenu';
import Section from './components/Section';
import {contextTypes, SectionType} from './types';

import * as styles from './Navigation.scss';

export interface Props {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  userMenu?: React.ReactNode;
  onDismiss?(): void;
}

export default class Navigation extends React.Component<Props, never> {
  static UserMenu = UserMenu;
  static Section = Section;
  static childContextTypes = contextTypes;

  getChildContext() {
    return {
      location: this.props.location,
      onNavigationDismiss: this.props.onDismiss,
    };
  }

  render() {
    const {children, userMenu} = this.props;

    return (
      <nav className={styles.Navigation}>
        <div className={styles.UserMenu}>{userMenu}</div>
        <ScrollLock>
          <Scrollable className={styles.PrimaryNavigation}>
            {children}
          </Scrollable>
        </ScrollLock>
      </nav>
    );
  }
}
