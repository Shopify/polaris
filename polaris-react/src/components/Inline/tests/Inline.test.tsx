import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Inline} from '../Inline';

describe('<Inline />', () => {
  const childText = 'Child';
  const renderChildren = () =>
    [0, 1].map((i) => (
      <div key={i}>
        {childText} {i}
      </div>
    ));

  it('renders its children', () => {
    const stack = mountWithApp(<Inline>{renderChildren()}</Inline>);

    expect(stack).toContainReactText(childText);
  });

  it('renders custom properties by default', () => {
    const stack = mountWithApp(<Inline>{renderChildren()}</Inline>);

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-inline-wrap': 'wrap',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const stack = mountWithApp(
      <Inline align="center" blockAlign="start" gap="10">
        {renderChildren()}
      </Inline>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-inline-align': 'center',
        '--pc-inline-block-align': 'start',
        '--pc-inline-wrap': 'wrap',
        '--pc-inline-gap-xs': 'var(--p-space-10)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const stack = mountWithApp(
      <Inline gap={{xs: '2', md: '8'}}>{renderChildren()}</Inline>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-inline-wrap': 'wrap',
        '--pc-inline-gap-xs': 'var(--p-space-2)',
        '--pc-inline-gap-md': 'var(--p-space-8)',
      }) as React.CSSProperties,
    });
  });
});
