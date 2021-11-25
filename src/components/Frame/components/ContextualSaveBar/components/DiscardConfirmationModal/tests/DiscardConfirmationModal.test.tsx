import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Modal} from '../../../../../../Modal';
import {DiscardConfirmationModal} from '../DiscardConfirmationModal';

describe('<DiscardConfirmationModal />', () => {
  it('passes its open prop value to the Modal', () => {
    const discardConfirmationModalOpen = mountWithApp(
      <DiscardConfirmationModal open onDiscard={noop} onCancel={noop} />,
    );
    expect(discardConfirmationModalOpen).toContainReactComponent(Modal, {
      open: true,
    });

    const discardConfirmationModalClosed = mountWithApp(
      <DiscardConfirmationModal
        open={false}
        onDiscard={noop}
        onCancel={noop}
      />,
    );

    expect(discardConfirmationModalClosed).toContainReactComponent(Modal, {
      open: false,
    });
  });

  it('calls onDiscard when primaryAction is triggered', () => {
    const spy = jest.fn();
    const discardConfirmationModal = mountWithApp(
      <DiscardConfirmationModal open onDiscard={spy} onCancel={noop} />,
    );

    discardConfirmationModal
      .find(Modal)
      ?.triggerKeypath('primaryAction.onAction');

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when secondaryAction is triggered', () => {
    const spy = jest.fn();
    const discardConfirmationModal = mountWithApp(
      <DiscardConfirmationModal open onDiscard={noop} onCancel={spy} />,
    );

    discardConfirmationModal
      .find(Modal)
      ?.triggerKeypath('secondaryActions.0.onAction');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

function noop() {}
