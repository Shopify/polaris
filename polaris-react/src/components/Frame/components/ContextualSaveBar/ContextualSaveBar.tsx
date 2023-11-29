import React from 'react';
import {DisputeMinor} from '@shopify/polaris-icons';

import {Button} from '../../../Button';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../../../LegacyStack';
import {Text} from '../../../Text';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import type {ContextualSaveBarProps} from '../../../../utilities/frame';
import {useI18n} from '../../../../utilities/i18n';
import {ShadowBevel} from '../../../ShadowBevel';

import styles from './ContextualSaveBar.scss';

export function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  fullWidth,
  secondaryMenu,
  leaveConfirmation = false,
}: ContextualSaveBarProps) {
  const i18n = useI18n();

  const discardActionContent =
    discardAction && discardAction.content
      ? discardAction.content
      : i18n.translate('Polaris.ContextualSaveBar.discard');

  const discardActionMarkup = discardAction && (
    <Button
      variant="tertiary"
      size="large"
      url={discardAction.url}
      onClick={discardAction?.onAction}
      loading={discardAction.loading}
      disabled={discardAction.disabled}
      accessibilityLabel={discardAction.content}
    >
      {discardActionContent}
    </Button>
  );

  const saveActionContent =
    saveAction && saveAction.content
      ? saveAction.content
      : i18n.translate('Polaris.ContextualSaveBar.save');

  const saveActionMarkup = saveAction && (
    <Button
      variant="primary"
      tone="success"
      size="large"
      url={saveAction.url}
      onClick={saveAction.onAction}
      loading={saveAction.loading}
      disabled={saveAction.disabled}
      accessibilityLabel={saveAction.content}
    >
      {saveActionContent}
    </Button>
  );

  const contentsClassName = classNames(
    styles.Contents,
    fullWidth && styles.fullWidth,
  );

  return (
    <div className={classNames(leaveConfirmation && styles.Shake)}>
      <ShadowBevel boxShadow="400" borderRadius="400">
        <div
          className={classNames(
            styles.ContextualSaveBar,
            leaveConfirmation && styles.GreenBar,
          )}
        >
          <div className={contentsClassName}>
            <div className={styles.MessageContainer}>
              <Icon source={DisputeMinor} />
              {message && (
                <Text as="h2" variant="headingMd" tone="text-inverse" truncate>
                  {message}
                </Text>
              )}
            </div>
            <div className={styles.ActionContainer}>
              <LegacyStack spacing="tight" wrap={false}>
                {secondaryMenu}
                {discardActionMarkup}
                {saveActionMarkup}
              </LegacyStack>
            </div>
          </div>
        </div>
      </ShadowBevel>
    </div>
  );
}
