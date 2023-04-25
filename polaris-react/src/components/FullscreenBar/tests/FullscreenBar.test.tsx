import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {FullscreenBar} from '../FullscreenBar';

describe('<FullscreenBar />', () => {
  it('renders its children', () => {
    const text = 'My App Info';
    const bar = mountWithApp(
      <FullscreenBar onAction={() => {}}>{text}</FullscreenBar>,
    );

    expect(bar).toContainReactText(text);
  });

  it('fires onAction when clicked', () => {
    const mockOnAction = jest.fn();
    const bar = mountWithApp(<FullscreenBar onAction={mockOnAction} />);

    bar.find('button')!.trigger('onClick');
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  it('renders a button with the given text', () => {
    const text = 'Exit';
    const bar = mountWithApp(
      <FullscreenBar onAction={() => {}} buttonText={text} />,
    );

    expect(bar).toContainReactText(text);
  });
});
