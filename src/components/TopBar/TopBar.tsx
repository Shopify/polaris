import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {variationName, classNames} from '@shopify/react-utilities/styles';
import {camelCase} from 'change-case';
import {menu} from '../../icons';
import {Icon, Image, UnstyledLink} from '../../components';

import {SearchField, UserMenu, Search, SearchProps, Menu} from './components';

import * as styles from './TopBar.scss';

export interface LogoAction {
  id: string;
  url: string;
  source: string;
  accessibilityLabel: string;
}

export interface Props {
  showNavToggle?: boolean;
  userMenu?: React.ReactNode;
  secondaryMenu?: React.ReactNode;
  logoAction?: LogoAction;
  searchField?: React.ReactNode;
  searchResults?: React.ReactNode;
  searchResultsVisible?: boolean;
  onSearchResultsDismiss?: SearchProps['onDismiss'];
  onNavToggle?(): void;
}

export interface State {
  focused: boolean;
}

export default class TopBar extends React.PureComponent<Props, State> {
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
      logoAction,
      onNavToggle,
      onSearchResultsDismiss,
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
        testID="nav-button"
      >
        <Icon source={menu} color="white" />
      </button>
    );

    const logoMarkup = logoAction && (
      <UnstyledLink url={logoAction.url} className={styles.LogoLink}>
        <Image
          source={logoAction.source}
          alt={logoAction.accessibilityLabel}
          className={styles.Logo}
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

    const logoContainerClassName = classNames(
      styles.LogoContainer,
      logoAction &&
        logoAction.id &&
        styles[variationName('logo', camelCase(logoAction.id))],
    );

    return (
      <div className={styles.TopBar} data-polaris-top-bar>
        {navButtonMarkup}
        <div className={logoContainerClassName}>{logoMarkup}</div>
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
