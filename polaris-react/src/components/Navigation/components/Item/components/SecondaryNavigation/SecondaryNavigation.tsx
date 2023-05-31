import React, {useId, useContext, useState} from 'react';

import {classNames} from '../../../../../../utilities/css';
import {useFeatures} from '../../../../../../utilities/features';
import type {IconProps} from '../../../../../Icon';
import {NavigationContext} from '../../../../context';
import {Secondary} from '../Secondary';
import type {ItemProps, SubNavigationItem} from '../../types';
import styles from '../../../../Navigation.scss';

interface SecondaryNavigationProps {
  Item: React.ComponentType<ItemProps>;
  icon?: IconProps['source'];
  longestMatch: SubNavigationItem;
  subNavigationItems: SubNavigationItem[];
  showExpanded: boolean;
  truncateText?: boolean;
}

export function SecondaryNavigation({
  Item,
  icon,
  longestMatch,
  subNavigationItems,
  showExpanded,
  truncateText,
}: SecondaryNavigationProps) {
  const {polarisSummerEditions2023} = useFeatures();
  const secondaryNavigationId = useId();
  const {onNavigationDismiss} = useContext(NavigationContext);
  const [hoveredItemLabel, setHoveredItemLabel] = useState<
    string | undefined
  >();

  const matchesPosition = subNavigationItems.findIndex(({matches}) => matches);
  const hoveredItemPosition = subNavigationItems.findIndex(
    ({label}) => label === hoveredItemLabel,
  );

  return (
    <div
      className={classNames(
        styles.SecondaryNavigation,
        !icon && styles['SecondaryNavigation-noIcon'],
      )}
    >
      <Secondary expanded={showExpanded} id={secondaryNavigationId}>
        {subNavigationItems.map((item, index) => {
          const {label, ...rest} = item;
          const onClick = () => {
            if (onNavigationDismiss) {
              onNavigationDismiss();
            }

            if (item.onClick && item.onClick !== onNavigationDismiss) {
              item.onClick();
            }
          };

          return (
            <Item
              key={label}
              {...rest}
              label={label}
              addLine={
                polarisSummerEditions2023 ? index < matchesPosition : undefined
              }
              addHoverLine={
                polarisSummerEditions2023
                  ? index < hoveredItemPosition
                  : undefined
              }
              addHoverPointer={
                polarisSummerEditions2023 && index === hoveredItemPosition
              }
              onMouseEnter={() => setHoveredItemLabel(label)}
              onMouseLeave={() => setHoveredItemLabel(undefined)}
              matches={item === longestMatch}
              onClick={onClick}
              truncateText={truncateText}
            />
          );
        })}
      </Secondary>
    </div>
  );
}
