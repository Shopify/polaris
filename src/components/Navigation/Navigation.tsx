import * as React from 'react';

import Scrollable from '../Scrollable';

import NavigationContext from './context';
import {UserMenu, Section, Item} from './components';
import {SectionType} from './types';

import styles from './Navigation.scss';

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

  constructor(props: Props) {
    super(props);

    if (props.userMenu) {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: the `userMenu` prop is deprecated and will be removed in the next major version. Pass a user menu into <TopBar /> instead.',
      );
    }
  }

  render() {
    const {
      children,
      userMenu,
      contextControl,
      location,
      onDismiss,
    } = this.props;

    const contextControlMarkup = contextControl && (
      <div className={styles.ContextControl}>{contextControl}</div>
    );

    const context = {
      location,
      onNavigationDismiss: onDismiss,
      withinContentContainer: true,
    };

    return (
      <NavigationContext.Provider value={context}>
        <nav className={styles.Navigation}>
          {contextControlMarkup}
          <div className={styles.UserMenu}>{userMenu}</div>
          <Scrollable className={styles.PrimaryNavigation}>
            {children}
          </Scrollable>
        </nav>
      </NavigationContext.Provider>
    );
  }
}
