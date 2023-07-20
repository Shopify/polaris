import React from 'react';
import type {ReactNode} from 'react';

import {Icon} from '../../../../../Icon';
import {UnstyledLink} from '../../../../../UnstyledLink';
import {HorizontalStack} from '../../../../../HorizontalStack';
import {Box} from '../../../../../Box';
import type {ActionListItemDescriptor} from '../../../../../../types';
import {classNames} from '../../../../../../utilities/css';
import {TruncateText} from '../../../../../TruncateText';

import styles from './MenuItem.scss';

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
}: ActionListItemDescriptor) {
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
