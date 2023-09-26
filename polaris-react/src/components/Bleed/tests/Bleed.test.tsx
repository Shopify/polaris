import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Bleed} from '../Bleed';

const Children = () => <p>This is a tile</p>;

describe('<Bleed />', () => {
  it('renders children', () => {
    const bleed = mountWithApp(
      <Bleed>
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent(Children);
  });

  it('only renders the custom property that matches the property passed in', () => {
    const bleed = mountWithApp(
      <Bleed marginInlineStart="200">
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-inline-start-xs': 'var(--p-space-200)',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties combined with any overrides if they are passed in', () => {
    const bleed = mountWithApp(
      <Bleed marginBlock="100" marginInlineStart="200" marginInline="300">
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-block-start-xs': 'var(--p-space-100)',
        '--pc-bleed-margin-block-end-xs': 'var(--p-space-100)',
        '--pc-bleed-margin-inline-start-xs': 'var(--p-space-200)',
        '--pc-bleed-margin-inline-end-xs': 'var(--p-space-300)',
      } as React.CSSProperties,
    });
  });

  it('renders margin based on breakpoints', () => {
    const bleed = mountWithApp(
      <Bleed marginInlineStart={{xs: '200', md: '800'}}>
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-bleed-margin-inline-start-xs': 'var(--p-space-200)',
        '--pc-bleed-margin-inline-start-md': 'var(--p-space-800)',
      }) as React.CSSProperties,
    });
  });
});
