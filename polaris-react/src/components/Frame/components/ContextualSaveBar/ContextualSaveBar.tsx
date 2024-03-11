import React, {useCallback} from 'react';
import {AlertTriangleIcon} from '@shopify/polaris-icons';

import {Button} from '../../../Button';
import {Image} from '../../../Image';
import {InlineStack} from '../../../InlineStack';
import {Text} from '../../../Text';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import type {
  ContextualSaveBarProps,
  ContextualSaveBarAction,
} from '../../../../utilities/frame';
import {useFrame} from '../../../../utilities/frame';
import {getWidth} from '../../../../utilities/get-width';
import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';
import {isInterface} from '../../../../utilities/is-interface';

import {DiscardConfirmationModal} from './components';
import styles from './ContextualSaveBar.module.scss';

export function ContextualSaveBar({
  alignContentFlush,
  message,
  saveAction,
  discardAction,
  fullWidth,
  contextControl,
  secondaryMenu,
}: ContextualSaveBarProps) {
  const i18n = useI18n();
  const {logo} = useFrame();
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
      size="large"
      url={discardAction.url}
      onClick={discardActionHandler}
      loading={discardAction.loading}
      disabled={discardAction.disabled}
      accessibilityLabel={discardAction.content}
    >
      {discardActionContent}
    </Button>
  );

  let saveActionMarkup;

  const saveActionContent =
    saveAction && 'content' in saveAction
      ? saveAction.content
      : i18n.translate('Polaris.ContextualSaveBar.save');

  if (saveAction && isInterface(saveAction)) {
    const {url, loading, disabled, onAction} =
      saveAction as ContextualSaveBarAction;

    saveActionMarkup = (
      <Button
        variant="primary"
        tone="success"
        size="large"
        onClick={onAction}
        url={url}
        loading={loading}
        disabled={disabled}
        accessibilityLabel={saveActionContent}
      >
        {saveActionContent}
      </Button>
    );
  } else {
    saveActionMarkup = saveAction;
  }

  const width = getWidth(logo, 104);

  const imageMarkup = logo && (
    <Image style={{width}} source={logo.contextualSaveBarSource || ''} alt="" />
  );

  const logoMarkup =
    alignContentFlush || contextControl ? null : (
      <div className={styles.LogoContainer} style={{width}}>
        {imageMarkup}
      </div>
    );

  const contextControlMarkup = contextControl ? (
    <div className={styles.ContextControl}>{contextControl}</div>
  ) : null;

  const contentsClassName = classNames(
    styles.Contents,
    fullWidth && styles.fullWidth,
  );

  return (
    <>
      <div className={styles.ContextualSaveBar}>
        {contextControlMarkup}
        {logoMarkup}
        <div className={contentsClassName}>
          <div className={styles.MessageContainer}>
            <Icon source={AlertTriangleIcon} />
            {message && (
              <Text as="h2" variant="headingMd" tone="text-inverse" truncate>
                {message}
              </Text>
            )}
          </div>
          <div className={styles.ActionContainer}>
            <InlineStack gap="200" wrap={false}>
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
