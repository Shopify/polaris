import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';

import DisplayText from '../DisplayText';

describe('<DisplayText />', () => {
  it('renders its children', () => {
    const text = 'Important text.';
    const displayText = mountWithAppProvider(
      <DisplayText size="small" element="h1">
        {text}
      </DisplayText>,
    );
    expect(displayText.contains(text)).toBe(true);
  });

  it('renders the specified element', () => {
    const displayText = mountWithAppProvider(
      <DisplayText size="extraLarge" element="h1">
        Important text.
      </DisplayText>,
    );
    expect(displayText.find('h1')).toHaveLength(1);
  });

  it('renders a p element if not specified', () => {
    const displayText = mountWithAppProvider(
      <DisplayText size="extraLarge">Important text.</DisplayText>,
    );
    expect(displayText.find('p')).toHaveLength(1);
  });
});
