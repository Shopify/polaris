import React from 'react';
import {mount} from 'test-utilities';

import {TextOption} from '../TextOption';

jest.mock('components', () => ({
  ...jest.requireActual('components'),
  Icon() {
    return null;
  },
}));

describe('TextOption', () => {
  it('renders children', () => {
    const child = 'child';
    const textOption = mount(<TextOption>{child}</TextOption>);

    expect(textOption).toContainReactText(child);
  });

  it('renders visually disabled text when disabled', () => {
    const textOption = mount(<TextOption disabled>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption disabled',
    });
  });

  it('renders visually selected text when selected', () => {
    const textOption = mount(<TextOption selected>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption selected',
    });
  });
});
