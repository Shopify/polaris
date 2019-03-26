import * as React from 'react';

import {classNames} from '@shopify/react-utilities/styles';
import {navigationBarCollapsed} from '../../../../utilities/breakpoints';

import {Context, contextTypes} from '../../types';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Badge from '../../../Badge';
import Icon, {Props as IconProps} from '../../../Icon';
import Indicator from '../../../Indicator';
import UnstyledLink from '../../../UnstyledLink';

import styles from '../../Navigation.scss';

import {Secondary} from './components';

interface ItemURLDetails {
  url?: string;
  matches?: boolean;
  exactMatch?: boolean;
  matchPaths?: string[];
  excludePaths?: string[];
}

export interface SubNavigationItem extends ItemURLDetails {
  url: string;
  label: string;
  disabled?: boolean;
  new?: boolean;
  onClick?(event: React.MouseEvent<HTMLElement>): void;
}

interface SecondaryAction {
  url: string;
  accessibilityLabel: string;
  icon: IconProps['source'];
}

export interface Props extends ItemURLDetails {
  icon?: IconProps['source'];
  iconBody?: string;
  badge?: React.ReactNode;
  label: string;
  disabled?: boolean;
  accessibilityLabel?: string;
  selected?: boolean;
  exactMatch?: boolean;
  new?: boolean;
  subNavigationItems?: SubNavigationItem[];
  secondaryAction?: SecondaryAction;
  onClick?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

interface State {
  expanded: boolean;
}

enum MatchState {
  MatchForced,
  MatchUrl,
  MatchPaths,
  Excluded,
  NoMatch,
}

export class BaseItem extends React.Component<CombinedProps, State> {
  static contextTypes = contextTypes;

  context!: Context;

  state: State = {
    expanded: false,
  };

  componentDidMount() {
    navigationBarCollapsed().addListener(this.handleResize);
  }

  componentWillUnmount() {
    navigationBarCollapsed().removeListener(this.handleResize);
  }

  render(): React.ReactElement<Props> {
    const {expanded} = this.state;

    const {
      url,
      icon,
      label,
      subNavigationItems = [],
      secondaryAction,
      disabled,
      onClick,
      accessibilityLabel,
      iconBody,
      selected: selectedOverride,
      badge,
      new: isNew,
      polaris: {intl},
    } = this.props;

    const {location, onNavigationDismiss} = this.context;

    const tabIndex = disabled ? -1 : 0;

    const hasNewChild =
      subNavigationItems.filter((subNavigationItem) => subNavigationItem.new)
        .length > 0;

    const indicatorMarkup = hasNewChild ? (
      <span className={styles.Indicator}>
        <Indicator pulse />
      </span>
    ) : null;

    const iconMarkup = iconBody ? (
      <div className={styles.Icon}>
        <Icon source={iconBody} />
      </div>
    ) : (
      icon && (
        <div className={styles.Icon}>
          <Icon source={icon} />
        </div>
      )
    );

    let badgeMarkup: React.ReactNode = null;
    if (isNew) {
      badgeMarkup = (
        <Badge status="new" size="small">
          {intl.translate('Polaris.Badge.STATUS_LABELS.new')}
        </Badge>
      );
    } else if (typeof badge === 'string') {
      badgeMarkup = (
        <Badge status="new" size="small">
          {badge}
        </Badge>
      );
    } else {
      badgeMarkup = badge;
    }

    const wrappedBadgeMarkup =
      badgeMarkup == null ? null : (
        <div className={styles.Badge}>{badgeMarkup}</div>
      );

    const itemContentMarkup = (
      <React.Fragment>
        {iconMarkup}
        <span className={styles.Text}>
          {label}
          {indicatorMarkup}
        </span>
        {wrappedBadgeMarkup}
      </React.Fragment>
    );

    if (url == null) {
      const className = classNames(
        styles.Item,
        disabled && styles['Item-disabled'],
      );

      return (
        <li className={styles.ListItem}>
          <button
            type="button"
            className={className}
            disabled={disabled}
            aria-disabled={disabled}
            aria-label={accessibilityLabel}
            onClick={this.getClickHandler(onClick)}
          >
            {itemContentMarkup}
          </button>
        </li>
      );
    }

    const secondaryActionMarkup = secondaryAction && (
      <UnstyledLink
        external
        url={secondaryAction.url}
        className={styles.SecondaryAction}
        tabIndex={tabIndex}
        aria-disabled={disabled}
        aria-label={secondaryAction.accessibilityLabel}
      >
        <Icon source={secondaryAction.icon} />
      </UnstyledLink>
    );

    const matchState = matchStateForItem(this.props, location);

    const matchingSubNavigationItems = subNavigationItems.filter((item) => {
      const subMatchState = matchStateForItem(item, location);
      return (
        subMatchState === MatchState.MatchForced ||
        subMatchState === MatchState.MatchUrl ||
        subMatchState === MatchState.MatchPaths
      );
    });

    const childIsActive = matchingSubNavigationItems.length > 0;

    const selected =
      selectedOverride == null
        ? matchState === MatchState.MatchForced ||
          matchState === MatchState.MatchUrl ||
          matchState === MatchState.MatchPaths
        : selectedOverride;

    const showExpanded = selected || expanded || childIsActive;

    const itemClassName = classNames(
      styles.Item,
      disabled && styles['Item-disabled'],
      selected && subNavigationItems.length === 0 && styles['Item-selected'],
      showExpanded && styles.subNavigationActive,
    );

    let secondaryNavigationMarkup: React.ReactNode = null;

    if (subNavigationItems.length > 0 && showExpanded) {
      const longestMatch = matchingSubNavigationItems.sort(
        ({url: firstUrl}, {url: secondUrl}) =>
          secondUrl.length - firstUrl.length,
      )[0];

      secondaryNavigationMarkup = (
        <div className={styles.SecondaryNavigation}>
          <Secondary expanded={showExpanded}>
            {subNavigationItems.map((item) => {
              const {label, ...rest} = item;
              return (
                <Item
                  {...rest}
                  key={label}
                  label={label}
                  matches={item === longestMatch}
                  onClick={onNavigationDismiss}
                />
              );
            })}
          </Secondary>
        </div>
      );
    }

    const className = classNames(
      styles.ListItem,
      secondaryAction && styles['ListItem-hasAction'],
    );

    return (
      <li className={className}>
        <UnstyledLink
          url={url}
          className={itemClassName}
          tabIndex={tabIndex}
          aria-disabled={disabled}
          aria-label={accessibilityLabel}
          onClick={this.getClickHandler(onClick)}
        >
          {itemContentMarkup}
        </UnstyledLink>
        {secondaryActionMarkup}
        {secondaryNavigationMarkup}
      </li>
    );
  }

  private handleResize = () => {
    if (!navigationBarCollapsed().matches && this.state.expanded) {
      this.setState({expanded: false});
    }
  };

  private getClickHandler = (onClick: Props['onClick']) => {
    return (event: React.MouseEvent<HTMLElement>) => {
      const {currentTarget} = event;
      const {subNavigationItems} = this.props;
      const {location, onNavigationDismiss} = this.context;

      if (currentTarget.getAttribute('href') === location) {
        event.preventDefault();
      }

      if (
        subNavigationItems &&
        subNavigationItems.length > 0 &&
        navigationBarCollapsed().matches
      ) {
        event.preventDefault();
        this.setState(({expanded}) => ({expanded: !expanded}));
      } else if (onNavigationDismiss) {
        onNavigationDismiss();
        if (onClick && onClick !== onNavigationDismiss) {
          onClick();
        }
        return;
      }

      if (onClick) {
        onClick();
      }
    };
  };
}

export function isNavigationItemActive(
  navigationItem: Props,
  currentPath: string,
) {
  const matchState = matchStateForItem(navigationItem, currentPath);

  const matchingSubNavigationItems =
    navigationItem.subNavigationItems &&
    navigationItem.subNavigationItems.filter((item) => {
      const subMatchState = matchStateForItem(item, currentPath);
      return (
        subMatchState === MatchState.MatchForced ||
        subMatchState === MatchState.MatchUrl ||
        subMatchState === MatchState.MatchPaths
      );
    });

  const childIsActive =
    matchingSubNavigationItems && matchingSubNavigationItems.length > 0;

  const selected =
    matchState === MatchState.MatchForced ||
    matchState === MatchState.MatchUrl ||
    matchState === MatchState.MatchPaths;

  return selected || childIsActive;
}

function normalizePathname(pathname: string) {
  const barePathname = pathname.split('?')[0].split('#')[0];
  return barePathname.endsWith('/') ? barePathname : `${barePathname}/`;
}

function safeEqual(location: string, path: string) {
  return normalizePathname(location) === normalizePathname(path);
}

function safeStartsWith(location: string, path: string) {
  return normalizePathname(location).startsWith(normalizePathname(path));
}

function matchStateForItem(
  {url, matches, exactMatch, matchPaths, excludePaths}: ItemURLDetails,
  location: string,
) {
  if (url == null) {
    return MatchState.NoMatch;
  }

  if (matches) {
    return MatchState.MatchForced;
  }

  if (
    matches === false ||
    (excludePaths &&
      excludePaths.some((path) => safeStartsWith(location, path)))
  ) {
    return MatchState.Excluded;
  }

  if (matchPaths && matchPaths.some((path) => safeStartsWith(location, path))) {
    return MatchState.MatchPaths;
  }

  const matchesUrl = exactMatch
    ? safeEqual(location, url)
    : safeStartsWith(location, url);
  return matchesUrl ? MatchState.MatchUrl : MatchState.NoMatch;
}

export const Item = withAppProvider<Props>()(BaseItem);

export default Item;
