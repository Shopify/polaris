import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {Action} from '../../types';
import Image from '../Image';
import {buttonFrom} from '../Button';
import ButtonGroup from '../ButtonGroup';
import TextContainer from '../TextContainer';
import DisplayText from '../DisplayText';

import * as styles from './EmptyState.scss';

export interface Props {
  image: string,
  largeImage?: string,
  imageContained?: boolean,
  heading?: string,
  children?: React.ReactNode,
  action: Action,
  secondaryAction?: Action,
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

    const imageMarkup = largeImage
      ? (
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
      )
      : <Image role="presentation" alt="" className={styles.Image} source={image} />;

    const secondaryActionMarkup = secondaryAction
      ? buttonFrom(secondaryAction, {plain: true})
      : null;

    return (
      <div className={className}>
        <div className={styles.Section}>
          <div className={styles.Details}>
            <div className={styles.DetailContent}>
              <TextContainer className>
                <DisplayText size="medium">{heading}</DisplayText>
                {children}
              </TextContainer>

              <div className={styles.Actions}>
                <ButtonGroup>
                  {buttonFrom(action, {primary: true, size: 'large'})}
                  {secondaryActionMarkup}
                </ButtonGroup>
              </div>
            </div>
          </div>

          <div className={styles.ImageContainer}>
            {imageMarkup}
          </div>
        </div>
      </div>
    );
  }
}
