import {arraysAreEqual} from '../arrays';

describe('arrays', () => {
  it('designates two equal arrays as equal', () => {
    const firstArray = ['one', 'two', 'three'];
    const secondArray = ['one', 'two', 'three'];

    expect(arraysAreEqual(firstArray, secondArray));
  });
});
