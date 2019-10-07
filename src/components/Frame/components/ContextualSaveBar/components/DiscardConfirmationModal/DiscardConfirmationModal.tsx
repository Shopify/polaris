import React from 'react';

import {useI18n} from '../../../../../../utilities/i18n';
import {Modal} from '../../../../../Modal';

export interface DiscardConfirmationModalProps {
  open: boolean;
  onDiscard(): void;
  onCancel(): void;
}

export function DiscardConfirmationModal({
  open,
  onDiscard,
  onCancel,
}: DiscardConfirmationModalProps) {
  const i18n = useI18n();

  return (
    <Modal
      title={i18n.translate('Polaris.DiscardConfirmationModal.title')}
      open={open}
      onClose={onCancel}
      primaryAction={{
        content: i18n.translate(
          'Polaris.DiscardConfirmationModal.primaryAction',
        ),
        destructive: true,
        onAction: onDiscard,
      }}
      secondaryActions={[
        {
          content: i18n.translate(
            'Polaris.DiscardConfirmationModal.secondaryAction',
          ),
          onAction: onCancel,
        },
      ]}
      sectioned
    >
      {i18n.translate('Polaris.DiscardConfirmationModal.message')}
    </Modal>
  );
}
