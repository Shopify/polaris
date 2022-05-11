import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../../../Button';
import {CloseButton} from '../CloseButton';

describe('<CloseButton />', () => {
  const title = 'My Close Button';
  const onDismiss = jest.fn();

  it('renders with an accessibilityLabel', () => {
    const closeButton = mountWithApp(<CloseButton onDismiss={onDismiss} title={title} />);
    const button = closeButton.find(Button);
    expect(button?.props.accessibilityLabel).toEqual(`Close ${title} tutorial`);
  });

  it('renders with an onDismiss callback', () => {
    const closeButton = mountWithApp(<CloseButton onDismiss={onDismiss} title={title} />);
    const button = closeButton.find(Button);
    expect(button?.props.onClick).toEqual(onDismiss);
  });
});
