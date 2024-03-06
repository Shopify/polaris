import React, {useEffect, useContext, useState, useRef, useId} from 'react';
import type {MouseEvent, ReactNode} from 'react';

import {useIsomorphicLayoutEffect} from '../../../../utilities/use-isomorphic-layout-effect';
import {classNames} from '../../../../utilities/css';
import {NavigationContext} from '../../context';
import {Badge} from '../../../Badge';
import {Icon} from '../../../Icon';
import {Indicator} from '../../../Indicator';
import {UnstyledButton} from '../../../UnstyledButton';
import {UnstyledLink} from '../../../UnstyledLink';
import {useI18n} from '../../../../utilities/i18n';
import {useMediaQuery} from '../../../../utilities/media-query';
import styles from '../../Navigation.module.css';
import {Tooltip} from '../../../Tooltip';
import {MatchState} from '../../types';
import type {ItemProps, SecondaryAction, ItemURLDetails} from '../../types';

import {SecondaryNavigation} from './components';

export const MAX_SECONDARY_ACTIONS = 2;
const TOOLTIP_HOVER_DELAY = 1000;

export function Item({
  url,
  icon: baseIcon,
  matchedItemIcon,
  label,
  subNavigationItems = [],
  secondaryAction,
  secondaryActions,
  displayActionsOnHover,
  disabled,
  onClick,
  accessibilityLabel,
  selected: selectedOverride,
  badge,
  new: isNew,
  matches,
  exactMatch,
  matchPaths,
  excludePaths,
  external,
  onToggleExpandedState,
  expanded,
  shouldResizeIcon,
  truncateText,
  showVerticalLine,
  showVerticalHoverPointer,
  onMouseEnter,
  onMouseLeave,
}: ItemProps) {
  const i18n = useI18n();
  const {isNavigationCollapsed} = useMediaQuery();
  const secondaryNavigationId = useId();
  const {location, onNavigationDismiss} = useContext(NavigationContext);
  const navTextRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (!isNavigationCollapsed && expanded) {
      onToggleExpandedState?.();
    }
  }, [expanded, isNavigationCollapsed, onToggleExpandedState]);

  useIsomorphicLayoutEffect(() => {
    const navTextNode = navTextRef.current;
    if (truncateText && navTextNode) {
      setIsTruncated(navTextNode.scrollHeight > navTextNode.clientHeight);
    }
  }, [truncateText]);

  const tabIndex = disabled ? -1 : 0;

  const hasNewChild =
    subNavigationItems.filter((subNavigationItem) => subNavigationItem.new)
      .length > 0;

  const indicatorMarkup = hasNewChild ? (
    <span className={styles.Indicator}>
      <Indicator pulse />
    </span>
  ) : null;

  const matchState = matchStateForItem(
    {url, matches, exactMatch, matchPaths, excludePaths},
    location,
  );

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

  const icon =
    selected || childIsActive ? matchedItemIcon ?? baseIcon : baseIcon;

  const iconMarkup = icon ? (
    <div
      className={classNames(
        styles.Icon,
        shouldResizeIcon && styles['Icon-resized'],
      )}
    >
      <Icon source={icon} />
    </div>
  ) : null;

  let badgeMarkup: ReactNode = null;
  if (isNew) {
    badgeMarkup = (
      <Badge tone="new">
        {i18n.translate('Polaris.Badge.TONE_LABELS.new')}
      </Badge>
    );
  } else if (typeof badge === 'string') {
    badgeMarkup = <Badge tone="new">{badge}</Badge>;
  } else {
    badgeMarkup = badge;
  }

  const wrappedBadgeMarkup =
    badgeMarkup == null ? null : (
      <div className={styles.Badge}>{badgeMarkup}</div>
    );

  const itemLabelMarkup = (
    <span
      className={classNames(
        styles.Text,
        truncateText && styles['Text-truncated'],
      )}
      ref={navTextRef}
    >
      {label}
      {indicatorMarkup}
    </span>
  );

  if (url == null) {
    const className = classNames(
      styles.Item,
      disabled && styles['Item-disabled'],
      selectedOverride && styles['Item-selected'],
    );

    return (
      <li className={styles.ListItem}>
        <div className={styles.ItemWrapper}>
          <div
            className={classNames(
              styles.ItemInnerWrapper,
              disabled && styles.ItemInnerDisabled,
              selectedOverride && styles['ItemInnerWrapper-selected'],
            )}
          >
            <button
              type="button"
              className={className}
              disabled={disabled}
              aria-disabled={disabled}
              aria-label={accessibilityLabel}
              onClick={getClickHandler(onClick)}
            >
              {iconMarkup}
              {itemLabelMarkup}
              {wrappedBadgeMarkup}
            </button>
          </div>
        </div>
      </li>
    );
  }

  if (secondaryAction && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `secondaryAction` prop on the `Navigation.Item` has been deprecated. Use `secondaryActions` instead.',
    );
  }

  const actions = secondaryActions || (secondaryAction && [secondaryAction]);

  if (actions && actions.length > MAX_SECONDARY_ACTIONS) {
    actions.length = MAX_SECONDARY_ACTIONS;

    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        `secondaryActions must have a maximum of ${MAX_SECONDARY_ACTIONS} actions. Only the first ${MAX_SECONDARY_ACTIONS} actions will be rendered.`,
      );
    }
  }

  const secondaryActionMarkup = actions?.length ? (
    <span className={styles.SecondaryActions}>
      {actions.map((action) => (
        <ItemSecondaryAction
          key={action.accessibilityLabel}
          {...action}
          tabIndex={tabIndex}
          disabled={disabled}
        />
      ))}
    </span>
  ) : null;

  const itemContentMarkup = (
    <>
      {iconMarkup}
      {itemLabelMarkup}
      {secondaryActionMarkup ? null : wrappedBadgeMarkup}
    </>
  );

  const outerContentMarkup = (
    <>{secondaryActionMarkup ? wrappedBadgeMarkup : null}</>
  );

  const showExpanded = selected || expanded || childIsActive;

  const itemClassName = classNames(
    styles.Item,
    disabled && styles['Item-disabled'],
    (selected || childIsActive) && styles['Item-selected'],
    showExpanded && styles.subNavigationActive,
    childIsActive && styles['Item-child-active'],
    showVerticalLine && styles['Item-line'],
    matches && styles['Item-line-pointer'],
    showVerticalHoverPointer && styles['Item-hover-pointer'],
  );

  let secondaryNavigationMarkup: ReactNode = null;

  if (subNavigationItems.length > 0) {
    const longestMatch = matchingSubNavigationItems.sort(
      ({url: firstUrl}, {url: secondUrl}) => secondUrl.length - firstUrl.length,
    )[0];

    secondaryNavigationMarkup = (
      <SecondaryNavigation
        ItemComponent={Item}
        icon={icon}
        longestMatch={longestMatch}
        subNavigationItems={subNavigationItems}
        showExpanded={showExpanded}
        truncateText={truncateText}
        secondaryNavigationId={secondaryNavigationId}
      />
    );
  }

  const className = classNames(
    styles.ListItem,
    Boolean(actions && actions.length) && styles['ListItem-hasAction'],
  );

  const itemLinkMarkup = () => {
    const linkMarkup = (
      <UnstyledLink
        url={url}
        className={itemClassName}
        external={external}
        tabIndex={tabIndex}
        aria-disabled={disabled}
        aria-label={accessibilityLabel}
        onClick={getClickHandler(onClick)}
        {...normalizeAriaAttributes(
          secondaryNavigationId,
          subNavigationItems.length > 0,
          showExpanded,
        )}
      >
        {itemContentMarkup}
      </UnstyledLink>
    );

    return isTruncated ? (
      <Tooltip
        hoverDelay={TOOLTIP_HOVER_DELAY}
        content={label}
        preferredPosition="above"
      >
        {linkMarkup}
      </Tooltip>
    ) : (
      linkMarkup
    );
  };

  return (
    <li
      className={className}
      onMouseEnter={() => {
        onMouseEnter?.(label);
      }}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.ItemWrapper}>
        <div
          className={classNames(
            styles.ItemInnerWrapper,
            (selected && childIsActive && styles['ItemInnerWrapper-open']) ||
              (selected &&
                !childIsActive &&
                styles['ItemInnerWrapper-selected']),
            displayActionsOnHover &&
              styles['ItemInnerWrapper-display-actions-on-hover'],
            disabled && styles.ItemInnerDisabled,
          )}
        >
          {displayActionsOnHover &&
          secondaryActionMarkup &&
          wrappedBadgeMarkup ? (
            <span className={styles.ItemWithFloatingActions}>
              {itemLinkMarkup()}
              {secondaryActionMarkup}
            </span>
          ) : (
            <>
              {itemLinkMarkup()}
              {secondaryActionMarkup}
            </>
          )}
          {outerContentMarkup}
        </div>
      </div>
      {secondaryNavigationMarkup}
    </li>
  );

  function getClickHandler(onClick: ItemProps['onClick']) {
    return (event: MouseEvent<HTMLElement>) => {
      const {currentTarget} = event;

      if (currentTarget.getAttribute('href') === location) {
        event.preventDefault();
      }

      if (
        subNavigationItems &&
        subNavigationItems.length > 0 &&
        isNavigationCollapsed
      ) {
        event.preventDefault();
        onToggleExpandedState?.();
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
  }
}

interface ItemSecondaryActionProps extends SecondaryAction {
  tabIndex: number;
  disabled?: boolean;
}

export function ItemSecondaryAction({
  url,
  icon,
  accessibilityLabel,
  tooltip,
  onClick,
  disabled,
  tabIndex,
}: ItemSecondaryActionProps) {
  const markup = url ? (
    <UnstyledLink
      external
      url={url}
      className={styles.SecondaryAction}
      tabIndex={tabIndex}
      aria-disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={onClick}
    >
      <Icon source={icon} />
    </UnstyledLink>
  ) : (
    <UnstyledButton
      className={styles.SecondaryAction}
      tabIndex={tabIndex}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
      onClick={onClick}
    >
      <Icon source={icon} />
    </UnstyledButton>
  );

  return tooltip ? <Tooltip {...tooltip}> {markup} </Tooltip> : markup;
}

export function isNavigationItemActive(
  navigationItem: ItemProps,
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

function normalizeAriaAttributes(
  controlId: string,
  hasSubMenu: boolean,
  expanded: boolean,
) {
  return hasSubMenu
    ? {
        'aria-expanded': expanded,
        'aria-controls': controlId,
      }
    : undefined;
}
