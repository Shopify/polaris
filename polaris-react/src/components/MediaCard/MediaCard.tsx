import React from 'react';
import {HorizontalDotsMinor} from '@shopify/polaris-icons';

import {useToggle} from '../../utilities/use-toggle';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import type {ActionListItemDescriptor, ComplexAction} from '../../types';
import {Card} from 'components';
import {Button, buttonFrom} from '../Button';
import {Heading} from '../Heading';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {ButtonGroup} from '../ButtonGroup';
import {Stack} from '../Stack';

import styles from './MediaCard.scss';

type Size = 'small' | 'medium';

interface MediaCardProps {
  /** The visual media to display in the card */
  children: React.ReactNode;
  /** Heading content */
  title: React.ReactNode;
  /** Body content */
  description: string;
  /** Main call to action, rendered as a basic button */
  primaryAction?: ComplexAction;
  /** Secondary call to action, rendered as a plain button */
  secondaryAction?: ComplexAction;
  /** Action list items to render in ellipsis popover */
  popoverActions?: ActionListItemDescriptor[];
  /** Whether or not card content should be laid out vertically
   * @default false
   */
  portrait?: boolean;
  /** Size of the visual media in the card
   * @default 'medium'
   */
  size?: Size;
}

export function MediaCard({
  title,
  children,
  primaryAction,
  secondaryAction,
  description,
  popoverActions = [],
  portrait = false,
  size = 'medium',
}: MediaCardProps) {
  const i18n = useI18n();
  const {value: popoverActive, toggle: togglePopoverActive} = useToggle(false);

  let headerMarkup = null;
  if (title) {
    const headerContent =
      typeof title === 'string' ? <Heading>{title}</Heading> : title;
    headerMarkup = <div className={styles.Heading}>{headerContent}</div>;
  }

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
          active={popoverActive}
          activator={popoverActivator}
          onClose={togglePopoverActive}
          preferredAlignment="left"
          preferredPosition="below"
        >
          <ActionList
            items={popoverActions}
            onActionAnyItem={togglePopoverActive}
          />
        </Popover>
      </div>
    ) : null;

  const primaryActionMarkup = primaryAction ? (
    <div className={styles.PrimaryAction}>{buttonFrom(primaryAction)}</div>
  ) : null;

  const secondaryActionMarkup = secondaryAction ? (
    <div className={styles.SecondaryAction}>
      {buttonFrom(secondaryAction, {plain: true})}
    </div>
  ) : null;

  const actionClassName = classNames(
    styles.ActionContainer,
    portrait && styles.portrait,
  );

  const actionMarkup =
    primaryActionMarkup || secondaryActionMarkup ? (
      <div className={actionClassName}>
        <ButtonGroup>
          {primaryActionMarkup}
          {secondaryActionMarkup}
        </ButtonGroup>
      </div>
    ) : null;

  const mediaCardClassName = classNames(
    styles.MediaCard,
    portrait && styles.portrait,
  );

  const mediaContainerClassName = classNames(
    styles.MediaContainer,
    portrait && styles.portrait,
    size === 'small' && styles.sizeSmall,
  );

  const infoContainerClassName = classNames(
    styles.InfoContainer,
    portrait && styles.portrait,
    size === 'small' && styles.sizeSmall,
  );

  return (
    <Card>
      <div className={mediaCardClassName}>
        <div className={mediaContainerClassName}>{children}</div>
        <div className={infoContainerClassName}>
          <Card.Section>
            {popoverActionsMarkup}
            <Stack vertical spacing="tight">
              {headerMarkup}
              <p className={styles.Description}>{description}</p>
              {actionMarkup}
            </Stack>
          </Card.Section>
        </div>
      </div>
    </Card>
  );
}
