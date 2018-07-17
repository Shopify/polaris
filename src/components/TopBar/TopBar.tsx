import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {getWidth} from '../../utilities/getWidth';
import {menu} from '../../icons';
import {Icon, Image, UnstyledLink} from '../../components';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';

import {SearchField, UserMenu, Search, SearchProps, Menu} from './components';

import * as styles from './TopBar.scss';

export interface Props {
  showNavToggle?: boolean;
  userMenu?: React.ReactNode;
  secondaryMenu?: React.ReactNode;
  searchField?: React.ReactNode;
  searchResults?: React.ReactNode;
  searchResultsVisible?: boolean;
  onSearchResultsDismiss?: SearchProps['onDismiss'];
  onNavToggle?(): void;
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
      showNavToggle,
      userMenu,
      searchResults,
      searchField,
      secondaryMenu,
      searchResultsVisible,
      onNavToggle,
      onSearchResultsDismiss,
      polaris: {
        theme: {logo},
      },
    } = this.props;

    const {focused} = this.state;

    const className = classNames(styles.NavIcon, focused && styles.focused);

    const navButtonMarkup = showNavToggle && (
      <button
        type="button"
        className={className}
        onClick={onNavToggle}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        aria-label="Toggle menu"
      >
        <Icon source={menu} color="white" />
      </button>
    );

    const width = getWidth(logo, 104);

    const logoMarkup = logo && (
      <UnstyledLink
        url={logo.topBarSource || ''}
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
    );

    const searchResultsMarkup = searchResults && (
      <Search visible={searchResultsVisible} onDismiss={onSearchResultsDismiss}>
        {searchResults}
      </Search>
    );

    const searchMarkup = searchField && (
      <React.Fragment>
        {searchField}
        {searchResultsMarkup}
      </React.Fragment>
    );

    return (
      <div className={styles.TopBar} data-polaris-top-bar>
        {navButtonMarkup}
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
