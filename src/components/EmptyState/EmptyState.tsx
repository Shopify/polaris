import React, {useContext} from 'react';

import {classNames} from '../../utilities/css';
import {WithinContentContext} from '../../utilities/within-content-context';
import {useFeatures} from '../../utilities/features';
import type {Action} from '../../types';
import {Image} from '../Image';
import {buttonFrom} from '../Button';
import {Stack} from '../Stack';
import {TextContainer} from '../TextContainer';
import {DisplayText} from '../DisplayText';

import styles from './EmptyState.scss';

export interface EmptyStateProps {
  /** The empty state heading */
  heading?: string;
  /** The path to the image to display */
  image: string;
  /** The path to the image to display on large screens */
  largeImage?: string;
  /**
   * Whether or not to limit the image to the size of its container on large screens.
   */
  imageContained?: boolean;
  /** Whether or not the layout is stacked and centered vs justified apart */
  centeredLayout?: boolean;
  /** Elements to display inside empty state */
  children?: React.ReactNode;
  /** Primary action for empty state */
  action?: Action;
  /** Secondary action for empty state */
  secondaryAction?: Action;
  /** Secondary elements to display below empty state actions */
  footerContent?: React.ReactNode;
}

export function EmptyState({
  children,
  heading,
  image,
  largeImage,
  imageContained,
  centeredLayout = false,
  action,
  secondaryAction,
  footerContent,
}: EmptyStateProps) {
  const withinContentContainer = useContext(WithinContentContext);
  const {newDesignLanguage = false} = useFeatures();
  const newLayout = centeredLayout || newDesignLanguage;
  const className = classNames(
    styles.EmptyState,
    newLayout && styles.centeredLayout,
    imageContained && styles.imageContained,
    withinContentContainer ? styles.withinContentContainer : styles.withinPage,
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
    ? buttonFrom(secondaryAction, newLayout ? {} : {plain: true})
    : null;

  const footerContentMarkup = footerContent ? (
    <div className={styles.FooterContent}>
      <TextContainer>{footerContent}</TextContainer>
    </div>
  ) : null;

  const headingSize = withinContentContainer ? 'small' : 'medium';
  const primaryActionSize =
    withinContentContainer || newLayout ? 'medium' : 'large';

  const primaryActionMarkup = action
    ? buttonFrom(action, {primary: true, size: primaryActionSize})
    : null;

  const headingMarkup = heading ? (
    <DisplayText size={headingSize}>{heading}</DisplayText>
  ) : null;

  const childrenMarkup = children ? (
    <div className={styles.Content}>{children}</div>
  ) : null;

  const textContentMarkup =
    headingMarkup || children ? (
      <TextContainer spacing={newLayout ? 'tight' : undefined}>
        {headingMarkup}
        {childrenMarkup}
      </TextContainer>
    ) : null;

  const actionsMarkup =
    primaryActionMarkup || secondaryActionMarkup ? (
      <div className={styles.Actions}>
        <Stack
          alignment="center"
          distribution={newLayout ? 'center' : undefined}
          spacing={newLayout ? 'tight' : undefined}
        >
          {primaryActionMarkup}
          {secondaryActionMarkup}
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
