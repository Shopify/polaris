import React from 'react';
import {CancelMinor, HorizontalDotsMinor} from '@shopify/polaris-icons';

import {useToggle} from '../../utilities/use-toggle';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import type {ActionListItemDescriptor, ComplexAction} from '../../types';
import {LegacyCard} from '../LegacyCard';
import {Button, buttonFrom} from '../Button';
import {Text} from '../Text';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {ButtonGroup} from '../ButtonGroup';
import {LegacyStack} from '../LegacyStack';
import {Box} from '../Box';
import {HorizontalStack} from '../HorizontalStack';

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
  /** Callback when MediaCard is dismissed */
  onDismiss?: () => void;
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
  onDismiss,
}: MediaCardProps) {
  const i18n = useI18n();
  const {value: popoverActive, toggle: togglePopoverActive} = useToggle(false);

  let headerMarkup = null;
  if (title) {
    const headerContent =
      typeof title === 'string' ? (
        <Text variant="headingMd" as="h2">
          {title}
        </Text>
      ) : (
        title
      );
    headerMarkup = <div className={styles.Heading}>{headerContent}</div>;
  }

  const dismissButtonMarkup = onDismiss ? (
    <Button
      icon={CancelMinor}
      onClick={onDismiss}
      size="slim"
      plain
      accessibilityLabel={i18n.translate('Polaris.MediaCard.dismissButton')}
    />
  ) : null;

  const popoverActivator = (
    <HorizontalStack blockAlign="center">
      <Button
        icon={HorizontalDotsMinor}
        onClick={togglePopoverActive}
        size="slim"
        plain
        accessibilityLabel={i18n.translate('Polaris.MediaCard.popoverButton')}
      />
    </HorizontalStack>
  );

  const popoverActionsMarkup =
    popoverActions.length > 0 ? (
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

  const popoverOrDismissMarkup =
    popoverActionsMarkup || dismissButtonMarkup ? (
      <Box
        position="absolute"
        insetBlockStart="4"
        insetInlineEnd="5"
        zIndex="var(--p-z-index-2)"
      >
        <HorizontalStack gap="1">
          {popoverActionsMarkup}
          {dismissButtonMarkup}
        </HorizontalStack>
      </Box>
    ) : null;

  return (
    <LegacyCard>
      <div className={mediaCardClassName}>
        <div className={mediaContainerClassName}>{children}</div>
        <div className={infoContainerClassName}>
          <LegacyCard.Section>
            {popoverOrDismissMarkup}
            <LegacyStack vertical spacing="tight">
              {headerMarkup}
              <p className={styles.Description}>{description}</p>
              {actionMarkup}
            </LegacyStack>
          </LegacyCard.Section>
        </div>
      </div>
    </LegacyCard>
  );
}
