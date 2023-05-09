import React, {useRef, useState} from 'react';

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
import {useIsomorphicLayoutEffect} from '../../../../utilities/use-isomorphic-layout-effect';

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
  truncate = 'end',
  active,
  role,
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

  let contentText: string | React.ReactNode = content || '';
  if (ellipsis) {
    contentText = `${content}…`;
  } else if (truncate && content) {
    contentText = <TruncateText position={truncate}>{content}</TruncateText>;
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

  const suffixMarkup = suffix && (
    <Box>
      <span className={styles.Suffix}>{suffix}</span>
    </Box>
  );

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

export const TruncateText = ({
  children,
  position = 'end',
}: {
  children: React.ReactNode;
  position?: 'end' | 'middle';
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollWidth > textRef.current.offsetWidth,
      );
    }
  }, [children]);

  const text = (
    <span ref={textRef} className={styles.Truncate}>
      {children}
    </span>
  );

  return isOverflowing ? (
    <Tooltip
      zIndexOverride={514}
      preferredPosition="above"
      hoverDelay={1000}
      content={textRef.current?.innerText}
    >
      {position === 'middle'
        ? middleTruncate(textRef.current?.innerText || '', 40)
        : text}
    </Tooltip>
  ) : (
    text
  );
};

function middleTruncate(inputString: string, length: number, prefix = '…') {
  const trimmedString = inputString.trim();
  const stringLength = trimmedString.length;
  const prefixLength = prefix.length;
  if (stringLength <= length) return trimmedString;
  const trimLength = (length - prefixLength) / 2;
  const frontChars = Math.ceil(trimLength);
  const backChars = Math.floor(trimLength);
  return (
    trimmedString.substr(0, frontChars) +
    prefix +
    trimmedString.substr(trimmedString.length - backChars)
  );
}
