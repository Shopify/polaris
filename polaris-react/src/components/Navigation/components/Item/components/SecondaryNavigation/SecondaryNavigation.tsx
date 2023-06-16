import React, {useId, useContext, useState} from 'react';
import isEqual from 'react-fast-compare';

import {classNames} from '../../../../../../utilities/css';
import {useFeatures} from '../../../../../../utilities/features';
import type {IconProps} from '../../../../../Icon';
import {Collapsible} from '../../../../../Collapsible';
import {NavigationContext} from '../../../../context';
import type {ItemProps, SubNavigationItem} from '../../../../types';
import styles from '../../../../Navigation.scss';

export interface SecondaryNavigationProps {
  ItemComponent: React.ComponentType<ItemProps>;
  icon?: IconProps['source'];
  longestMatch: SubNavigationItem;
  subNavigationItems: SubNavigationItem[];
  showExpanded: boolean;
  truncateText?: boolean;
}

export function SecondaryNavigation({
  ItemComponent,
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

  const matchedItemPosition = subNavigationItems.findIndex(
    ({matches}) => matches,
  );
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
      <Collapsible
        id={secondaryNavigationId}
        open={showExpanded}
        transition={false}
      >
        <ul
          className={classNames(
            styles.List,
            polarisSummerEditions2023 && styles.ListSecondary,
          )}
        >
          {subNavigationItems.map((item, index) => {
            const {label, ...rest} = item;
            const onClick = () => {
              onNavigationDismiss?.();

              if (item.onClick && item.onClick !== onNavigationDismiss) {
                item.onClick();
              }
            };

            const shouldAddLine = polarisSummerEditions2023
              ? index < matchedItemPosition
              : false;

            const shouldAddHoverLine = polarisSummerEditions2023
              ? index < hoveredItemPosition
              : false;

            const shouldAddHoverLineEmphasis =
              polarisSummerEditions2023 &&
              hoveredItemPosition < matchedItemPosition
                ? index < hoveredItemPosition
                : false;

            return (
              <ItemComponent
                key={label}
                {...rest}
                label={label}
                addLine={shouldAddHoverLineEmphasis ? undefined : shouldAddLine}
                addHoverLine={shouldAddHoverLine}
                addHoverPointer={
                  polarisSummerEditions2023 && index === hoveredItemPosition
                }
                onMouseEnter={() => setHoveredItemLabel(label)}
                onMouseLeave={() => setHoveredItemLabel(undefined)}
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
