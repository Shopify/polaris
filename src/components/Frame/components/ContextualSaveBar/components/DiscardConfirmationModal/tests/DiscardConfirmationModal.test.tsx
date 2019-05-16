import React from 'react';

import {shallowWithAppProvider, trigger} from 'test-utilities';

import {Modal} from 'components';

import DiscardConfirmationModal from '../DiscardConfirmationModal';

describe('<DiscardConfirmationModal />', () => {
  it('calls onDiscard when primaryAction is triggered', () => {
    const spy = jest.fn();
    const discardConfirmationModal = shallowWithAppProvider(
      <DiscardConfirmationModal open onDiscard={spy} onCancel={noop} />,
    );

    trigger(discardConfirmationModal.find(Modal), 'primaryAction.onAction');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when secondaryAction is triggered', () => {
    const spy = jest.fn();
    const discardConfirmationModal = shallowWithAppProvider(
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
