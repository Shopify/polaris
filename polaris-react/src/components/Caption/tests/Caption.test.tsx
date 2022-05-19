import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Caption} from '../Caption';

describe('<Caption />', () => {
  it('renders a p tag', () => {
    const caption = mountWithApp(<Caption>Caption text</Caption>);
    expect(caption).toContainReactComponentTimes('p', 1);
  });

  it('renders its children', () => {
    const captionMarkup = 'Caption text';
    const caption = mountWithApp(<Caption>{captionMarkup}</Caption>);
    expect(caption).toContainReactText(captionMarkup);
  });
});
