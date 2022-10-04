import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {setMediaWidth} from 'tests/utilities/breakpoints';

import {AlphaCard} from '..';

const heading = <p>Online store dashboard</p>;
const subheading = <p>View a summary of your online store performance</p>;

describe('AlphaCard', () => {
  it('renders children', () => {
    const alphaCard = mountWithApp(
      <AlphaCard>
        {heading}
        {subheading}
      </AlphaCard>,
    );

    expect(alphaCard).toContainReactComponentTimes('p', 2);
  });

  it('sets default border radius when roundedAbove breakpoint passed in', () => {
    setMediaWidth('breakpoints-sm');
    const alphaCard = mountWithApp(
      <AlphaCard roundedAbove="sm">
        {heading}
        {subheading}
      </AlphaCard>,
    );

    expect(alphaCard).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-box-border-radius-bottom-left': 'var(--p-border-radius-2)',
        '--pc-box-border-radius-bottom-right': 'var(--p-border-radius-2)',
        '--pc-box-border-radius-top-left': 'var(--p-border-radius-2)',
        '--pc-box-border-radius-top-right': 'var(--p-border-radius-2)',
      }),
    });
  });
});
