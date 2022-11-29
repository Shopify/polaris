import React, {useContext} from 'react';

import {classNames} from '../../utilities/css';
import {WithinContentContext} from '../../utilities/within-content-context';
import type {ComplexAction} from '../../types';
import {Box, BoxProps} from '../Box';
import {buttonFrom} from '../Button';
import {Image} from '../Image';
import {TextContainer} from '../TextContainer';
import {Text} from '../Text';
import {AlphaStack} from '../AlphaStack';
import {Inline} from '../Inline';

import styles from './EmptyState.scss';

export interface EmptyStateProps {
  /** The empty state heading */
  heading?: string;
  /**
   * The path to the image to display.
   * The image should have ~40px of white space above when empty state is used within a card, modal, or navigation component
   */
  image: string;
  /** The path to the image to display on large screens */
  largeImage?: string;
  /** Whether or not to limit the image to the size of its container on large screens */
  imageContained?: boolean;
  /** Whether or not the content should span the full width of its container  */
  fullWidth?: boolean;
  /** Elements to display inside empty state */
  children?: React.ReactNode;
  /** Primary action for empty state */
  action?: ComplexAction;
  /** Secondary action for empty state */
  secondaryAction?: ComplexAction;
  /** Secondary elements to display below empty state actions */
  footerContent?: React.ReactNode;
}

export function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  fullWidth = false,
  action,
  secondaryAction,
  footerContent,
}: EmptyStateProps) {
  const withinContentContainer = useContext(WithinContentContext);
  const className = classNames(
    styles.EmptyState,
    fullWidth && styles.fullWidth,
    imageContained && styles.imageContained,
    withinContentContainer && styles.withinContentContainer,
  );

  const imageMarkup = largeImage ? (
    <Image
      alt=""
      role="presentation"
      source={largeImage}
      sourceSet={[
        {source: image, descriptor: '568w'},
        {source: largeImage, descriptor: '1136w'},
      ]}
      sizes="(max-width: 568px) 60vw"
    />
  ) : (
    <Image role="presentation" alt="" source={image} />
  );

  const secondaryActionMarkup = secondaryAction
    ? buttonFrom(secondaryAction, {})
    : null;

  const footerContentMarkup = footerContent ? (
    <Box paddingBlockStart="4">
      <Text as="span" variant="bodyMd" color="subdued">
        {footerContent}
      </Text>
    </Box>
  ) : null;

  const headingSize = withinContentContainer ? 'headingLg' : 'headingXl';

  const primaryActionMarkup = action
    ? buttonFrom(action, {primary: true, size: 'medium'})
    : null;

  const headingMarkup = heading ? (
    <Text variant={headingSize} as="p" alignment="center">
      {heading}
    </Text>
  ) : null;

  const childrenMarkup = children ? (
    <Box paddingBlockEnd="2">
      <Text as="span" variant="bodyMd" color="subdued" alignment="center">
        {children}
      </Text>
    </Box>
  ) : null;

  const textContentMarkup =
    headingMarkup || children ? (
      <TextContainer>
        {headingMarkup}
        {childrenMarkup}
      </TextContainer>
    ) : null;

  const actionsMarkup =
    primaryActionMarkup || secondaryActionMarkup ? (
      <Box paddingBlockStart="2">
        <Inline align="center" gap="2">
          {secondaryActionMarkup}
          {primaryActionMarkup}
        </Inline>
      </Box>
    ) : null;

  const detailsMarkup =
    textContentMarkup || actionsMarkup || footerContentMarkup ? (
      <Box maxWidth={{sm: '400px'}}>
        <AlphaStack align="center">
          {textContentMarkup}
          {actionsMarkup}
          {footerContentMarkup}
        </AlphaStack>
      </Box>
    ) : null;

  const defaultBoxStyle: BoxProps = {
    paddingInlineStart: '5',
    paddingInlineEnd: '5',
    paddingBlockStart: '5',
    // get UX review 3.75em originally
    paddingBlockEnd: '16',
    // although is says $page-max-width
  };

  // new return
  return (
    <Box {...defaultBoxStyle}>
      <AlphaStack align="center" gap="0">
        {imageMarkup}
        {detailsMarkup}
      </AlphaStack>
    </Box>
  );

  return (
    <div className={className}>
      <div className={styles.Section}>
        {detailsMarkup}
        <div className={styles.ImageContainer}>{imageMarkup}</div>
      </div>
    </div>
  );
}
