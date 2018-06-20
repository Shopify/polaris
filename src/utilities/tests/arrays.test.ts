import {arraysAreEqual} from '../arrays';

describe('arrays', () => {
  it('declares equal arrays as equal', () => {
    const firstArray = ['one', 'two', 'three'];
    const secondArray = ['one', 'two', 'three'];

    expect(arraysAreEqual(firstArray, secondArray)).toBe(true);
  });

  it('declares differing arrays as non-equal', () => {
    const firstArray = ['one', 'two', 'three'];
    const secondArray = ['one', 'two', 'twelve'];

    expect(arraysAreEqual(firstArray, secondArray)).not.toBe(true);
  });

  it('declares arrays of different sizes as non-equal', () => {
    const firstArray = ['one', 'two', 'three'];
    const secondArray = ['one', 'two'];

    expect(arraysAreEqual(firstArray, secondArray)).not.toBe(true);
  });
});
