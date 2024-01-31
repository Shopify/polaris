import React, {useRef} from 'react';
import {MenuIcon} from '@shopify/polaris-icons';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {classNames} from '../../utilities/css';
import {getWidth} from '../../utilities/get-width';
import {useI18n} from '../../utilities/i18n';
import {useToggle} from '../../utilities/use-toggle';
import {useFrame} from '../../utilities/frame';
import {Icon} from '../Icon';
import {Image} from '../Image';
import {UnstyledLink} from '../UnstyledLink';
import {ContextualSaveBar} from '../Frame';

import {SearchField, UserMenu, Search, Menu} from './components';
import type {SearchFieldProps, UserMenuProps, SearchProps} from './components';
import styles from './TopBar.module.scss';

export type {UserMenuProps, SearchFieldProps};

export interface TopBarProps {
  /** Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav toggle button */
  showNavigationToggle?: boolean;
  /** Accepts a user component that is made available as a static member of the top bar component and renders as the primary menu */
  userMenu?: React.ReactNode;
  /** Accepts a menu component that is made available as a static member of the top bar component */
  secondaryMenu?: React.ReactNode;
  /** Accepts a component that is used to help users switch between different contexts */
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
  /** Accepts a component that is used to supplement the logo markup */
  logoSuffix?: React.ReactNode;
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
  logoSuffix,
}: TopBarProps) {
  const i18n = useI18n();
  const {logo, contextualSaveBarVisible, contextualSaveBarProps} = useFrame();
  const searchElement = useRef<HTMLDivElement>(null);
  const contextualSaveBarElement = useRef<HTMLDivElement>(null);

  const {
    value: focused,
    setTrue: forceTrueFocused,
    setFalse: forceFalseFocused,
  } = useToggle(false);

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
      <div className={styles.IconWrapper}>
        <Icon source={MenuIcon} />
      </div>
    </button>
  ) : null;

  const width = getWidth(logo, 104);
  let contextMarkup;

  if (contextControl) {
    contextMarkup = (
      <div className={styles.ContextControl}>{contextControl}</div>
    );
  } else if (logo) {
    const className = classNames(
      styles.LogoContainer,
      showNavigationToggle || searchField
        ? styles.LogoDisplayControl
        : styles.LogoDisplayContainer,
      logoSuffix && styles.hasLogoSuffix,
    );

    contextMarkup = (
      <div className={className}>
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
    );
  }

  const searchTransitionClassNames = {
    enter: styles['SearchBar-enter'],
    enterActive: styles['SearchBar-enter-active'],
    exit: styles['SearchBar-exit'],
    exitActive: styles['SearchBar-exit-active'],
  };

  const searchMarkup = searchField ? (
    <CSSTransition
      key="search"
      classNames={searchTransitionClassNames}
      nodeRef={searchElement}
      addEndListener={(done) => {
        searchElement.current?.addEventListener('transitionend', done, false);
      }}
      appear
      in={!contextualSaveBarVisible}
      mountOnEnter
    >
      <div className={styles.Search} ref={searchElement}>
        {searchField}
        <Search
          visible={searchResultsVisible}
          onDismiss={onSearchResultsDismiss}
          overlayVisible={searchResultsOverlayVisible}
        >
          {searchResults}
        </Search>
      </div>
    </CSSTransition>
  ) : null;

  const contextualSaveBarTransitionClassNames = {
    enter: styles['ContextualSaveBar-enter'],
    enterActive: styles['ContextualSaveBar-enter-active'],
    exit: styles['ContextualSaveBar-exit'],
    exitActive: styles['ContextualSaveBar-exit-active'],
  };

  const contextualSaveBarMarkup = (
    <CSSTransition
      key="csb"
      classNames={contextualSaveBarTransitionClassNames}
      nodeRef={contextualSaveBarElement}
      addEndListener={(done) => {
        contextualSaveBarElement.current?.addEventListener(
          'transitionend',
          done,
          false,
        );
      }}
      in={contextualSaveBarVisible}
      mountOnEnter
    >
      <div ref={contextualSaveBarElement}>
        <ContextualSaveBar {...contextualSaveBarProps} />
      </div>
    </CSSTransition>
  );

  return (
    <div className={styles.TopBar}>
      <div className={styles.Container}>
        <div className={styles.LeftContent}>
          {navigationButtonMarkup}
          {contextMarkup}
        </div>
        <div
          style={{
            height: '56px',
            overflow: searchResultsVisible ? 'visible' : 'hidden',
            padding: '10px 6px',
          }}
        >
          <TransitionGroup>
            {contextualSaveBarVisible ? contextualSaveBarMarkup : searchMarkup}
          </TransitionGroup>
        </div>
        <div className={styles.RightContent}>
          <div className={styles.SecondaryMenu}>{secondaryMenu}</div>
          {userMenu}
        </div>
      </div>
    </div>
  );
};

TopBar.Menu = Menu;
TopBar.SearchField = SearchField;
TopBar.UserMenu = UserMenu;
