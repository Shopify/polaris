import React, {useMemo} from 'react';

import {Scrollable} from '../Scrollable';
import {WithinContentContext} from '../../utilities/within-content-context';
import {Image} from '../Image';
import {UnstyledLink} from '../UnstyledLink';
import {classNames} from '../../utilities/css';
import {getWidth} from '../../utilities/get-width';
import {useFrame} from '../../utilities/frame';

import {NavigationContext} from './context';
import {Section, Item} from './components';
import styles from './Navigation.module.scss';

export interface NavigationProps {
  location: string;
  children?: React.ReactNode;
  contextControl?: React.ReactNode;
  onDismiss?(): void;
  /** id of the element used as aria-labelledby */
  ariaLabelledBy?: string;
  /** Accepts a component that is used to supplement the logo markup */
  logoSuffix?: React.ReactNode;
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
  logoSuffix,
}: NavigationProps) {
  const {logo} = useFrame();
  const width = getWidth(logo, 104);

  const logoMarkup = logo ? (
    <div
      className={classNames(
        styles.LogoContainer,
        logoSuffix && styles.hasLogoSuffix,
      )}
    >
      <UnstyledLink
        url={logo.url || ''}
        className={styles.LogoLink}
        style={{width}}
      >
        <Image
          source={logo.topBarSource || ''}
          alt={logo.accessibilityLabel || ''}
          className={styles.Logo}
          style={{width}}
        />
      </UnstyledLink>
      {logoSuffix}
    </div>
  ) : null;

  const mediaMarkup = contextControl ? (
    <div className={styles.ContextControl}>{contextControl}</div>
  ) : (
    logoMarkup
  );

  const context = useMemo(
    () => ({location, onNavigationDismiss: onDismiss}),
    [location, onDismiss],
  );

  return (
    <NavigationContext.Provider value={context}>
      <WithinContentContext.Provider value>
        <nav className={styles.Navigation} aria-labelledby={ariaLabelledBy}>
          {mediaMarkup}
          <Scrollable
            className={styles.PrimaryNavigation}
            scrollbarGutter="stable"
            scrollbarWidth="thin"
            non_standard_unstable_styled_scrollbar
          >
            {children}
          </Scrollable>
        </nav>
      </WithinContentContext.Provider>
    </NavigationContext.Provider>
  );
};

Navigation.Item = Item;
Navigation.Section = Section;
