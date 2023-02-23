import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import type {Action} from '../../types';
import {LegacyCard} from '../LegacyCard';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../TextContainer';
import {ButtonGroup} from '../ButtonGroup';
import {Button, buttonFrom} from '../Button';
import {Text} from '../Text';
import {Image} from '../Image';

import styles from './CalloutCard.scss';

export interface CalloutCardProps {
  /** The content to display inside the callout card. */
  children?: React.ReactNode;
  /** The title of the card */
  title: React.ReactNode;
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
    <LegacyCard>
      <div className={containerClassName}>
        {dismissButton}
        <LegacyCard.Section>
          <div className={styles.CalloutCard}>
            <div className={styles.Content}>
              <div className={styles.Title}>
                <Text variant="headingMd" as="h2">
                  {title}
                </Text>
              </div>
              <TextContainer>{children}</TextContainer>
              <div className={styles.Buttons}>{buttonMarkup}</div>
            </div>

            <Image alt="" className={imageClassName} source={illustration} />
          </div>
        </LegacyCard.Section>
      </div>
    </LegacyCard>
  );
}
