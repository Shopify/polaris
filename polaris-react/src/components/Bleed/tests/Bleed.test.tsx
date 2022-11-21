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

  it('renders default horizontal custom properties', () => {
    const bleed = mountWithApp(
      <Bleed>
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-inline-start': 'var(--p-space-5)',
        '--pc-bleed-margin-inline-end': 'var(--p-space-5)',
      } as React.CSSProperties,
    });
  });

  it('only renders the custom property that matches the property passed in', () => {
    const bleed = mountWithApp(
      <Bleed marginInlineStart="2">
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-inline-start': 'var(--p-space-2)',
        '--pc-bleed-margin-inline-end': 'var(--p-space-5)',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties combined with any overrides if they are passed in', () => {
    const bleed = mountWithApp(
      <Bleed marginBlock="1" marginInlineStart="2" marginInline="3">
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-block-start': 'var(--p-space-1)',
        '--pc-bleed-margin-block-end': 'var(--p-space-1)',
        '--pc-bleed-margin-inline-start': 'var(--p-space-2)',
        '--pc-bleed-margin-inline-end': 'var(--p-space-3)',
      } as React.CSSProperties,
    });
  });
});
