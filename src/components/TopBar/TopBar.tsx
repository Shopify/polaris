import React from 'react';
import {MobileHamburgerMajorMonotone} from '@shopify/polaris-icons';
import {classNames} from '../../utilities/css';
import {getWidth} from '../../utilities/get-width';
import {useI18n} from '../../utilities/i18n';
import {useTheme} from '../../utilities/theme';
import {useForcableToggle} from '../../utilities/use-toggle';
import {Icon} from '../Icon';
import {Image} from '../Image';
import {UnstyledLink} from '../UnstyledLink';

import {SearchField, UserMenu, Search, SearchProps, Menu} from './components';
import styles from './TopBar.scss';

export interface TopBarProps {
  /** Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav toggle button */
  showNavigationToggle?: boolean;
  /** Accepts a user component that is made available as a static member of the top bar component and renders as the primary menu */
  userMenu?: React.ReactNode;
  /** Accepts a menu component that is made available as a static member of the top bar component */
  secondaryMenu?: React.ReactNode;
  /** Accepts a component that is ideally used to help users switch between different contexts */
  contextControl?: React.ReactNode;
  /** Accepts a search field component that is made available as a `TextField` static member of the top bar component */
  searchField?: React.ReactNode;
  /** Accepts a search results component that is ideally composed of a card component containing a list of actionable search results */
  searchResults?: React.ReactNode;
  /** A boolean property indicating whether search results are currently visible. */
  searchResultsVisible?: boolean;
  /** A callback function that handles the dismissal of search results */
  onSearchResultsDismiss?: SearchProps['onDismiss'];
  /** A callback function that handles hiding and showing mobile navigation */
  onNavigationToggle?(): void;
}

export function TopBar({
  showNavigationToggle,
  userMenu,
  searchResults,
  searchField,
  secondaryMenu,
  searchResultsVisible,
  onNavigationToggle,
  onSearchResultsDismiss,
  contextControl,
}: TopBarProps) {
  const i18n = useI18n();
  const {logo} = useTheme();

  const [
    focused,
    {forceTrue: forceTrueFocused, forceFalse: forceFalseFocused},
  ] = useForcableToggle(false);

  const className = classNames(
    styles.NavigationIcon,
    focused && styles.focused,
  );

  const navigationButtonMarkup = showNavigationToggle ? (
    <button
      type="button"
      className={className}
      onClick={onNavigationToggle}
      onFocus={forceTrueFocused}
      onBlur={forceFalseFocused}
      aria-label={i18n.translate('Polaris.TopBar.toggleMenuLabel')}
    >
      <Icon source={MobileHamburgerMajorMonotone} color="white" />
    </button>
  ) : null;

  const width = getWidth(logo, 104);
  let contextMarkup;

  if (contextControl) {
    contextMarkup = (
      <div testID="ContextControl" className={styles.ContextControl}>
        {contextControl}
      </div>
    );
  } else if (logo) {
    contextMarkup = (
      <div className={styles.LogoContainer}>
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
      </div>
    );
  }

  const searchResultsMarkup =
    searchResults && searchResultsVisible ? (
      <Search visible={searchResultsVisible} onDismiss={onSearchResultsDismiss}>
        {searchResults}
      </Search>
    ) : null;

  const searchMarkup = searchField ? (
    <React.Fragment>
      {searchField}
      {searchResultsMarkup}
    </React.Fragment>
  ) : null;

  return (
    <div className={styles.TopBar}>
      {navigationButtonMarkup}
      {contextMarkup}
      <div className={styles.Contents}>
        <div className={styles.SearchField}>{searchMarkup}</div>
        <div className={styles.SecondaryMenu}>{secondaryMenu}</div>
        {userMenu}
      </div>
    </div>
  );
}

TopBar.UserMenu = UserMenu;
TopBar.SearchField = SearchField;
TopBar.Menu = Menu;
