import React, {useRef, useState} from 'react';
import {zIndex} from '@shopify/polaris-tokens';

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
import {useFeatures} from '../../../../utilities/features';

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
  const {polarisSummerEditions2023} = useFeatures();

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
        variant={polarisSummerEditions2023 ? 'bodySm' : undefined}
        color={
          polarisSummerEditions2023 && (active || disabled)
            ? undefined
            : 'subdued'
        }
      >
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
    <HorizontalStack
      blockAlign="center"
      gap={polarisSummerEditions2023 ? '1_5-experimental' : '4'}
      wrap={!truncate}
    >
      {prefixMarkup}
      {textMarkup}
      {badgeMarkup}
      {suffixMarkup}
    </HorizontalStack>
  );

  const contentWrapper = polarisSummerEditions2023 ? (
    <Box width="100%">{contentElement}</Box>
  ) : (
    contentElement
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
      zIndexOverride={Number(zIndex['z-index-11'])}
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
