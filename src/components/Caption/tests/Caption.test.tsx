import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Caption from '../Caption';

describe('<Caption />', () => {
  it('renders a p tag', () => {
    const caption = mountWithAppProvider(<Caption>Caption text</Caption>);
    expect(caption.find('p')).toHaveLength(1);
  });

  it('renders its children', () => {
    const captionMarkup = 'Caption text';
    const caption = mountWithAppProvider(<Caption>{captionMarkup}</Caption>);
    expect(caption.contains(captionMarkup)).toBe(true);
  });
});
