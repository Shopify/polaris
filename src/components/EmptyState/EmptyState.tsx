import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Action} from '../../types';
import Image from '../Image';
import {buttonFrom} from '../Button';
import Stack from '../Stack';
import TextContainer from '../TextContainer';
import DisplayText from '../DisplayText';

import styles from './EmptyState.scss';

export interface Props {
  /** The empty state heading */
  heading?: string;
  /** The image to use for small screens */
  image: string;
  /** The image to use for large screens */
  largeImage?: string;
  /** The image to use for large screens */
  imageContained?: boolean;
  /** Elements to display inside empty state */
  children?: React.ReactNode;
  /** Primary action for empty state */
  action: Action;
  /** Secondary action for empty state */
  secondaryAction?: Action;
}

export default class EmptyState extends React.PureComponent<Props, never> {
  render() {
    const {
      children,
      heading,
      image,
      largeImage,
      imageContained,
      action,
      secondaryAction,
    } = this.props;

    const className = classNames(
      styles.EmptyState,
      imageContained && styles.imageContained,
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
      <Image
        role="presentation"
        alt=""
        className={styles.Image}
        source={image}
      />
    );

    const secondaryActionMarkup = secondaryAction
      ? buttonFrom(secondaryAction, {plain: true})
      : null;

    return (
      <div className={className}>
        <div className={styles.Section}>
          <div className={styles.DetailsContainer}>
            <div className={styles.Details}>
              <TextContainer>
                <DisplayText size="medium">{heading}</DisplayText>
                <div className={styles.Content}>{children}</div>
              </TextContainer>

              <div className={styles.Actions}>
                <Stack alignment="center">
                  {buttonFrom(action, {primary: true, size: 'large'})}
                  {secondaryActionMarkup}
                </Stack>
              </div>
            </div>
          </div>

          <div className={styles.ImageContainer}>{imageMarkup}</div>
        </div>
      </div>
    );
  }
}
