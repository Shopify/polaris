import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {setMediaWidth} from 'tests/utilities/breakpoints';

import {Card} from '..';

const heading = <p>Online store dashboard</p>;
const subheading = <p>View a summary of your online store performance</p>;

describe('Card', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders children', () => {
    const card = mountWithApp(
      <Card>
        {heading}
        {subheading}
      </Card>,
    );

    expect(card).toContainReactComponentTimes('p', 2);
  });

  it('sets default border radius when roundedAbove breakpoint passed in', () => {
    setMediaWidth('breakpoints-sm');
    const card = mountWithApp(
      <Card roundedAbove="sm">
        {heading}
        {subheading}
      </Card>,
    );

    expect(card).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-box-border-radius': 'var(--p-border-radius-2)',
      }),
    });
  });
});
