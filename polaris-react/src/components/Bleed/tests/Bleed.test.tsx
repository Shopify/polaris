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
        '--pc-bleed-margin-left': 'var(--p-space-5)',
        '--pc-bleed-margin-right': 'var(--p-space-5)',
      } as React.CSSProperties,
    });
  });

  it('only renders the custom property that matches the property passed in', () => {
    const bleed = mountWithApp(
      <Bleed left="2">
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-left': 'var(--p-space-2)',
        '--pc-bleed-margin-right': 'var(--p-space-5)',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties combined with any overrides if they are passed in', () => {
    const bleed = mountWithApp(
      <Bleed vertical="1" left="2" horizontal="3">
        <Children />
      </Bleed>,
    );

    expect(bleed).toContainReactComponent('div', {
      style: {
        '--pc-bleed-margin-bottom': 'var(--p-space-1)',
        '--pc-bleed-margin-left': 'var(--p-space-2)',
        '--pc-bleed-margin-right': 'var(--p-space-3)',
        '--pc-bleed-margin-top': 'var(--p-space-1)',
      } as React.CSSProperties,
    });
  });
});
