import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {getWidth} from '../../utilities/getWidth';
import {menu} from '../../icons';
import {
  Icon,
  Image,
  UnstyledLink,
  withAppProvider,
  WithAppProviderProps,
} from '..';
import {SearchField, UserMenu, Search, SearchProps, Menu} from './components';

import * as styles from './TopBar.scss';

export interface Props {
  /** Toggles whether or not a navigation component has been provided. Controls the presence of the mobile nav toggle button */
  showNavigationToggle?: boolean;
  /** Accepts a user component that is made available as a static member of the top bar component and renders as the primary menu */
  userMenu?: React.ReactNode;
  /** Accepts a menu component that is made available as a static member of the top bar component */
  secondaryMenu?: React.ReactNode;
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

export type ComposedProps = Props & WithAppProviderProps;

export interface State {
  focused: boolean;
}

export class TopBar extends React.PureComponent<ComposedProps, State> {
  static UserMenu = UserMenu;
  static SearchField = SearchField;
  static Menu = Menu;

  state: State = {
    focused: false,
  };

  render() {
    const {
      showNavigationToggle,
      userMenu,
      searchResults,
      searchField,
      secondaryMenu,
      searchResultsVisible,
      onNavigationToggle,
      onSearchResultsDismiss,
      polaris: {
        theme: {logo},
      },
    } = this.props;

    const {focused} = this.state;

    const className = classNames(
      styles.NavigationIcon,
      focused && styles.focused,
    );

    const navigationButtonMarkup = showNavigationToggle ? (
      <button
        type="button"
        className={className}
        onClick={onNavigationToggle}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        aria-label="Toggle menu"
      >
        <Icon source={menu} color="white" />
      </button>
    ) : null;

    const width = getWidth(logo, 104);

    const logoMarkup = logo ? (
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
    ) : null;

    const searchResultsMarkup =
      searchResults && searchResultsVisible ? (
        <Search
          visible={searchResultsVisible}
          onDismiss={onSearchResultsDismiss}
        >
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
        <div className={styles.LogoContainer}>{logoMarkup}</div>
        <div className={styles.Contents}>
          {searchMarkup}
          {secondaryMenu}
          {userMenu}
        </div>
      </div>
    );
  }

  @autobind
  private handleFocus() {
    this.setState({focused: true});
  }

  @autobind
  private handleBlur() {
    this.setState({focused: false});
  }
}

export default withAppProvider<Props>()(TopBar);
