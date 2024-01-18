import React, {useCallback} from 'react';
import {AlertBubbleIcon} from '@shopify/polaris-icons';

import {Button} from '../../../Button';
import {Text} from '../../../Text';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import type {ContextualSaveBarProps} from '../../../../utilities/frame';
import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {InlineStack} from '../../../InlineStack';

import {DiscardConfirmationModal} from './components';
import styles from './ContextualSaveBar.module.scss';

export function ContextualSaveBar({
  message,
  saveAction,
  discardAction,
  fullWidth,
  secondaryMenu,
}: ContextualSaveBarProps) {
  const i18n = useI18n();
  const {
    value: discardConfirmationModalVisible,
    toggle: toggleDiscardConfirmationModal,
    setFalse: closeDiscardConfirmationModal,
  } = useToggle(false);

  const handleDiscardAction = useCallback(() => {
    if (discardAction && discardAction.onAction) {
      discardAction.onAction();
    }
    closeDiscardConfirmationModal();
  }, [closeDiscardConfirmationModal, discardAction]);

  const discardActionContent =
    discardAction && discardAction.content
      ? discardAction.content
      : i18n.translate('Polaris.ContextualSaveBar.discard');

  let discardActionHandler;
  if (discardAction && discardAction.discardConfirmationModal) {
    discardActionHandler = toggleDiscardConfirmationModal;
  } else if (discardAction) {
    discardActionHandler = discardAction.onAction;
  }

  const discardConfirmationModalMarkup = discardAction &&
    discardAction.onAction &&
    discardAction.discardConfirmationModal && (
      <DiscardConfirmationModal
        open={discardConfirmationModalVisible}
        onCancel={toggleDiscardConfirmationModal}
        onDiscard={handleDiscardAction}
      />
    );

  const discardActionMarkup = discardAction && (
    <Button
      variant="tertiary"
      size="slim"
      url={discardAction.url}
      onClick={discardActionHandler}
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
      size="slim"
      variant="primary"
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
    <>
      <div className={styles.ContextualSaveBar}>
        <div className={contentsClassName}>
          <div className={styles.MessageContainer}>
            <Icon source={AlertBubbleIcon} />
            {message && (
              <Text as="h2" variant="bodySm" tone="text-inverse" truncate>
                {message}
              </Text>
            )}
          </div>
          <div className={styles.ActionContainer}>
            <InlineStack gap="100" wrap={false}>
              {secondaryMenu}
              {discardActionMarkup}
              {saveActionMarkup}
            </InlineStack>
          </div>
        </div>
      </div>
      {discardConfirmationModalMarkup}
    </>
  );
}
