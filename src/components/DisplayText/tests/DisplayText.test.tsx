import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {DisplayText} from '../DisplayText';

describe('<DisplayText />', () => {
  it('renders its children', () => {
    const text = 'Important text.';
    const displayText = mountWithApp(
      <DisplayText size="small" element="h1">
        {text}
      </DisplayText>,
    );
    expect(displayText).toContainReactText(text);
  });

  it('renders the specified element', () => {
    const displayText = mountWithApp(
      <DisplayText size="extraLarge" element="h1">
        Important text.
      </DisplayText>,
    );
    expect(displayText).toContainReactComponentTimes('h1', 1);
  });

  it('renders a p element if not specified', () => {
    const displayText = mountWithApp(
      <DisplayText size="extraLarge">Important text.</DisplayText>,
    );

    expect(displayText).toContainReactComponentTimes('p', 1);
  });
});
