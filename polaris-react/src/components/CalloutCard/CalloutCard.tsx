import React from 'react';
import {XIcon} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import type {IconableAction} from '../../types';
// eslint-disable-next-line import/no-deprecated
import {LegacyCard} from '../LegacyCard';
import {BlockStack} from '../BlockStack';
import {ButtonGroup} from '../ButtonGroup';
import {Button, buttonFrom} from '../Button';
import type {ButtonProps} from '../Button';
import {Text} from '../Text';
import {Image} from '../Image';

import styles from './CalloutCard.module.css';

export interface CalloutCardProps {
  /** The content to display inside the callout card. */
  children?: React.ReactNode;
  /** The title of the card */
  title: React.ReactNode;
  /** URL to the card illustration */
  illustration: string;
  /** Primary action for the card */
  primaryAction: IconableAction;
  /** Secondary action for the card */
  secondaryAction?: IconableAction & Pick<ButtonProps, 'variant'>;
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
  const i18n = useI18n();
  const primaryActionMarkup = buttonFrom(primaryAction);
  const secondaryActionMarkup = secondaryAction
    ? buttonFrom(secondaryAction, {
        variant: secondaryAction.variant ?? 'tertiary',
      })
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
        variant="tertiary"
        icon={XIcon}
        onClick={onDismiss}
        accessibilityLabel={i18n.translate('Polaris.Banner.dismissButton')}
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
                <Text variant="headingSm" as="h2">
                  {title}
                </Text>
              </div>
              <Text as="span" variant="bodyMd">
                <BlockStack>{children}</BlockStack>
              </Text>
              <div className={styles.Buttons}>{buttonMarkup}</div>
            </div>

            <Image alt="" className={imageClassName} source={illustration} />
          </div>
        </LegacyCard.Section>
      </div>
    </LegacyCard>
  );
}
