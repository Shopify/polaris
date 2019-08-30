import React from 'react';

import {useI18n} from '../../../../../../utilities/i18n';
import Modal from '../../../../../Modal';

export interface Props {
  open: boolean;
  onDiscard(): void;
  onCancel(): void;
}

export default function DiscardConfirmationModal({
  open,
  onDiscard,
  onCancel,
}: Props) {
  const intl = useI18n();

  return (
    <Modal
      title={intl.translate('Polaris.DiscardConfirmationModal.title')}
      open={open}
      onClose={onCancel}
      primaryAction={{
        content: intl.translate(
          'Polaris.DiscardConfirmationModal.primaryAction',
        ),
        destructive: true,
        onAction: onDiscard,
      }}
      secondaryActions={[
        {
          content: intl.translate(
            'Polaris.DiscardConfirmationModal.secondaryAction',
          ),
          onAction: onCancel,
        },
      ]}
      sectioned
    >
      {intl.translate('Polaris.DiscardConfirmationModal.message')}
    </Modal>
  );
}
