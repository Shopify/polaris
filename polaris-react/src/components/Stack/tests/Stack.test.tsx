import {mountWithApp} from 'tests/utilities';

import {Stack} from '../Stack';

const text = 'This is a stack';
const children = <p>{text}</p>;

describe('<Stack />', () => {
  it('renders children', () => {
    const stack = mountWithApp(<Stack>{children}</Stack>);

    expect(stack).toContainReactComponent('p', {children: text});
  });

  it('renders custom properties by default', () => {
    const stack = mountWithApp(<Stack>{children}</Stack>);

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-order': 'column',
      }) as React.CSSProperties,
    });
  });

  it('overrides custom properties if they are passed in', () => {
    const stack = mountWithApp(
      <Stack align="center" gap="10">
        {children}
      </Stack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-align': 'center',
        '--pc-stack-gap-xs': 'var(--p-space-10)',
      }) as React.CSSProperties,
    });
  });

  it('accepts gap based on breakpoints', () => {
    const stack = mountWithApp(
      <Stack gap={{xs: '2', md: '8'}}>{children}</Stack>,
    );

    expect(stack).toContainReactComponent('div', {
      style: expect.objectContaining({
        '--pc-stack-gap-md': 'var(--p-space-8)',
        '--pc-stack-gap-xs': 'var(--p-space-2)',
      }) as React.CSSProperties,
    });
  });
});
