import React, {useCallback} from 'react';
import {AlertTriangleIcon} from '@shopify/polaris-icons';

import {Button} from '../../../Button';
import {Image} from '../../../Image';
// eslint-disable-next-line import/no-deprecated
import {LegacyStack} from '../../../LegacyStack';
import {Text} from '../../../Text';
import {Icon} from '../../../Icon';
import {classNames} from '../../../../utilities/css';
import {useFrame} from '../../../../utilities/frame';
import type {ContextualSaveBarProps} from '../../../../utilities/frame';
import {getWidth} from '../../../../utilities/get-width';
import {useI18n} from '../../../../utilities/i18n';
import {useToggle} from '../../../../utilities/use-toggle';

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
            <LegacyStack spacing="tight" wrap={false}>
              {secondaryMenu}
              {discardActionMarkup}
              {saveActionMarkup}
            </LegacyStack>
          </div>
        </div>
      </div>
      {discardConfirmationModalMarkup}
    </>
  );
}
