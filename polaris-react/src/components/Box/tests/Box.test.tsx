import React from 'react';
import {mountWithApp} from 'tests/utilities';
import type {ColorsTokenName, ShapeTokenName} from '@shopify/polaris-tokens';

import {Box} from '..';
import type {
  BackgroundColors as BoxBackgroundColorTokenScale,
  ColorTokenScale as BoxColorTokenScale,
  BorderTokenAlias as BoxBorderTokenAlias,
  BorderRadiusTokenScale as BoxBorderRadiusTokenScale,
} from '..';

// Test that type passed in is true
type Expect<T extends true> = T;
// Test each token in TokenTypeAlias to check that it exists in the TokenGroup
type Equal<TokenGroup, TokenTypeAlias> = (<T>() => T extends TokenGroup
  ? 1
  : 2) extends <T>() => T extends TokenTypeAlias ? 1 : 2
  ? true
  : false;

// Extract token scales and aliases from token groups for testing
type BackgroundColorTokenScale = Extract<
  ColorsTokenName,
  | `action-${string}`
  | 'backdrop'
  | 'background'
  | `background-${string}`
  | 'overlay'
  | 'surface'
  | `surface-${string}`
>;

type ColorTokenScale = Extract<ColorsTokenName, 'text' | `text-${string}`>;

type BorderShapeTokenScale = ShapeTokenName extends `border-${infer Scale}`
  ? Scale
  : never;
type BorderTokenAlias = Exclude<
  BorderShapeTokenScale,
  `radius-${string}` | `width-${string}`
>;

type BorderRadiusTokenScale = Extract<
  Exclude<BorderShapeTokenScale, 'radius-half'>,
  `radius-${string}`
> extends `radius-${infer Scale}`
  ? Scale
  : never;

// Test type aliases to ensure they are valid values from our token groups
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type cases = [
  Expect<Equal<BackgroundColorTokenScale, BoxBackgroundColorTokenScale>>,
  Expect<Equal<ColorTokenScale, BoxColorTokenScale>>,
  Expect<Equal<BorderTokenAlias, BoxBorderTokenAlias>>,
  Expect<Equal<BorderRadiusTokenScale, BoxBorderRadiusTokenScale>>,
];

const text = 'This is a box';
const children = <p>{text}</p>;

describe('Box', () => {
  it('renders children', () => {
    const box = mountWithApp(<Box>{children}</Box>);

    expect(box).toContainReactComponent('p', {children: text});
  });

  it('does not render custom properties by default', () => {
    const box = mountWithApp(<Box>{children}</Box>);

    expect(box).toContainReactComponent('div', {style: undefined});
  });

  it('only renders the custom property that matches the property passed in', () => {
    const box = mountWithApp(<Box paddingInlineStart="2">{children}</Box>);

    expect(box).toContainReactComponent('div', {
      style: {
        '--pc-box-padding-inline-start-xs': 'var(--p-space-2)',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties combined with any overrides if they are passed in', () => {
    const box = mountWithApp(
      <Box padding="1" paddingInlineStart="2">
        {children}
      </Box>,
    );

    expect(box).toContainReactComponent('div', {
      style: {
        '--pc-box-padding-block-end-xs': 'var(--p-space-1)',
        '--pc-box-padding-block-start-xs': 'var(--p-space-1)',
        '--pc-box-padding-inline-end-xs': 'var(--p-space-1)',
        '--pc-box-padding-inline-start-xs': 'var(--p-space-2)',
      } as React.CSSProperties,
    });
  });

  it('accepts padding based on breakpoints', () => {
    const box = mountWithApp(
      <Box padding={{xs: '2', md: '8'}}>{children}</Box>,
    );

    expect(box).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-box-padding-block-end-md': 'var(--p-space-8)',
        '--pc-box-padding-block-end-xs': 'var(--p-space-2)',
        '--pc-box-padding-block-start-md': 'var(--p-space-8)',
        '--pc-box-padding-block-start-xs': 'var(--p-space-2)',
        '--pc-box-padding-inline-end-md': 'var(--p-space-8)',
        '--pc-box-padding-inline-end-xs': 'var(--p-space-2)',
        '--pc-box-padding-inline-start-md': 'var(--p-space-8)',
        '--pc-box-padding-inline-start-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });

  it('renders the aria attributes that matches the aria attributes passed in', () => {
    const box = mountWithApp(
      <Box aria-required aria-describedby="test">
        {children}
      </Box>,
    );

    expect(box).toContainReactComponent('div', {
      'aria-required': true,
      'aria-describedby': 'test',
    });
  });
});
