import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {variationName, classNames} from '@shopify/react-utilities/styles';
import {camelCase} from 'change-case';
import {menu} from '../../icons';
import {Icon, Image, UnstyledLink} from '../../components';

import {
  TextField,
  TextFieldProps,
  User,
  UserProps,
  Search,
  SearchProps,
  Menu,
  MenuProps,
} from './components';

import * as styles from './TopBar.scss';

export interface LogoAction {
  id: string;
  url: string;
  source: string;
  accessibilityLabel: string;
}

export interface Props {
  hasNav?: boolean;
  user?: React.ReactNode;
  secondaryMenu?: React.ReactNode;
  logoAction?: LogoAction;
  searchField?: React.ReactNode;
  search?: React.ReactNode;
  searchVisible?: boolean;
  onSearchDismiss?: SearchProps['onDismiss'];
  onNavToggle?(): void;
}

export interface State {
  focused: boolean;
}

export {TextFieldProps, UserProps, MenuProps};

export default class TopBar extends React.PureComponent<Props, State> {
  static User = User;
  static TextField = TextField;
  static Menu = Menu;

  state: State = {
    focused: false,
  };

  render() {
    const {
      hasNav,
      user,
      search,
      searchField,
      secondaryMenu,
      searchVisible,
      logoAction,
      onNavToggle,
      onSearchDismiss,
    } = this.props;

    const {focused} = this.state;

    const iconMarkup = logoAction ? (
      <Image
        source={logoAction.source}
        alt={logoAction.accessibilityLabel}
        className={styles.Logo}
      />
    ) : null;

    const className = classNames(styles.NavIcon, focused && styles.focused);

    const navButtonMarkup = hasNav ? (
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
    ) : null;

    const linkMarkup = logoAction ? (
      <UnstyledLink url={logoAction.url} className={styles.LogoLink}>
        {iconMarkup}
      </UnstyledLink>
    ) : null;

    const searchMarkup = search ? (
      <Search visible={searchVisible} onDismiss={onSearchDismiss}>
        {search}
      </Search>
    ) : null;

    const logoContainerClassName = classNames(
      styles.LogoContainer,
      logoAction && styles[variationName('logo', camelCase(logoAction.id))],
    );

    return (
      <div className={styles.TopBar} data-polaris-top-bar>
        {navButtonMarkup}
        <div className={logoContainerClassName}>
          {(linkMarkup && linkMarkup) || iconMarkup}
        </div>
        <div className={styles.Contents}>
          {searchField}
          {secondaryMenu}
          {user}
        </div>

        {searchMarkup}
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
