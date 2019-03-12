import {get} from '../get';

describe('get', () => {
  it('returns undefined when the path does not exist', () => {
    expect(get({}, 'a')).toBeUndefined();
  });

  it('returns a value for a single keypath', () => {
    expect(get({hello: 'polaris'}, 'hello')).toBe('polaris');
  });

  it('returns the value for a complex keypath', () => {
    expect(get({keyA: {keyB: {keyC: 'polaris'}}}, 'keyA.keyB.keyC')).toBe(
      'polaris',
    );
  });

  it('returns undefined when the object is not provided', () => {
    expect(get(undefined, 'keyA.keyB.keyC')).toBeUndefined();
  });

  it('accepts a array of keys for keypath', () => {
    expect(
      get({keyA: [{keyB: {keyC: 3}}]}, ['keyA', '0', 'keyB', 'keyC']),
    ).toBe(3);
  });

  it('accepts string keypath with square bracket notation', () => {
    expect(get({keyA: [{keyB: {keyC: 3}}]}, 'keyA[0].keyB.keyC')).toBe(3);
  });

  it('returns the default value for undefined results', () => {
    expect(
      get({keyA: [{keyB: {keyC: 3}}]}, ['keyA', '0', 'keyB', 'keyC', 'not']),
    ).toBeUndefined();
  });
});
