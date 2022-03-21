import {classNames, variationName} from '../css';

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
