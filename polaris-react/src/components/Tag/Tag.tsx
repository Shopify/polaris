import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Box} from '../Box';
import {Inline} from '../Inline';
import {UnstyledLink} from '../UnstyledLink';
import {Text} from '../Text';
import {UnstyledButton} from '../UnstyledButton';

import styles from './Tag.scss';

export interface NonMutuallyExclusiveProps {
  /** Content to display in the tag */
  children?: React.ReactNode;
  /** Disables the tag  */
  disabled?: boolean;
  /** Callback when tag is clicked or keypressed. Renders without remove button or url when set. */
  onClick?(): void;
  /** Callback when remove button is clicked or keypressed. */
  onRemove?(): void;
  /** A string to use when tag has more than textual content */
  accessibilityLabel?: string;
  /** Url to navigate to when tag is clicked or keypressed. */
  url?: string;
}

export type TagProps = NonMutuallyExclusiveProps &
  (
    | {onClick?(): void; onRemove?: undefined; url?: undefined}
    | {onClick?: undefined; onRemove?(): void; url?: string}
  );

export function Tag({
  children,
  disabled = false,
  onClick,
  onRemove,
  accessibilityLabel,
  url,
}: TagProps) {
  const i18n = useI18n();

  const segmented = onRemove && url;
  const className = classNames(
    styles.Tag,
    disabled && styles.disabled,
    onClick && styles.clickable,
    onRemove && styles.removable,
    url && !disabled && styles.linkable,
    segmented && styles.segmented,
  );

  // if (onClick) {
  //   return (
  //     <UnstyledButton
  //       type="button"
  //       disabled={disabled}
  //       className={styles.clickable}
  //       onClick={onClick}
  //     >
  //       <Text as="span" variant="bodySm">
  //         {children}
  //       </Text>
  //     </UnstyledButton>
  //   );
  // }

  let tagTitle = accessibilityLabel;

  if (!tagTitle) {
    tagTitle = typeof children === 'string' ? children : undefined;
  }

  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: tagTitle || '',
  });

  const removeButton =
    onRemove && !onClick ? (
      <UnstyledButton
        type="button"
        aria-label={ariaLabel}
        className={classNames(styles.Button, segmented && styles.segmented)}
        onClick={onRemove}
        onMouseUp={handleMouseUpByBlurring}
        disabled={disabled}
      >
        <Icon source={CancelSmallMinor} />
      </UnstyledButton>
    ) : null;

  // const tagContent =
  //   url && !disabled ? (
  //     <a
  //       className={classNames(styles.Link, segmented && styles.segmented)}
  //       href={url}
  //     >
  //       <span title={tagTitle} className={styles.LinkText}>
  //         {children}
  //       </span>
  //     </a>
  //   ) : (
  //     <span title={tagTitle} className={styles.TagText}>
  //       {children}
  //     </span>
  //   );

  const textContent = (
    <Text variant="bodySm" as="span">
      <span className={styles.TagText}>{children}</span>
    </Text>
  );

  const tagContent =
    url && !disabled ? (
      <UnstyledLink url={url} className={styles.Link}>
        {textContent}
      </UnstyledLink>
    ) : (
      textContent
    );

  const clickable = (
    <UnstyledButton
      type="button"
      disabled={disabled}
      className={styles.clickable}
      onClick={onClick}
    >
      <Text as="span" variant="bodySm">
        {textContent}
      </Text>
    </UnstyledButton>
  );

  let element;

  if (onClick) {
    element = 'button';
  } else if (url) {
    element = 'a';
  } else {
    element = 'span';
  }

  return (
    <Inline blockAlign="stretch">
      <Box
        as={element}
        background="surface-neutral"
        maxWidth="100%"
        borderRadius="1"
        minHeight="28px"
        color="text"
        paddingBlockEnd="0"
        paddingBlockStart="0"
        paddingInlineStart="2"
        paddingInlineEnd={onRemove ? '0' : '2'}
        buttonProps={onClick}
      >
        <Inline
          wrap={false}
          spacing="1"
          blockAlign="stretch"
          align="space-evenly"
        >
          {onClick ? clickable : tagContent}
          {removeButton}
        </Inline>
      </Box>
    </Inline>
  );

  return (
    <span className={className}>
      {tagContent}
      {removeButton}
    </span>
  );
}
