import React, {useEffect, useRef, useState} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useMediaQuery} from '../../../../utilities/media-query';
import {useUniqueId} from '../../../../utilities/unique-id';
import {useToggle} from '../../../../utilities/use-toggle';
import {Collapsible} from '../../../Collapsible';
import {Icon, IconProps} from '../../../Icon';
import {Text} from '../../../Text';
import {Item, ItemProps} from '../Item';
import styles from '../../Navigation.scss';
import {Tooltip, TooltipProps} from '../../../Tooltip';

export interface SectionProps {
  items: ItemProps[];
  icon?: IconProps['source'];
  title?: string;
  fill?: boolean;
  rollup?: {
    after: number;
    view: string;
    hide: string;
    activePath: string;
  };
  action?: {
    icon: IconProps['source'];
    accessibilityLabel: string;
    onClick(): void;
    tooltip?: TooltipProps;
  };
  separator?: boolean;
}

export function Section({
  title,
  fill,
  action,
  items,
  rollup,
  separator,
}: SectionProps) {
  const {
    value: expanded,
    toggle: toggleExpanded,
    setFalse: setExpandedFalse,
  } = useToggle(false);
  const animationFrame = useRef<number | null>(null);
  const {isNavigationCollapsed} = useMediaQuery();
  const [expandedIndex, setExpandedIndex] = useState<number>();

  const handleClick = (
    onClick: ItemProps['onClick'],
    hasSubNavItems: boolean,
  ) => {
    return () => {
      if (onClick) {
        onClick();
      }

      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      if (!hasSubNavItems || !isNavigationCollapsed) {
        animationFrame.current = requestAnimationFrame(setExpandedFalse);
      }
    };
  };

  useEffect(() => {
    return () => {
      animationFrame.current && cancelAnimationFrame(animationFrame.current);
    };
  });

  const className = classNames(
    styles.Section,
    separator && styles['Section-withSeparator'],
    fill && styles['Section-fill'],
  );

  const buttonMarkup = action && (
    <button
      type="button"
      className={styles.Action}
      aria-label={action.accessibilityLabel}
      onClick={action.onClick}
    >
      <Icon source={action.icon} />
    </button>
  );

  const actionMarkup =
    action &&
    (action.tooltip ? (
      <Tooltip {...action.tooltip}>{buttonMarkup}</Tooltip>
    ) : (
      buttonMarkup
    ));

  const sectionHeadingMarkup = title && (
    <li className={styles.SectionHeading}>
      <Text as="span" variant="headingXs" color="subdued">
        {title}
      </Text>
      {actionMarkup}
    </li>
  );

  const itemsMarkup = items.map((item, index) => {
    const {onClick, label, subNavigationItems, ...rest} = item;
    const hasSubNavItems =
      subNavigationItems != null && subNavigationItems.length > 0;

    const handleToggleExpandedState = () => {
      if (expandedIndex === index) {
        setExpandedIndex(-1);
      } else {
        setExpandedIndex(index);
      }
    };

    return (
      <Item
        key={label}
        {...rest}
        label={label}
        subNavigationItems={subNavigationItems}
        onClick={handleClick(onClick, hasSubNavItems)}
        onToggleExpandedState={handleToggleExpandedState}
        expanded={expandedIndex === index}
      />
    );
  });

  const toggleClassName = classNames(styles.Item, styles.RollupToggle);
  const ariaLabel = rollup && (expanded ? rollup.hide : rollup.view);

  const toggleRollup = rollup && items.length > rollup.after && (
    <div className={styles.ListItem} key="List Item">
      <button
        type="button"
        className={toggleClassName}
        onClick={toggleExpanded}
        aria-label={ariaLabel}
      >
        <span className={styles.Icon}>
          <Icon source={HorizontalDotsMinor} />
        </span>
      </button>
    </div>
  );

  const activeItemIndex = items.findIndex((item: ItemProps) => {
    if (!rollup) {
      return false;
    }

    return (
      rollup.activePath === item.url ||
      (item.url && rollup.activePath.startsWith(item.url)) ||
      (item.subNavigationItems
        ? item.subNavigationItems.some(({url: itemUrl}) =>
            rollup.activePath.startsWith(itemUrl),
          )
        : false)
    );
  });

  const sectionItems = rollup
    ? itemsMarkup.slice(0, rollup.after)
    : itemsMarkup;

  const additionalItems = rollup ? itemsMarkup.slice(rollup.after) : [];

  if (rollup && activeItemIndex !== -1 && activeItemIndex > rollup.after - 1) {
    sectionItems.push(
      ...additionalItems.splice(activeItemIndex - rollup.after, 1),
    );
  }

  const additionalItemsId = useUniqueId('AdditionalItems');

  const activeItemsMarkup = rollup && additionalItems.length > 0 && (
    <li className={styles.RollupSection}>
      <Collapsible id={additionalItemsId} open={expanded}>
        <ul className={styles.List}>{additionalItems}</ul>
      </Collapsible>
      {toggleRollup}
    </li>
  );

  return (
    <ul className={className}>
      {sectionHeadingMarkup}
      {sectionItems}
      {activeItemsMarkup}
    </ul>
  );
}
