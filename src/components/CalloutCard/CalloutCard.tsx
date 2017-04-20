import * as React from 'react';

import {Action} from '../../types';
import Card from '../Card';
import TextContainer from '../TextContainer';
import ButtonGroup from '../ButtonGroup';
import {buttonFrom} from '../Button';
import Heading from '../Heading';
import Image from '../Image';

import * as styles from './CalloutCard.scss';

export interface Props {
  title: string,
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
  const primaryActionMarkup = buttonFrom(primaryAction);
  const secondaryActionMarkup = secondaryAction
    ? buttonFrom(secondaryAction, {plain: true})
    : null;

  const buttonMarkup = secondaryActionMarkup
    ? (
      <div className={styles.Buttons}>
        <ButtonGroup>
          {primaryActionMarkup}
          {secondaryActionMarkup}
        </ButtonGroup>
      </div>
    )
    : primaryActionMarkup;

  return (
    <Card sectioned>
      <div className={styles.CalloutCard}>
        <div className={styles.Content}>
          <div className={styles.Title}>
            <Heading>{title}</Heading>
          </div>
          <TextContainer>
            {children}
          </TextContainer>
          {buttonMarkup}
        </div>

        <Image alt="" className={styles.Image} source={illustration} />
      </div>
    </Card>
  );
}
