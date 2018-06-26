import * as React from 'react';

import {Scrollable} from '../../components';
import ScrollLock from '../ScrollLock';

import Item from './components/Item';
import User from './components/User';
import Section from './components/Section';
import Secondary from './components/Secondary';
import {contextTypes, SectionType} from './types';

import * as styles from './Nav.scss';

export interface Props {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  user?: React.ReactNode;
  onDismiss?(): void;
}

export default class Nav extends React.Component<Props, never> {
  static Item = Item;
  static User = User;
  static Section = Section;
  static Secondary = Secondary;
  static childContextTypes = contextTypes;

  getChildContext() {
    return {location: this.props.location, onNavDismiss: this.props.onDismiss};
  }

  render() {
    const {children, user} = this.props;

    return (
      <nav className={styles.Nav}>
        <div className={styles.User}>{user}</div>
        <ScrollLock>
          <Scrollable className={styles.PrimaryNav}>{children}</Scrollable>
        </ScrollLock>
      </nav>
    );
  }
}
