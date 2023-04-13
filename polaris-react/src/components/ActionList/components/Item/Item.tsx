import React from 'react';
import {TickSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import type {ActionListItemDescriptor} from '../../../../types';
import {Scrollable} from '../../../Scrollable';
import {Icon} from '../../../Icon';
import {UnstyledLink} from '../../../UnstyledLink';
import {Badge} from '../../../Badge';
import {Text} from '../../../Text';
import styles from '../../ActionList.scss';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';
import {HorizontalStack} from '../../../HorizontalStack';
import {Box} from '../../../Box';
import {Tooltip} from '../../../Tooltip';
import {Truncate} from '../../../Truncate';

export type ItemProps = ActionListItemDescriptor;

export function Item({
  id,
  badge,
  content,
  accessibilityLabel,
  helpText,
  url,
  onAction,
  onMouseEnter,
  icon,
  image,
  prefix,
  suffix,
  disabled,
  external,
  destructive,
  ellipsis,
  active,
  role,
  truncate = false,
}: ItemProps) {
  const className = classNames(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active,
  );

  let prefixMarkup: React.ReactNode | null = null;

  if (prefix) {
    prefixMarkup = <span className={styles.Prefix}>{prefix}</span>;
  } else if (icon) {
    prefixMarkup = (
      <span className={styles.Prefix}>
        <Icon source={icon} />
      </span>
    );
  } else if (image) {
    prefixMarkup = (
      <span
        role="presentation"
        className={styles.Prefix}
        style={{backgroundImage: `url(${image}`}}
      />
    );
  }

  let contentText = null;

  if (ellipsis && content) {
    contentText = `${content}…`;
  } else if (content) {
    contentText = truncate ? truncateText(content) : content;
  } else {
    contentText = content;
  }

  const contentMarkup = helpText ? (
    <>
      <Box>{contentText}</Box>
      <Text color="subdued" as="span">
        {helpText}
      </Text>
    </>
  ) : (
    contentText
  );

  const badgeMarkup = badge && (
    <span className={styles.Suffix}>
      <Badge status={badge.status}>{badge.content}</Badge>
    </span>
  );

  let suffixMarkup: React.ReactNode | null = null;

  if (active) {
    suffixMarkup = (
      <Box>
        <span className={styles.Suffix}>
          <Icon source={TickSmallMinor} />
        </span>
      </Box>
    );
  } else if (suffix) {
    suffixMarkup = suffix && (
      <Box>
        <span className={styles.Suffix}>{suffix}</span>
      </Box>
    );
  }

  const textMarkup = <span className={styles.Text}>{contentMarkup}</span>;

  const contentElement = (
    <HorizontalStack blockAlign="center" gap="4" wrap={!truncate}>
      {prefixMarkup}
      {textMarkup}
      {badgeMarkup}
      {suffixMarkup}
    </HorizontalStack>
  );

  const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

  const control = url ? (
    <UnstyledLink
      id={id}
      url={disabled ? null : url}
      className={className}
      external={external}
      aria-label={accessibilityLabel}
      onClick={disabled ? null : onAction}
      role={role}
    >
      {contentElement}
    </UnstyledLink>
  ) : (
    <button
      id={id}
      type="button"
      className={className}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
      role={role}
      onMouseEnter={onMouseEnter}
    >
      {contentElement}
    </button>
  );

  return (
    <>
      {scrollMarkup}
      {control}
    </>
  );
}

const truncateText = (text: string) => {
  const trimmedText = text.trim();
  return (
    <Tooltip
      content={trimmedText}
      zIndexOverride={514}
      preferredPosition="above"
      hoverDelay={1000}
    >
      <Text truncate as="p" variant="bodyMd">
        <Truncate>{trimmedText}</Truncate>
      </Text>
    </Tooltip>
  );
};
