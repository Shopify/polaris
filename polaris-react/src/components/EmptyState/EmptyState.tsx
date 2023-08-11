import React from 'react';

import {classNames} from '../../utilities/css';
import type {ComplexAction} from '../../types';
import {Box} from '../Box';
import {buttonFrom} from '../Button';
import {Image} from '../Image';
import {Text} from '../Text';
import {VerticalStack} from '../VerticalStack';
import {HorizontalStack} from '../HorizontalStack';

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
  const imageContainedClass = classNames(
    imageContained && styles.imageContained,
  );

  const imageMarkup = largeImage ? (
    <Image
      alt=""
      role="presentation"
      source={largeImage}
      className={imageContainedClass}
      sourceSet={[
        {source: image, descriptor: '568w'},
        {source: largeImage, descriptor: '1136w'},
      ]}
      sizes="(max-width: 568px) 60vw"
    />
  ) : (
    <Image
      className={imageContainedClass}
      role="presentation"
      alt=""
      source={image}
    />
  );

  const secondaryActionMarkup = secondaryAction
    ? buttonFrom(secondaryAction, {})
    : null;

  const footerContentMarkup = footerContent ? (
    <Box paddingBlockStart="4">
      <Text as="span" alignment="center" variant="bodySm">
        {footerContent}
      </Text>
    </Box>
  ) : null;

  const primaryActionMarkup = action
    ? buttonFrom(action, {primary: true, size: 'medium'})
    : null;

  const headingMarkup = heading ? (
    <Box paddingBlockEnd="1_5-experimental">
      <Text variant="headingMd" as="p" alignment="center">
        {heading}
      </Text>
    </Box>
  ) : null;

  const childrenMarkup = children ? (
    <Text as="span" alignment="center" variant="bodySm">
      {children}
    </Text>
  ) : null;

  const textContentMarkup =
    headingMarkup || children ? (
      <Box paddingBlockEnd="4">
        {headingMarkup}
        {childrenMarkup}
      </Box>
    ) : null;

  const actionsMarkup =
    primaryActionMarkup || secondaryActionMarkup ? (
      <HorizontalStack align="center" gap="2">
        {secondaryActionMarkup}
        {primaryActionMarkup}
      </HorizontalStack>
    ) : null;

  const detailsMarkup =
    textContentMarkup || actionsMarkup || footerContentMarkup ? (
      <Box maxWidth={fullWidth ? '100%' : '400px'}>
        <VerticalStack inlineAlign="center">
          {textContentMarkup}
          {actionsMarkup}
          {footerContentMarkup}
        </VerticalStack>
      </Box>
    ) : null;

  return (
    <Box
      paddingInlineStart="0"
      paddingInlineEnd="0"
      paddingBlockStart="5"
      paddingBlockEnd="16"
    >
      <VerticalStack inlineAlign="center">
        {imageMarkup}
        {detailsMarkup}
      </VerticalStack>
    </Box>
  );
}
