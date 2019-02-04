import * as React from 'react';

import Scrollable from '../Scrollable';

import {UserMenu, Section, Item} from './components';
import {contextTypes, SectionType} from './types';

import * as styles from './Navigation.scss';

export interface Props {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  /** @deprecated Pass a user menu into <TopBar /> instead. */
  userMenu?: React.ReactNode;
  contextControl?: React.ReactNode;
  onDismiss?(): void;
}

export default class Navigation extends React.Component<Props, never> {
  static Item = Item;
  static UserMenu = UserMenu;
  static Section = Section;
  static childContextTypes = contextTypes;

  constructor(props: Props) {
    super(props);

    if (props.userMenu) {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: the `userMenu` prop is deprecated and will be removed in the next major version. Pass a user menu into <TopBar /> instead.',
      );
    }
  }

  getChildContext() {
    return {
      location: this.props.location,
      onNavigationDismiss: this.props.onDismiss,
    };
  }

  render() {
    const {children, userMenu, contextControl} = this.props;

    const contextControlMarkup = contextControl && (
      <div className={styles.ContextControl}>{contextControl}</div>
    );

    return (
      <nav className={styles.Navigation}>
        {contextControlMarkup}
        <div className={styles.UserMenu}>{userMenu}</div>
        <Scrollable className={styles.PrimaryNavigation}>{children}</Scrollable>
      </nav>
    );
  }
}
