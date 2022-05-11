import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {CloseButton} from '../../CloseButton';
import {Header} from '../Header';

describe('<Header />', () => {
  const title = 'My Header';
  const onDismiss = jest.fn();

  it('renders', () => {
    const header = mountWithApp(<Header onDismiss={onDismiss} title={title} />);
    expect(header).toContainReactText(title);
  });

  it('renders a close button with an onDismiss callback', () => {
    const header = mountWithApp(<Header onDismiss={onDismiss} title={title} />);
    const closeButton = header.find(CloseButton);
    expect(closeButton?.props.onDismiss).toEqual(onDismiss);
  });

  it('renders with a hidden title', () => {
    const header = mountWithApp(<Header onDismiss={onDismiss} title={title} titleHidden />);
    expect(header).not.toContainReactText(title);
  });
});
