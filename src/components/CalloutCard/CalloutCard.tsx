import * as React from 'react';

import Card from '../Card';
import TypeContainer from '../TypeContainer';
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
import Heading from '../Heading';
import Image from '../Image';

import * as styles from './CalloutCard.scss';

export interface Action {
  text: string,
  to: string,
}

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
  const primaryActionElement = <Button to={primaryAction.to}>{primaryAction.text}</Button>;
  const secondaryActionElement = secondaryAction
    ? <Button plain to={secondaryAction.to}>{secondaryAction.text}</Button>
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
          <TypeContainer>
            {children}
          </TypeContainer>
          {buttonElement}
        </div>

        <div className={styles.Image}>
          <Image src={illustration} size="extraLarge" />
        </div>
      </div>
    </Card>
  );
}
