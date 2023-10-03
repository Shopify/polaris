import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {HorizontalStack} from '../HorizontalStack';

describe('<HorizontalStack />', () => {
  const childText = 'Child';
  const renderChildren = () =>
    [0, 1].map((i) => (
      <div key={i}>
        {childText} {i}
      </div>
    ));

  it('renders its children', () => {
    const horizontalStack = mountWithApp(
      <HorizontalStack>{renderChildren()}</HorizontalStack>,
    );

    expect(horizontalStack).toContainReactText(childText);
  });

  it('renders custom properties by default', () => {
    const horizontalStack = mountWithApp(
      <HorizontalStack>{renderChildren()}</HorizontalStack>,
    );

    expect(horizontalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-horizontal-stack-wrap': 'wrap',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const horizontalStack = mountWithApp(
      <HorizontalStack align="center" blockAlign="start" gap="1000">
        {renderChildren()}
      </HorizontalStack>,
    );

    expect(horizontalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-horizontal-stack-align': 'center',
        '--pc-horizontal-stack-block-align': 'start',
        '--pc-horizontal-stack-wrap': 'wrap',
        '--pc-horizontal-stack-gap-xs': 'var(--p-space-1000)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const horizontalStack = mountWithApp(
      <HorizontalStack gap={{xs: '200', md: '800'}}>
        {renderChildren()}
      </HorizontalStack>,
    );

    expect(horizontalStack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-horizontal-stack-wrap': 'wrap',
        '--pc-horizontal-stack-gap-xs': 'var(--p-space-200)',
        '--pc-horizontal-stack-gap-md': 'var(--p-space-800)',
      }) as React.CSSProperties,
    });
  });
});
