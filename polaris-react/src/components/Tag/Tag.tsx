import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {useI18n} from '../../utilities/i18n';
import {Icon} from '../Icon';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {UnstyledButton} from '../UnstyledButton';
import {UnstyledLink} from '../UnstyledLink';
import {Inline} from '../Inline';
import {Box, BoxProps} from '../Box';
import {Text} from '../Text';

// import styles from './Tag.scss';

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

  // const segmented = onRemove && url;
  // const className = classNames(
  //   styles.Tag,
  //   disabled && styles.disabled,
  //   onClick && styles.clickable,
  //   onRemove && styles.removable,
  //   url && !disabled && styles.linkable,
  //   segmented && styles.segmented,
  // );

  const boxPropValues: BoxProps = {
    background: 'surface-neutral',
    minHeight: '28px',
    minWidth: 'fit-content',
    paddingBlockEnd: '0',
    paddingBlockStart: '0',
    paddingInlineEnd: '2',
    paddingInlineStart: '2',
    borderRadius: '1',
    color: 'text',
  };

  let tagTitle = accessibilityLabel;

  if (!tagTitle) {
    tagTitle = typeof children === 'string' ? children : undefined;
  }

  const tagText = (
    <Text as="span" variant="bodySm" title={tagTitle}>
      {children}
    </Text>
  );

  if (onClick) {
    return (
      <UnstyledButton type="button" {...boxPropValues}>
        {tagText}
      </UnstyledButton>
    );
  }

  const ariaLabel = i18n.translate('Polaris.Tag.ariaLabel', {
    children: tagTitle || '',
  });

  const removeButton = onRemove ? (
    // need to allow for hover/interaction styles now that button is a Box underneath
    <UnstyledButton
      type="button"
      aria-label={ariaLabel}
      onClick={onRemove}
      onMouseUp={handleMouseUpByBlurring}
      disabled={disabled}
    >
      <Icon color="base" source={CancelSmallMinor} />
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

  return (
    <Inline blockAlign="stretch">
      <Box as="span" {...boxPropValues}>
        <Inline align="center" blockAlign="stretch">
          {/* how do we handle truncating now that links are boxes? */}
          {/* href is not getting passed to box as expected */}
          <UnstyledLink href={url}>{tagText}</UnstyledLink>
          {removeButton}
        </Inline>
      </Box>
    </Inline>
  );

  // return (
  //   <span className={className}>
  //     {tagContent}
  //     {removeButton}
  //   </span>
  // );
}
