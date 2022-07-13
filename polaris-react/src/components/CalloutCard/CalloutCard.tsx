import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import type {Action} from '../../types';
import {Card} from '../Card';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../TextContainer';
import {ButtonGroup} from '../ButtonGroup';
import {Button, buttonFrom} from '../Button';
// eslint-disable-next-line import/no-deprecated
import {Heading} from '../Heading';
import {Image} from '../Image';

import styles from './CalloutCard.scss';

export interface CalloutCardProps {
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

export function CalloutCard({
  title,
  children,
  illustration,
  primaryAction,
  secondaryAction,
  onDismiss,
}: CalloutCardProps) {
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
        icon={CancelSmallMinor}
        onClick={onDismiss}
        accessibilityLabel="Dismiss card"
      />
    </div>
  ) : null;

  const imageClassName = classNames(
    styles.Image,
    onDismiss && styles.DismissImage,
  );

  const containerClassName = classNames(
    styles.Container,
    onDismiss && styles.hasDismiss,
  );

  return (
    <Card>
      <div className={containerClassName}>
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
