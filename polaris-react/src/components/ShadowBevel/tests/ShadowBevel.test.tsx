import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ShadowBevel} from '..';

describe('ShadowBevel', () => {
  it('renders children', () => {
    const shadowBevel = mountWithApp(
      <ShadowBevel boxShadow="300" borderRadius="300">
        <p>hello</p>
        <p>world</p>
      </ShadowBevel>,
    );

    expect(shadowBevel).toContainReactComponentTimes('p', 2);
  });

  it('disables bevel effect', () => {
    const shadowBevel = mountWithApp(
      <ShadowBevel boxShadow="300" borderRadius="300" bevel={false} />,
    );

    expect(shadowBevel).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-shadow-bevel-box-shadow-xs': 'none',
        '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-0)',
        '--pc-shadow-bevel-content-xs': 'none',
      }),
    });
  });

  it('sets boxShadow and borderRadius props as inline styles', () => {
    const shadowBevel = mountWithApp(
      <ShadowBevel boxShadow="300" borderRadius="300" />,
    );

    expect(shadowBevel).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-shadow-bevel-box-shadow-xs': 'var(--p-shadow-300)',
        '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-300)',
        '--pc-shadow-bevel-content-xs': '""',
      }),
    });
  });

  it('sets boxShadow and borderRadius props as responsive inline styles', () => {
    const shadowBevel = mountWithApp(
      <ShadowBevel
        boxShadow="300"
        borderRadius="300"
        bevel={{xs: false, sm: true, lg: false}}
      />,
    );

    expect(shadowBevel).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-shadow-bevel-box-shadow-xs': 'none',
        '--pc-shadow-bevel-box-shadow-sm': 'var(--p-shadow-300)',
        '--pc-shadow-bevel-box-shadow-lg': 'none',
        '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-0)',
        '--pc-shadow-bevel-border-radius-sm': 'var(--p-border-radius-300)',
        '--pc-shadow-bevel-border-radius-lg': 'var(--p-border-radius-0)',
        '--pc-shadow-bevel-content-xs': 'none',
        '--pc-shadow-bevel-content-sm': '""',
        '--pc-shadow-bevel-content-lg': 'none',
      }),
    });
  });

  it('sets as prop to the root element', () => {
    const shadowBevel = mountWithApp(
      <ShadowBevel as="article" boxShadow="300" borderRadius="300" />,
    );

    expect(shadowBevel).toContainReactComponent('article');
  });
});
