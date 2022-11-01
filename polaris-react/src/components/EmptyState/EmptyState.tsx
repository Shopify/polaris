import React, {useContext} from 'react';

import {classNames} from '../../utilities/css';
import {WithinContentContext} from '../../utilities/within-content-context';
import type {ComplexAction} from '../../types';
import {Box} from '../Box';
import {buttonFrom} from '../Button';
import {Image} from '../Image';
import {Stack} from '../Stack';
import {TextContainer} from '../TextContainer';
import {Text} from '../Text';

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
      className={styles.Image}
      source={largeImage}
      sourceSet={[
        {source: image, descriptor: '568w'},
        {source: largeImage, descriptor: '1136w'},
      ]}
      sizes="(max-width: 568px) 60vw"
    />
  ) : (
    <Image role="presentation" alt="" className={styles.Image} source={image} />
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
    <Text variant={headingSize} as="p">
      {heading}
    </Text>
  ) : null;

  const childrenMarkup = children ? (
    <div className={styles.Content}>
      <Text as="span" variant="bodyMd" color="subdued">
        {children}
      </Text>
    </div>
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
      <div className={styles.Actions}>
        <Stack alignment="center" distribution="center" spacing="tight">
          {secondaryActionMarkup}
          {primaryActionMarkup}
        </Stack>
      </div>
    ) : null;

  const detailsMarkup =
    textContentMarkup || actionsMarkup || footerContentMarkup ? (
      <div className={styles.DetailsContainer}>
        <div className={styles.Details}>
          {textContentMarkup}
          {actionsMarkup}
          {footerContentMarkup}
        </div>
      </div>
    ) : (
      <div className={styles.DetailsContainer} />
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
