import React, {useState, useCallback, useRef, useEffect} from 'react';

import {useIsTouchDevice} from '../../../../utilities/use-is-touch-device';
import {useI18n} from '../../../../utilities/i18n';
import {focusFirstFocusableNode} from '../../../../utilities/focus';
import type {ModalProps} from '../../../Modal';
import {Modal} from '../../../Modal';
import {TextField} from '../../../TextField';
import {Form} from '../../../Form';
import {FormLayout} from '../../../FormLayout';

export interface CreateViewModalProps {
  open: boolean;
  onClose: () => void;
  onClickPrimaryAction: (value: string) => Promise<boolean>;
  onClickSecondaryAction?: () => void;
  activator: ModalProps['activator'];
  viewNames: string[];
}

const MAX_VIEW_NAME_LENGTH = 40;

export function CreateViewModal({
  activator,
  open,
  onClose,
  onClickPrimaryAction,
  onClickSecondaryAction,
  viewNames,
}: CreateViewModalProps) {
  const i18n = useI18n();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const isTouchDevice = useIsTouchDevice();
  const hasSameNameError = viewNames.some(
    (viewName) => viewName.trim().toLowerCase() === value.trim().toLowerCase(),
  );
  const isPrimaryActionDisabled =
    !value ||
    hasSameNameError ||
    loading ||
    value.length > MAX_VIEW_NAME_LENGTH;

  useEffect(() => {
    if (!container.current || isTouchDevice) return;
    if (open) {
      focusFirstFocusableNode(container.current);
      const timeout = setTimeout(() => {
        if (!container.current) return;
        focusFirstFocusableNode(container.current);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [open, isTouchDevice]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  async function handlePrimaryAction() {
    if (hasSameNameError || isPrimaryActionDisabled) {
      return;
    }
    setLoading(true);
    await onClickPrimaryAction(value);
    setLoading(false);
    setValue('');
    onClose();
  }
  function handleSecondaryAction() {
    onClickSecondaryAction?.();
    setValue('');
    onClose();
  }

  return (
    <Modal
      activator={activator}
      open={open}
      onClose={onClose}
      title={i18n.translate('Polaris.Tabs.CreateViewModal.title')}
      primaryAction={{
        content: i18n.translate('Polaris.Tabs.CreateViewModal.create'),
        onAction: handlePrimaryAction,
        disabled: isPrimaryActionDisabled,
      }}
      secondaryActions={[
        {
          content: i18n.translate('Polaris.Tabs.CreateViewModal.cancel'),
          onAction: handleSecondaryAction,
        },
      ]}
    >
      <Modal.Section>
        <Form onSubmit={handlePrimaryAction}>
          <FormLayout>
            <div ref={container}>
              <TextField
                label={i18n.translate('Polaris.Tabs.CreateViewModal.label')}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                maxLength={MAX_VIEW_NAME_LENGTH}
                showCharacterCount
                // error={
                //   hasSameNameError
                //     ? i18n.translate(
                //         'Polaris.Tabs.CreateViewModal.errors.sameName',
                //         {name: value},
                //       )
                //     : undefined
                // }
              />
            </div>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
