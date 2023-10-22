import {classNames, variationName, getResponsiveProps} from '../css';

describe('classNames', () => {
  it('returns a single string from multiple classes', () => {
    expect(classNames('btn', 'btn-sm')).toBe('btn btn-sm');
  });

  it('filters out falsy values', () => {
    expect(
      classNames(
        'btn',
        true && 'btn-sm',
        false && 'b',
        undefined && 'c',
        null && 'd',
        0 && 'e',
      ),
    ).toBe('btn btn-sm');
  });
});

describe('variationName', () => {
  it('returns a name with the first character in the value capitalized', () => {
    expect(variationName('size', 'medium')).toBe('sizeMedium');
  });
});

describe('getResponsiveProps', () => {
  it('takes a string and returns the custom property', () => {
    expect(getResponsiveProps('stack', 'space', 'space', '400')).toMatchObject({
      '--pc-stack-space-xs': 'var(--p-space-400)',
    });
  });

  it('takes an object with a breakpoint and value and returns the property for each breakpoint', () => {
    expect(
      getResponsiveProps('stack', 'space', 'space', {xs: '200', md: '800'}),
    ).toMatchObject({
      '--pc-stack-space-xs': 'var(--p-space-200)',
      '--pc-stack-space-md': 'var(--p-space-800)',
    });
  });

  it('handles a full responsive object', () => {
    expect(
      getResponsiveProps('stack', 'space', 'space', {
        xs: '200',
        sm: '400',
        md: '800',
        lg: '800',
        xl: '1000',
      }),
    ).toMatchObject({
      '--pc-stack-space-xs': 'var(--p-space-200)',
      '--pc-stack-space-sm': 'var(--p-space-400)',
      '--pc-stack-space-md': 'var(--p-space-800)',
      '--pc-stack-space-lg': 'var(--p-space-800)',
      '--pc-stack-space-xl': 'var(--p-space-1000)',
    });
  });

  it('does not fill in leading undefined values', () => {
    expect(
      getResponsiveProps('stack', 'space', 'space', {
        md: '400',
        xl: '1000',
      }),
    ).toMatchObject({
      '--pc-stack-space-md': 'var(--p-space-400)',
      '--pc-stack-space-xl': 'var(--p-space-1000)',
    });
  });

  it('treats falsey as a value', () => {
    expect(
      getResponsiveProps<string | number>('stack', 'space', 'space', {
        md: 0,
        xl: '1000',
      }),
    ).toMatchObject({
      '--pc-stack-space-md': 'var(--p-space-0)',
      '--pc-stack-space-xl': 'var(--p-space-1000)',
    });
  });

  it('ignores explicit "undefined" values', () => {
    expect(
      getResponsiveProps('stack', 'space', 'space', {
        md: undefined,
        lg: '1000',
      }),
    ).toMatchObject({
      '--pc-stack-space-lg': 'var(--p-space-1000)',
    });
  });
});
