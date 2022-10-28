import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../../Text';

describe('<DisplayText />', () => {
  it('renders its children', () => {
    const text = 'Important text.';
    const displayText = mountWithApp(
      <Text variant="headingLg" as="h1">
        {text}
      </Text>,
    );
    expect(displayText).toContainReactText(text);
  });

  it('renders the specified element', () => {
    const displayText = mountWithApp(
      <Text variant="heading4xl" as="h1">
        Important text.
      </Text>,
    );
    expect(displayText).toContainReactComponentTimes('h1', 1);
  });

  it('renders a p element if not specified', () => {
    const displayText = mountWithApp(
      <Text variant="heading4xl" as="p">
        Important text.
      </Text>,
    );

    expect(displayText).toContainReactComponentTimes('p', 1);
  });
});
