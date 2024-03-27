import React, {useId, useContext, useState} from 'react';
import isEqual from 'react-fast-compare';

import {classNames} from '../../../../../../utilities/css';
import type {IconProps} from '../../../../../Icon';
import {Collapsible} from '../../../../../Collapsible';
import {NavigationContext} from '../../../../context';
import type {ItemProps, SubNavigationItem} from '../../../../types';
import styles from '../../../../Navigation.module.css';

export interface SecondaryNavigationProps {
  ItemComponent: React.ComponentType<ItemProps>;
  icon?: IconProps['source'];
  longestMatch: SubNavigationItem;
  subNavigationItems: SubNavigationItem[];
  showExpanded: boolean;
  truncateText?: boolean;
  secondaryNavigationId?: string;
}

export function SecondaryNavigation({
  ItemComponent,
  icon,
  longestMatch,
  subNavigationItems,
  showExpanded,
  truncateText,
  secondaryNavigationId,
}: SecondaryNavigationProps) {
  const uid = useId();
  const {onNavigationDismiss} = useContext(NavigationContext);
  const [hoveredItem, setHoveredItem] = useState<
    SubNavigationItem | undefined
  >();

  const matchedItemPosition = subNavigationItems.findIndex((item) =>
    isEqual(item, longestMatch),
  );
  const hoveredItemPosition = subNavigationItems.findIndex((item) =>
    isEqual(item, hoveredItem),
  );

  return (
    <div
      className={classNames(
        styles.SecondaryNavigation,
        showExpanded && styles.SecondaryNavigationOpen,
        !icon && styles['SecondaryNavigation-noIcon'],
      )}
    >
      <Collapsible
        id={secondaryNavigationId || uid}
        open={showExpanded}
        transition={false}
      >
        <ul className={styles.List}>
          {subNavigationItems.map((item, index) => {
            const {label, ...rest} = item;
            const onClick = () => {
              onNavigationDismiss?.();

              if (item.onClick && item.onClick !== onNavigationDismiss) {
                item.onClick();
              }
            };

            const shouldShowVerticalLine = index < matchedItemPosition;

            return (
              <ItemComponent
                key={label}
                {...rest}
                label={label}
                showVerticalLine={shouldShowVerticalLine}
                showVerticalHoverPointer={index === hoveredItemPosition}
                level={1}
                onMouseEnter={
                  item.disabled ? undefined : () => setHoveredItem(item)
                }
                onMouseLeave={
                  item.disabled ? undefined : () => setHoveredItem(undefined)
                }
                matches={isEqual(item, longestMatch)}
                onClick={onClick}
                truncateText={truncateText}
              />
            );
          })}
        </ul>
      </Collapsible>
    </div>
  );
}
