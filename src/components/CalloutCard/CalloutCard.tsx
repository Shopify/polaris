import React from 'react';
import {CancelSmallMinor} from '@shopify/polaris-icons';
import {classNames} from '../../utilities/css';

import {ComplexAction} from '../../types';
import {Card} from '../Card';
import {TextContainer} from '../TextContainer';
import {ButtonGroup} from '../ButtonGroup';
import {Button, buttonFrom} from '../Button';
import {Heading} from '../Heading';
import {Image} from '../Image';

import styles from './CalloutCard.scss';

export interface CalloutCardProps {
  /** The content to display inside the callout card. */
  children?: React.ReactNode;
  /** The title of the card */
  title: string;
  /** Markup for the card header */
  header?: React.ReactNode;
  /** Markup for the card footer */
  footer?: React.ReactNode;
  /** URL to or markup for the card illustration */
  illustration: React.ReactNode;
  /** Primary action for the card */
  primaryAction: ComplexAction & {primary?: boolean};
  /** Secondary action for the card */
  secondaryAction?: ComplexAction;
  /** Callback when banner is dismissed */
  onDismiss?(): void;
}

export function CalloutCard({
  title,
  children,
  header,
  footer,
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
    typeof illustration === 'string' && styles.DefaultImage,
    onDismiss && styles.DismissImage,
  );
  const imageMarkup = (
    <div className={imageClassName}>
      {typeof illustration === 'string' ? (
        <Image alt="" source={illustration} />
      ) : (
        illustration
      )}
    </div>
  );

  const headerMarkup = header && <div className={styles.Header}>{header}</div>;
  const footerMarkup = footer && <div className={styles.Footer}>{footer}</div>;

  return (
    <Card sectioned>
      {headerMarkup}
      <div className={styles.CalloutCard}>
        {dismissButton}
        <div className={styles.Content}>
          <div className={styles.Title}>
            <Heading>{title}</Heading>
          </div>
          <TextContainer>{children}</TextContainer>
          <div className={styles.Buttons}>{buttonMarkup}</div>
        </div>
        {imageMarkup}
      </div>
      {footerMarkup}
    </Card>
  );
}
