import React from 'react';
import type {ReactNode} from 'react';

import {Icon} from '../../../../../Icon';
import {UnstyledLink} from '../../../../../UnstyledLink';
import styles from './MenuItem.scss';
import {HorizontalStack} from '../../../../../HorizontalStack';
import {Box} from '../../../../../Box';
import {TruncateText} from '../../../../../ActionList/components';
import type {IconSource} from '../../../../../../types';
import {classNames} from '../../../../../../utilities/css';

export interface MenuItemProps {
  /** A unique identifier for the action */
  id?: string;
  /** Content to display inside the menu item */
  content?: string;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** The url to link to, rendered in the action item */
  url?: string;
  /** Callback when clicked or keypressed */
  onAction?(): void;
  /** Icon to display */
  icon?: IconSource;
  /** Prefix content to display before the item content */
  prefix?: ReactNode;
  /** Suffix content to display after the item content */
  suffix?: ReactNode;
  /** Whether or not the menu item is active */
  active?: boolean;
  /** Whether or not the menu item is external */
  external?: boolean;
  /** Truncate content */
  truncate?: boolean;
  /** Role of the menu item */
  role?: string;
}

export function MenuItem({
  id,
  content,
  accessibilityLabel,
  url,
  onAction,
  icon,
  prefix,
  suffix,
  external,
  truncate,
  role,
  active = false,
}: MenuItemProps) {
  let prefixMarkup: ReactNode | null = null;

  if (prefix) {
    prefixMarkup = <span className={styles.Prefix}>{prefix}</span>;
  } else if (icon) {
    prefixMarkup = (
      <span className={styles.Prefix}>
        <Icon source={icon} />
      </span>
    );
  }

  let contentMarkup: ReactNode = content || '';

  if (truncate && content) {
    contentMarkup = <TruncateText>{content}</TruncateText>;
  }

  let suffixMarkup: ReactNode | null = null;

  if (suffix) {
    suffixMarkup = suffix;
  }

  const contentElement = (
    <Box width="100%" paddingInlineEnd="2" insetInlineEnd="2">
      <HorizontalStack
        blockAlign="center"
        gap="2"
        wrap={!truncate}
        align="space-between"
      >
        {prefixMarkup}
        <div className={styles.Content}>{contentMarkup}</div>
        {suffixMarkup}
      </HorizontalStack>
    </Box>
  );

  const contentMarkupWithLink = (
    <UnstyledLink
      id={id}
      url={url || ''}
      className={classNames(styles.MenuItem, active && styles.active)}
      external={external}
      aria-label={accessibilityLabel}
      onClick={onAction}
      role={role}
    >
      {contentElement}
    </UnstyledLink>
  );
  return <>{contentMarkupWithLink}</>;
}
