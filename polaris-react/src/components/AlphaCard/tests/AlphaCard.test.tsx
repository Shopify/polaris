import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {
  BreakpointsTokenName,
  breakpoints,
  getMediaConditions,
} from '@shopify/polaris-tokens';

import {AlphaCard} from '..';

const mediaConditions = getMediaConditions(breakpoints);

const heading = <p>Online store dashboard</p>;
const subheading = <p>View a summary of your online store performance</p>;

describe('AlphaCard', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

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

function setMediaWidth(breakpointsTokenName: BreakpointsTokenName) {
  const aliasDirectionConditions = Object.values(
    mediaConditions[breakpointsTokenName],
  );

  jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: aliasDirectionConditions.includes(query),
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
