import {capitalize} from '../capitalize';

describe('capitalize', () => {
  it('capitalizes a word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('gives a word proper casing', () => {
    expect(capitalize('HELLO')).toBe('Hello');
  });

  it('capitalizes single letter words', () => {
    expect(capitalize('a')).toBe('A');
  });

  it('does not throw an error when an argument is not provided', () => {
    expect(capitalize()).toBe('');
  });
});
