import * as React from 'react';

import {Action} from '../types';
import Card from '../Card';
import TextContainer from '../TextContainer';
import ButtonGroup from '../ButtonGroup';
import {buttonFrom} from '../Button';
import Heading from '../Heading';
import Image from '../Image';

import * as styles from './CalloutCard.scss';

export interface Props {
  title: string | React.ReactNode,
  children?: React.ReactNode,
  illustration: string,
  primaryAction: Action,
  secondaryAction?: Action,
}

export default function CalloutCard({
  title,
  children,
  illustration,
  primaryAction,
  secondaryAction,
}: Props) {
  const primaryActionElement = buttonFrom(primaryAction);
  const secondaryActionElement = secondaryAction
    ? buttonFrom(secondaryAction, {plain: true})
    : null;

  const buttonElement = secondaryActionElement
    ? (
      <ButtonGroup>
        {primaryActionElement}
        {secondaryActionElement}
      </ButtonGroup>
    )
    : primaryActionElement;

  return (
    <Card sectioned>
      <div className={styles.CalloutCard}>
        <div className={styles.Content}>
          <Heading>{title}</Heading>
          <TextContainer>
            {children}
          </TextContainer>
          {buttonElement}
        </div>

        <div className={styles.Image}>
          <Image src={illustration} size="extraLarge" />
        </div>
      </div>
    </Card>
  );
}
