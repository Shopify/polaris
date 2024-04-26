import React, {useRef, useState} from 'react';

import {classNames} from '../../../../utilities/css';
import type {ActionListItemDescriptor} from '../../../../types';
import {Scrollable} from '../../../Scrollable';
import {Icon} from '../../../Icon';
import {UnstyledLink} from '../../../UnstyledLink';
import {Badge} from '../../../Badge';
import {Text} from '../../../Text';
import styles from '../../ActionList.module.css';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';
import {InlineStack} from '../../../InlineStack';
import {Box} from '../../../Box';
import {Tooltip} from '../../../Tooltip';
import {useIsomorphicLayoutEffect} from '../../../../utilities/use-isomorphic-layout-effect';
import {useTheme} from '../../../../utilities/use-theme';

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
  truncate,
  active,
  role,
  variant = 'default',
}: ItemProps) {
  const className = classNames(
    styles.Item,
    disabled && styles.disabled,
    destructive && styles.destructive,
    active && styles.active,
    variant === 'default' && styles.default,
    variant === 'indented' && styles.indented,
    variant === 'menu' && styles.menu,
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
  if (truncate && content) {
    contentText = <TruncateText>{content}</TruncateText>;
  } else if (ellipsis) {
    contentText = `${content}…`;
  }

  const contentMarkup = helpText ? (
    <>
      <Box>{contentText}</Box>
      <Text
        as="span"
        variant="bodySm"
        tone={active || disabled ? undefined : 'subdued'}
      >
        {helpText}
      </Text>
    </>
  ) : (
    <Text
      as="span"
      variant="bodyMd"
      fontWeight={active ? 'semibold' : 'regular'}
    >
      {contentText}
    </Text>
  );

  const badgeMarkup = badge && (
    <span className={styles.Suffix}>
      <Badge tone={badge.tone}>{badge.content}</Badge>
    </span>
  );

  const suffixMarkup = suffix && (
    <Box>
      <span className={styles.Suffix}>{suffix}</span>
    </Box>
  );

  const textMarkup = (
    <span className={styles.Text}>
      <Text
        as="span"
        variant="bodyMd"
        fontWeight={active ? 'semibold' : 'regular'}
      >
        {contentMarkup}
      </Text>
    </span>
  );

  const contentElement = (
    <div className={styles.ContentElement}>
      <InlineStack
        blockAlign="center"
        gap={{xs: '200', md: '150'}}
        wrap={false}
      >
        {prefixMarkup}
        {textMarkup}
        {badgeMarkup}
        {suffixMarkup}
      </InlineStack>
    </div>
  );

  const contentWrapper = <Box width="100%">{contentElement}</Box>;

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
      {contentWrapper}
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
      {contentWrapper}
    </button>
  );

  return (
    <>
      {scrollMarkup}
      {control}
    </>
  );
}

export const TruncateText = ({children}: {children: string}) => {
  const theme = useTheme();
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
    <Text as="span" truncate>
      <Box width="100%" ref={textRef}>
        {children}
      </Box>
    </Text>
  );

  return isOverflowing ? (
    <Tooltip
      zIndexOverride={Number(theme.zIndex['z-index-11'])}
      preferredPosition="above"
      hoverDelay={1000}
      content={children}
      dismissOnMouseOut
    >
      <Text as="span" truncate>
        {children}
      </Text>
    </Tooltip>
  ) : (
    text
  );
};
