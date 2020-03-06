import React, {useState, useCallback} from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Action, ActionListItemDescriptor} from '../../types';

import {Card} from '../Card';
import {Button, buttonFrom} from '../Button';
import {Heading} from '../Heading';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {ButtonGroup} from '../ButtonGroup';
import {Stack} from '../Stack';

import styles from './MediaCard.scss';

interface MediaCardProps {
  /** The  */
  children: React.ReactNode;
  /** Heading content */
  title: string;
  /** Body content */
  description: string;
  /** Main call to action, rendered as a basic button */
  primaryAction: Action;
  /** Secondary call to action, rendered as a plain button */
  secondaryAction?: Action;
  /** Action list items to render in ellipsis popover */
  popoverActions?: ActionListItemDescriptor[];
  /** Whether or not card content should be laid out vertically
   * @default false
   */
  portrait?: boolean;
}

export function MediaCard({
  title,
  children,
  primaryAction,
  secondaryAction,
  description,
  popoverActions = [],
  portrait = false,
}: MediaCardProps) {
  const i18n = useI18n();
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const popoverActivator = (
    <Button
      icon={HorizontalDotsMinor}
      onClick={togglePopoverActive}
      size="slim"
      plain
      accessibilityLabel={i18n.translate('Polaris.MediaCard.popoverButton')}
    />
  );

  const popoverActionsMarkup =
    popoverActions.length > 0 ? (
      <div className={styles.Popover}>
        <Popover
          preventAutofocus
          active={popoverActive}
          activator={popoverActivator}
          onClose={togglePopoverActive}
          preferredAlignment="left"
          preferredPosition="below"
        >
          <ActionList items={popoverActions} />
        </Popover>
      </div>
    ) : null;

  const primaryActionMarkup = (
    <div className={styles.PrimaryAction}>{buttonFrom(primaryAction)}</div>
  );

  const secondaryActionMarkup = secondaryAction ? (
    <div className={styles.SecondaryAction}>
      {buttonFrom(secondaryAction, {plain: true})}
    </div>
  ) : null;

  const actionClassName = classNames(
    styles.ActionContainer,
    portrait && styles.portrait,
  );

  const actionMarkup = (
    <div className={actionClassName}>
      <ButtonGroup>
        {primaryActionMarkup}
        {secondaryActionMarkup}
      </ButtonGroup>
    </div>
  );

  const mediaCardClassName = classNames(
    styles.MediaCard,
    portrait && styles.portrait,
  );

  const mediaContainerClassName = classNames(
    styles.MediaContainer,
    portrait && styles.portrait,
  );

  const infoContainerClassName = classNames(
    styles.InfoContainer,
    portrait && styles.portrait,
  );

  return (
    <Card>
      <div className={mediaCardClassName}>
        <div className={mediaContainerClassName}>{children}</div>
        <div className={infoContainerClassName}>
          <Card.Section>
            {popoverActionsMarkup}
            <Stack vertical spacing="tight">
              <div className={styles.Heading}>
                <Heading>{title}</Heading>
              </div>
              <p className={styles.Description}>{description}</p>
              {actionMarkup}
            </Stack>
          </Card.Section>
        </div>
      </div>
    </Card>
  );
}
