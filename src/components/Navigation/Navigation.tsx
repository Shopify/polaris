import React from 'react';

import {Scrollable} from '../Scrollable';
import {classNames} from '../../utilities/css';
import {FeaturesContext} from '../../utilities/features';
import {WithinContentContext} from '../../utilities/within-content-context';
import {NavigationContext} from './context';
import {Section, Item} from './components';
import {SectionType} from './types';

import styles from './Navigation.scss';

export interface NavigationProps {
  location: string;
  sections?: SectionType[];
  children?: React.ReactNode;
  contextControl?: React.ReactNode;
  onDismiss?(): void;
}

export class Navigation extends React.Component<NavigationProps, never> {
  static contextType = FeaturesContext;
  static Item = Item;
  static Section = Section;
  context!: React.ContextType<typeof FeaturesContext>;

  render() {
    const {children, contextControl, location, onDismiss} = this.props;
    const {unstableGlobalTheming} = this.context || {};
    const contextControlMarkup = contextControl && (
      <div className={styles.ContextControl}>{contextControl}</div>
    );

    const className = classNames(
      styles.Navigation,
      unstableGlobalTheming && styles['Navigation-globalTheming'],
    );

    const context = {
      location,
      onNavigationDismiss: onDismiss,
    };

    return (
      <NavigationContext.Provider value={context}>
        <WithinContentContext.Provider value>
          <nav className={className}>
            {contextControlMarkup}
            <Scrollable className={styles.PrimaryNavigation}>
              {children}
            </Scrollable>
          </nav>
        </WithinContentContext.Provider>
      </NavigationContext.Provider>
    );
  }
}
