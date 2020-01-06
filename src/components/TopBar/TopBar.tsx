import React, {useState} from 'react';
import {MobileHamburgerMajorMonotone} from '@shopify/polaris-icons';
import {classNames} from '../../utilities/css';
import {getWidth} from '../../utilities/get-width';
import {useI18n} from '../../utilities/i18n';
import {useTheme} from '../../utilities/theme';
import {useFeatures} from '../../utilities/features';
import {useToggle} from '../../utilities/use-toggle';
import {EventListener} from '../EventListener';
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
  /** Whether or not the search results overlay has a visible backdrop */
  searchResultsOverlayVisible?: boolean;
  /** A callback function that handles the dismissal of search results */
  onSearchResultsDismiss?: SearchProps['onDismiss'];
  /** A callback function that handles hiding and showing mobile navigation */
  onNavigationToggle?(): void;
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export const TopBar: React.FunctionComponent<TopBarProps> & {
  Menu: typeof Menu;
  SearchField: typeof SearchField;
  UserMenu: typeof UserMenu;
} = function TopBar({
  showNavigationToggle,
  userMenu,
  searchResults,
  searchField,
  secondaryMenu,
  searchResultsVisible,
  searchResultsOverlayVisible = false,
  onNavigationToggle,
  onSearchResultsDismiss,
  contextControl,
}: TopBarProps) {
  const i18n = useI18n();
  const {logo} = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const {unstableGlobalTheming = false} = useFeatures();

  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused,
  } = useToggle(false);

  function handleScroll() {
    const scrollDistance = window.scrollY;
    const isScrolled = scrollDistance >= 1;

    if (scrolled && isScrolled) {
      return;
    }

    setScrolled(Boolean(isScrolled));
  }

  const iconClassName = classNames(
    styles.NavigationIcon,
    focused && styles.focused,
  );

  const navigationButtonMarkup = showNavigationToggle ? (
    <button
      type="button"
      className={iconClassName}
      onClick={onNavigationToggle}
      onFocus={forceTrueFocused}
      onBlur={forceFalseFocused}
      aria-label={i18n.translate('Polaris.TopBar.toggleMenuLabel')}
    >
      <Icon source={MobileHamburgerMajorMonotone} />
    </button>
  ) : null;

  const width = getWidth(logo, 104);
  let contextMarkup;

  if (contextControl && !unstableGlobalTheming) {
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

  const searchMarkup = searchField ? (
    <React.Fragment>
      {searchField}
      <Search
        visible={searchResultsVisible}
        onDismiss={onSearchResultsDismiss}
        overlayVisible={searchResultsOverlayVisible}
      >
        {searchResults}
      </Search>
    </React.Fragment>
  ) : null;

  const scrollListenerMarkup = unstableGlobalTheming ? (
    <EventListener event="scroll" handler={handleScroll} passive />
  ) : null;

  const className = classNames(
    styles.TopBar,
    unstableGlobalTheming && styles['Topbar-globalTheming'],
    scrolled && styles.isScrolled,
  );

  return (
    <div className={className}>
      {navigationButtonMarkup}
      {contextMarkup}
      <div className={styles.Contents}>
        <div className={styles.SearchField}>{searchMarkup}</div>
        <div className={styles.SecondaryMenu}>{secondaryMenu}</div>
        {userMenu}
      </div>
      {scrollListenerMarkup}
    </div>
  );
};

TopBar.Menu = Menu;
TopBar.SearchField = SearchField;
TopBar.UserMenu = UserMenu;
