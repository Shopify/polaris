import React from 'react';
import {mount} from 'tests/modern';

import {TextOption} from '../TextOption';

jest.mock('@shopify/polaris', () => ({
  ...jest.requireActual('@shopify/polaris'),
  Icon() {
    return null;
  },
}));

describe('TextOption', () => {
  it('renders children', async () => {
    const child = 'child';
    const textOption = mount(<TextOption>{child}</TextOption>);

    expect(textOption).toContainReactText(child);
  });

  it('renders visually disabled text when disabled', async () => {
    const textOption = mount(<TextOption disabled>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption disabled',
    });
  });

  it('renders visually selected text when selected', async () => {
    const textOption = mount(<TextOption selected>child</TextOption>);

    expect(textOption).toContainReactComponent('div', {
      className: 'TextOption selected',
    });
  });
});
