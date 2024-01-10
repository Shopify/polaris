import React from 'react';
import {CancelMinor, HorizontalDotsMinor} from '@shopify/polaris-icons';

import {useToggle} from '../../utilities/use-toggle';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import type {ActionListItemDescriptor, ComplexAction} from '../../types';
// eslint-disable-next-line import/no-deprecated
import {LegacyCard} from '../LegacyCard';
import {Button, buttonFrom} from '../Button';
import {Text} from '../Text';
import {Popover} from '../Popover';
import {ActionList} from '../ActionList';
import {ButtonGroup} from '../ButtonGroup';
import {Box} from '../Box';
import {InlineStack} from '../InlineStack';
import {BlockStack} from '../BlockStack';

import styles from './MediaCard.module.scss';

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
        <Text variant="headingSm" as="h2">
          {title}
        </Text>
      ) : (
        title
      );
    headerMarkup = <div>{headerContent}</div>;
  }

  const dismissButtonMarkup = onDismiss ? (
    <Button
      icon={CancelMinor}
      onClick={onDismiss}
      size="slim"
      accessibilityLabel={i18n.translate('Polaris.MediaCard.dismissButton')}
      variant="tertiary"
    />
  ) : null;

  const popoverActivator = (
    <InlineStack blockAlign="center">
      <Button
        icon={HorizontalDotsMinor}
        onClick={togglePopoverActive}
        size="slim"
        accessibilityLabel={i18n.translate('Polaris.MediaCard.popoverButton')}
        variant="tertiary"
      />
    </InlineStack>
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
    <div>{buttonFrom(primaryAction)}</div>
  ) : null;

  const secondaryActionMarkup = secondaryAction ? (
    <div>{buttonFrom(secondaryAction)}</div>
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
        sx={{
          position: 'absolute',
          insetInlineEnd: '500',
          zIndex: 'var(--p-z-index-2)',
        }}
      >
        <InlineStack gap="100" wrap={false}>
          {popoverActionsMarkup}
          {dismissButtonMarkup}
        </InlineStack>
      </Box>
    ) : null;

  return (
    <LegacyCard>
      <div className={mediaCardClassName}>
        <div className={mediaContainerClassName}>{children}</div>
        <div className={infoContainerClassName}>
          <Box sx={{padding: '500'}}>
            <BlockStack gap="200">
              <InlineStack wrap={false} align="space-between" gap="200">
                {headerMarkup}
                {popoverOrDismissMarkup}
              </InlineStack>
              <p className={styles.Description}>{description}</p>
              {actionMarkup}
            </BlockStack>
          </Box>
        </div>
      </div>
    </LegacyCard>
  );
}
