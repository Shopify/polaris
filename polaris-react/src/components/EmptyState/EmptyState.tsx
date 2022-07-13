import React, {useContext} from 'react';

import {classNames} from '../../utilities/css';
import {WithinContentContext} from '../../utilities/within-content-context';
import type {ComplexAction} from '../../types';
import {Image} from '../Image';
import {buttonFrom} from '../Button';
import {Stack} from '../Stack';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../TextContainer';
// eslint-disable-next-line import/no-deprecated
import {DisplayText} from '../DisplayText';

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
    <div className={styles.FooterContent}>
      <TextContainer>{footerContent}</TextContainer>
    </div>
  ) : null;

  const headingSize = withinContentContainer ? 'small' : 'medium';

  const primaryActionMarkup = action
    ? buttonFrom(action, {primary: true, size: 'medium'})
    : null;

  const headingMarkup = heading ? (
    <DisplayText size={headingSize}>{heading}</DisplayText>
  ) : null;

  const childrenMarkup = children ? (
    <div className={styles.Content}>{children}</div>
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
