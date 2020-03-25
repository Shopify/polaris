import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {Modal} from 'components';

import {DiscardConfirmationModal} from '../DiscardConfirmationModal';

describe('<DiscardConfirmationModal />', () => {
  it('passes its open prop value to the Modal', () => {
    const discardConfirmationModalOpen = mountWithAppProvider(
      <DiscardConfirmationModal open onDiscard={noop} onCancel={noop} />,
    );
    expect(discardConfirmationModalOpen.find(Modal).prop('open')).toBe(true);

    const discardConfirmationModalClosed = mountWithAppProvider(
      <DiscardConfirmationModal
        open={false}
        onDiscard={noop}
        onCancel={noop}
      />,
    );
    expect(discardConfirmationModalClosed.find(Modal).prop('open')).toBe(false);
  });

  it('calls onDiscard when primaryAction is triggered', () => {
    const spy = jest.fn();
    const discardConfirmationModal = mountWithAppProvider(
      <DiscardConfirmationModal open onDiscard={spy} onCancel={noop} />,
    );

    trigger(discardConfirmationModal.find(Modal), 'primaryAction.onAction');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when secondaryAction is triggered', () => {
    const spy = jest.fn();
    const discardConfirmationModal = mountWithAppProvider(
      <DiscardConfirmationModal open onDiscard={noop} onCancel={spy} />,
    );

    trigger(
      discardConfirmationModal.find(Modal),
      'secondaryActions.0.onAction',
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
