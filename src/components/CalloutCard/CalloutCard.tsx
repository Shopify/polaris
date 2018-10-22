import * as React from 'react';
import {Action} from 'types';
import {
  Card,
  TextContainer,
  ButtonGroup,
  buttonFrom,
  Heading,
  Image,
} from 'components';
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

  const buttonMarkup = secondaryActionMarkup ? (
    <ButtonGroup>
      {primaryActionMarkup}
      {secondaryActionMarkup}
    </ButtonGroup>
  ) : (
    primaryActionMarkup
  );

  return (
    <Card sectioned>
      <div className={styles.CalloutCard}>
        <div className={styles.Content}>
          <div className={styles.Title}>
            <Heading>{title}</Heading>
          </div>
          <TextContainer>{children}</TextContainer>
          <div className={styles.Buttons}>{buttonMarkup}</div>
        </div>

        <Image alt="" className={styles.Image} source={illustration} />
      </div>
    </Card>
  );
}
