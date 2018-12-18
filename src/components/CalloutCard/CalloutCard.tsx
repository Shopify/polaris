import * as React from 'react';

import {classNames} from '@shopify/react-utilities';

import {Action} from '../../types';
import Card from '../Card';
import TextContainer from '../TextContainer';
import ButtonGroup from '../ButtonGroup';
import Button, {buttonFrom} from '../Button';
import Heading from '../Heading';
import Image from '../Image';

import * as styles from './CalloutCard.scss';

export interface Props {
  /** The content to display inside the callout card. */
  children?: React.ReactNode;
  /** The title of the card */
  title: string;
  /** URL to the card illustration */
  illustration: string;
  /** Primary action for the card */
  primaryAction: Action;
  /** Secondary action for the card */
  secondaryAction?: Action;
  /** Callback when banner is dismissed */
  onDismiss?(): void;
}

export default function CalloutCard({
  title,
  children,
  illustration,
  primaryAction,
  secondaryAction,
  onDismiss,
}: Props) {
  const primaryActionMarkup = buttonFrom(primaryAction);
  const secondaryActionMarkup = secondaryAction
    ? buttonFrom(secondaryAction, {plain: true})
    : null;

  const buttonMarkup = secondaryActionMarkup ? (
    <ButtonGroup>
      {primaryActionMarkup}
      {secondaryActionMarkup}
    </ButtonGroup>
  ) : (
    primaryActionMarkup
  );

  const dismissButton = onDismiss ? (
    <div className={styles.Dismiss}>
      <Button
        plain
        icon="cancelSmall"
        onClick={onDismiss}
        accessibilityLabel="Dismiss card"
      />
    </div>
  ) : null;

  const imageClassName = classNames(
    styles.Image,
    onDismiss && styles.DismissImage,
  );

  return (
    <Card>
      <div className={styles.Container}>
        {dismissButton}
        <Card.Section>
          <div className={styles.CalloutCard}>
            <div className={styles.Content}>
              <div className={styles.Title}>
                <Heading>{title}</Heading>
              </div>
              <TextContainer>{children}</TextContainer>
              <div className={styles.Buttons}>{buttonMarkup}</div>
            </div>

            <Image alt="" className={imageClassName} source={illustration} />
          </div>
        </Card.Section>
      </div>
    </Card>
  );
}
