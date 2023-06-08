import React, {useState, useEffect, useMemo, useRef} from 'react';

import {useI18n} from '../../../../utilities/i18n';
import {Modal} from '../../../Modal';
import {TextField} from '../../../TextField';
import {Form} from '../../../Form';
import {FormLayout} from '../../../FormLayout';
import {HorizontalStack} from '../../../HorizontalStack';
import {Button} from '../../../Button';
import {focusFirstFocusableNode} from '../../../../utilities/focus';
import {useIsTouchDevice} from '../../../../utilities/use-is-touch-device';
import type {
  IndexFiltersPrimaryAction,
  IndexFiltersCancelAction,
} from '../../types';

interface UpdateIndexFiltersPrimaryAction
  extends Omit<IndexFiltersPrimaryAction, 'onAction'> {
  onAction: (value: string) => Promise<void>;
}

export interface UpdateButtonsProps {
  primaryAction?: UpdateIndexFiltersPrimaryAction;
  cancelAction: IndexFiltersCancelAction;
  viewNames: string[];
  disabled?: boolean;
}

const MAX_VIEW_NAME_LENGTH = 40;

export function UpdateButtons({
  primaryAction,
  cancelAction,
  viewNames,
  disabled,
}: UpdateButtonsProps) {
  const i18n = useI18n();
  const [savedViewName, setSavedViewName] = useState('');
  const [savedViewModalOpen, setSavedViewModalOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    if (!container.current || isTouchDevice) return;
    if (savedViewModalOpen) {
      focusFirstFocusableNode(container.current);
    }
  }, [savedViewModalOpen, isTouchDevice]);

  async function handleClickSaveButton() {
    if (primaryAction?.type === 'save-as') {
      handleOpenModal();
    } else {
      await primaryAction?.onAction('');
    }
  }

  function handleOpenModal() {
    setSavedViewModalOpen(true);
  }

  function handleCloseModal() {
    setSavedViewModalOpen(false);
  }

  function handleChange(value: string) {
    setSavedViewName(value);
  }

  async function handlePrimaryAction() {
    if (isPrimaryActionDisabled) return;
    await primaryAction?.onAction(savedViewName);
    handleCloseModal();
  }

  const buttonText = useMemo(() => {
    switch (primaryAction?.type) {
      case 'save':
        return i18n.translate('Polaris.IndexFilters.UpdateButtons.save');
      case 'save-as':
      default:
        return i18n.translate('Polaris.IndexFilters.UpdateButtons.saveAs');
    }
  }, [primaryAction?.type, i18n]);

  const saveButton = (
    <Button
      size="micro"
      onClick={handleClickSaveButton}
      disabled={primaryAction?.disabled || disabled}
    >
      {buttonText}
    </Button>
  );

  const hasSameNameError = viewNames.some(
    (name) => name.trim().toLowerCase() === savedViewName.trim().toLowerCase(),
  );
  const isPrimaryActionDisabled =
    hasSameNameError ||
    !savedViewName ||
    primaryAction?.loading ||
    savedViewName.length > MAX_VIEW_NAME_LENGTH;

  const cancelButtonMarkup = (
    <Button
      primary
      plain
      size="micro"
      onClick={cancelAction.onAction}
      disabled={disabled}
    >
      {i18n.translate('Polaris.IndexFilters.UpdateButtons.cancel')}
    </Button>
  );

  if (!primaryAction) {
    return cancelButtonMarkup;
  }

  return (
    <HorizontalStack align="start" blockAlign="center" gap="2">
      {cancelButtonMarkup}
      {primaryAction.type === 'save-as' ? (
        <Modal
          activator={<HorizontalStack>{saveButton}</HorizontalStack>}
          open={savedViewModalOpen}
          title={i18n.translate(
            'Polaris.IndexFilters.UpdateButtons.modal.title',
          )}
          onClose={handleCloseModal}
          primaryAction={{
            onAction: handlePrimaryAction,
            content: i18n.translate(
              'Polaris.IndexFilters.UpdateButtons.modal.save',
            ),
            disabled: isPrimaryActionDisabled,
          }}
          secondaryActions={[
            {
              onAction: handleCloseModal,
              content: i18n.translate(
                'Polaris.IndexFilters.UpdateButtons.modal.cancel',
              ),
            },
          ]}
        >
          <Modal.Section>
            <Form onSubmit={handlePrimaryAction}>
              <FormLayout>
                <div ref={container}>
                  <TextField
                    label={i18n.translate(
                      'Polaris.IndexFilters.UpdateButtons.modal.label',
                    )}
                    value={savedViewName}
                    onChange={handleChange}
                    autoComplete="off"
                    maxLength={MAX_VIEW_NAME_LENGTH}
                    showCharacterCount
                    error={
                      hasSameNameError
                        ? i18n.translate(
                            'Polaris.IndexFilters.UpdateButtons.modal.sameName',
                            {
                              name: savedViewName,
                            },
                          )
                        : undefined
                    }
                  />
                </div>
              </FormLayout>
            </Form>
          </Modal.Section>
        </Modal>
      ) : (
        saveButton
      )}
    </HorizontalStack>
  );
}
