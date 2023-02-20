import React, {useState, useCallback, useRef, useEffect} from 'react';

import {useI18n} from '../../../../../../utilities/i18n';
import {focusFirstFocusableNode} from '../../../../../../utilities/focus';
import {Modal} from '../../../../../Modal';
import {TextField} from '../../../../../TextField';
import {Form} from '../../../../../Form';
import {FormLayout} from '../../../../../FormLayout';

export interface RenameViewModalProps {
  open: boolean;
  isModalLoading?: boolean;
  name: string;
  helpText?: string;
  viewNames?: string[];
  onClose: () => void;
  onPrimaryAction: (value: string) => Promise<void>;
  onSecondaryAction?: () => void;
}

export function RenameViewModal({
  open,
  isModalLoading,
  name,
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  helpText,
  viewNames,
}: RenameViewModalProps) {
  const i18n = useI18n();
  const [value, setValue] = useState(name);
  const container = useRef<HTMLDivElement>(null);
  const hasSameNameError = viewNames
    ?.filter((viewName) => viewName !== name)
    .some(
      (viewName) =>
        viewName.trim().toLowerCase() === value.trim().toLowerCase(),
    );
  const isPrimaryActionDisabled =
    isModalLoading || hasSameNameError || value === name || !value;
  useEffect(() => {
    if (!container.current) return;
    if (open) {
      focusFirstFocusableNode(container.current);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setValue(name);
    }
  }, [name, open]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  async function handlePrimaryAction() {
    if (isPrimaryActionDisabled) {
      return;
    }
    await onPrimaryAction(value);
    setValue('');
    onClose();
  }
  function handleSecondaryAction() {
    onSecondaryAction?.();
    setValue(name);
    onClose();
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={i18n.translate('Polaris.Tabs.RenameViewModal.title')}
      primaryAction={{
        content: i18n.translate('Polaris.Tabs.RenameViewModal.create'),
        onAction: handlePrimaryAction,
        disabled: isPrimaryActionDisabled,
      }}
      secondaryActions={[
        {
          content: i18n.translate('Polaris.Tabs.RenameViewModal.cancel'),
          onAction: handleSecondaryAction,
        },
      ]}
      instant
    >
      <Modal.Section>
        <Form onSubmit={handlePrimaryAction}>
          <FormLayout>
            <div ref={container}>
              <TextField
                label={i18n.translate('Polaris.Tabs.RenameViewModal.label')}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                helpText={helpText}
                maxLength={40}
                showCharacterCount
                error={
                  hasSameNameError
                    ? i18n.translate(
                        'Polaris.Tabs.RenameViewModal.errors.sameName',
                        {name: value},
                      )
                    : undefined
                }
              />
            </div>
          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}
