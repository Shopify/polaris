import {normalizeName, constructColorName} from '../color-names';

describe('normalizeName', () => {
  it('will return a hyphen word in lower case', () => {
    const name = normalizeName('topBar');
    expect(name).toBe('top-bar');
  });
});

describe('constructColorName', () => {
  it('will return a css variable normalized name', () => {
    const name = constructColorName('topBar', null);
    expect(name).toBe('--top-bar');
  });

  it('will return a css variable normalized name with a property', () => {
    const name = constructColorName('topBar', 'background');
    expect(name).toBe('--top-bar-background');
  });

  it('will return a css variable normalized name with a property and suffix', () => {
    const name = constructColorName('topBar', 'background', 'light');
    expect(name).toBe('--top-bar-background-light');
  });

  it('will return a css variable normalized name with a suffix', () => {
    const name = constructColorName('topBar', null, 'light');
    expect(name).toBe('--top-bar-light');
  });
});
