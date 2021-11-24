import React from 'react';

import {Scrollable} from '../Scrollable';
import {WithinContentContext} from '../../utilities/within-content-context';
import {Image} from '../Image';
import {UnstyledLink} from '../UnstyledLink';
import {getWidth} from '../../utilities/get-width';

import {NavigationContext} from './context';
import {Section, Item} from './components';
import styles from './Navigation.scss';

export interface NavigationProps {
  location: string;
  children?: React.ReactNode;
  contextControl?: React.ReactNode;
  onDismiss?(): void;
  /** id of the element used as aria-labelledby */
  ariaLabelledBy?: string;
}

export const Navigation: React.FunctionComponent<NavigationProps> & {
  Item: typeof Item;
  Section: typeof Section;
} = function Navigation({
  children,
  contextControl,
  location,
  onDismiss,
  ariaLabelledBy,
}: NavigationProps) {
  // TODO: This behavior will be re-enabled in a separate PR.
  const logo = undefined as {[key: string]: any} | undefined;
  const width = getWidth(logo, 104);

  const logoMarkup = logo ? (
    <div className={styles.LogoContainer}>
      <UnstyledLink
        url={logo.url || ''}
        className={styles.LogoLink}
        style={{width}}
        alt={logo.accessibilityLabel || ''}
      >
        <Image
          source={logo.topBarSource || ''}
          alt=""
          className={styles.Logo}
          style={{width}}
        />
      </UnstyledLink>
    </div>
  ) : null;

  const mediaMarkup = contextControl ? (
    <div className={styles.ContextControl}>{contextControl}</div>
  ) : (
    logoMarkup
  );

  const context = {
    location,
    onNavigationDismiss: onDismiss,
  };

  return (
    <NavigationContext.Provider value={context}>
      <WithinContentContext.Provider value>
        <nav className={styles.Navigation} aria-labelledby={ariaLabelledBy}>
          {mediaMarkup}
          <Scrollable className={styles.PrimaryNavigation}>
            {children}
          </Scrollable>
        </nav>
      </WithinContentContext.Provider>
    </NavigationContext.Provider>
  );
};

Navigation.Item = Item;
Navigation.Section = Section;
