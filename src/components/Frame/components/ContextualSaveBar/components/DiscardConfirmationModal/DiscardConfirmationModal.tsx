import * as React from 'react';

import {
  Modal,
  withAppProvider,
  WithAppProviderProps,
} from '../../../../../../components';

export interface Props {
  open: boolean;
  onDiscard(): void;
  onCancel(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

function DiscardConfirmationModal({
  open,
  onDiscard,
  onCancel,
  polaris: {intl},
}: CombinedProps) {
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

export default withAppProvider<Props>()(DiscardConfirmationModal);
