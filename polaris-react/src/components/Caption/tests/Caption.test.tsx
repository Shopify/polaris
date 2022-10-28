import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Text} from '../../Text';

describe('<Caption />', () => {
  it('renders a p tag', () => {
    const caption = mountWithApp(
      <Text variant="bodySm" as="p">
        Caption text
      </Text>,
    );
    expect(caption).toContainReactComponentTimes('p', 1);
  });

  it('renders its children', () => {
    const captionMarkup = 'Caption text';
    const caption = mountWithApp(
      <Text variant="bodySm" as="p">
        {captionMarkup}
      </Text>,
    );
    expect(caption).toContainReactText(captionMarkup);
  });
});
