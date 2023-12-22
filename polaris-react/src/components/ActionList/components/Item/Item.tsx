import React, {useRef, useState} from 'react';

import {classNames} from '../../../../utilities/css';
import type {ActionListItemDescriptor} from '../../../../types';
import {Scrollable} from '../../../Scrollable';
import {Icon} from '../../../Icon';
import {UnstyledLink} from '../../../UnstyledLink';
import {Badge} from '../../../Badge';
import {Text} from '../../../Text';
import styles from '../../ActionList.module.scss';
import {handleMouseUpByBlurring} from '../../../../utilities/focus';
import {InlineStack} from '../../../InlineStack';
import type {ResponsiveStylePropsWithModifiers} from '../../../Box';
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
  const indentedItemMargin = 'calc(var(--p-space-500) + var(--p-space-050))';
  const indentedItemWidth = `calc(100% - ${indentedItemMargin})`;

  const itemStyleProps: ResponsiveStylePropsWithModifiers = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minHeight: 'var(--pc-action-list-item-min-height)',
    textAlign: 'left',
    textDecorationLine: 'none',
    cursor: 'pointer',
    padding: '150',
    borderRadius: '200',
    borderBlockStartWidth: '025',
    borderBlockStartColor: 'transparent',
    borderBlockStartStyle: 'solid',
    _hover: {
      backgroundColor: 'bg-surface-secondary-hover',
      textDecorationLine: 'none',
      outlineWidth: '050',
      outlineStyle: 'solid',
      outlineColor: 'transparent',
      ...(destructive && {
        backgroundColor: 'bg-surface-critical-hover',
      }),
      ...(disabled && {
        backgroundColor: undefined,
      }),
    },
    _active: {
      backgroundColor: 'bg-surface-secondary-active',
      ...(destructive && {
        backgroundColor: 'bg-surface-critical-active',
      }),
      ...(disabled && {
        backgroundColor: undefined,
      }),
    },
    _before: {
      ...(active && {
        display: 'none',
      }),
      ...(variant === 'indented' && {
        content: '""',
        position: 'absolute',
        top: 'calc(var(--p-space-300) * -1)',
        bottom: 0,
        left: 0,
        borderInlineStartColor: 'var(--p-border-width-025)',
        borderInlineStartStyle: 'solid',
        borderInlineStartWidth: '025',
        marginLeft: 'calc(var(--p-space-150) * -1)',
      }),
    },
    _visited: {
      color: undefined,
    },
    ...(disabled && {
      backgroundImage: 'none',
      color: 'var(--p-color-text-disabled)',
      cursor: 'default',
    }),
    ...(destructive && {
      color: 'var(--p-color-text-critical)',
      ...(active && {
        backgroundColor: 'bg-surface-critical-active',
      }),
    }),
    ...(active && {
      backgroundColor: 'bg-surface-secondary-selected',
      fontWeight: 'semibold',
    }),
    ...(variant === 'indented' && {
      position: 'relative',
      marginLeft: indentedItemMargin,
      maxWidth: indentedItemWidth,
    }),
  };

  let prefixMarkup: React.ReactNode | null = null;
  const prefixStyleProps = {
    display: 'flex',
    flexGrow: '0',
    flexShrink: '0',
    flexBasis: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginBlock: 'calc(-0.5 * var(--pc-action-list-image-size))',
    marginInline: '0',
    backgroundSize: 'cover',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
    height: 'var(--pc-action-list-image-size)',
    width: 'var(--pc-action-list-image-size)',
  };

  if (prefix) {
    prefixMarkup = (
      <Box as="span" className={styles.Prefix} sx={prefixStyleProps}>
        {prefix}
      </Box>
    );
  } else if (icon) {
    prefixMarkup = (
      <Box as="span" className={styles.Prefix} sx={prefixStyleProps}>
        <Icon source={icon} />
      </Box>
    );
  } else if (image) {
    prefixMarkup = (
      <Box
        as="span"
        role="presentation"
        className={styles.Prefix}
        sx={{
          backgroundImage: `url(${image}`,
          ...prefixStyleProps,
        }}
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
    contentText
  );

  const badgeMarkup = badge && (
    <Box as="span" className={styles.Suffix}>
      <Badge tone={badge.tone}>{badge.content}</Badge>
    </Box>
  );

  const suffixMarkup = suffix && (
    <Box>
      <Box as="span" className={styles.Suffix}>
        {suffix}
      </Box>
    </Box>
  );

  const textMarkup = (
    <Box
      as="span"
      sx={{
        minWidth: '0',
        maxWidth: '100%',
        flexShrink: '1',
        flexGrow: '1',
        flexBasis: 'auto',
      }}
    >
      {contentMarkup}
    </Box>
  );

  const contentElement = (
    <InlineStack blockAlign="center" gap="150" wrap={!truncate}>
      {prefixMarkup}
      {textMarkup}
      {badgeMarkup}
      {suffixMarkup}
    </InlineStack>
  );

  const contentWrapper = <Box sx={{width: '100%'}}>{contentElement}</Box>;

  const scrollMarkup = active ? <Scrollable.ScrollTo /> : null;

  const control = url ? (
    <UnstyledLink
      id={id}
      url={disabled ? null : url}
      className={className}
      sx={itemStyleProps}
      external={external}
      aria-label={accessibilityLabel}
      onClick={disabled ? null : onAction}
      role={role}
    >
      {contentWrapper}
    </UnstyledLink>
  ) : (
    <Box
      as="button"
      id={id}
      type="button"
      className={className}
      sx={itemStyleProps}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onClick={onAction}
      onMouseUp={handleMouseUpByBlurring}
      role={role}
      onMouseEnter={onMouseEnter}
    >
      {contentWrapper}
    </Box>
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
      <Box sx={{width: '100%'}} ref={textRef}>
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
