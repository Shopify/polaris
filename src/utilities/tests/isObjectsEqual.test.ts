import {isObjectsEqual} from '../is-objects-equal';

describe('isObjectsEqual', () => {
  it('recursively compares objects', () => {
    const objA = {
      propA: {propB: {propC: {propD: 4, propE: {propF: 'polaris'}}}},
    };
    const objB = {
      propA: {propB: {propC: {propD: 4, propE: {propF: 'polaris'}}}},
    };
    expect(isObjectsEqual(objA, objB)).toBe(true);
  });

  describe('missing keys', () => {
    it('returns false if the first argument has extra keys', () => {
      const objA = {propA: 1, propB: 2};
      const objB = {propA: 1};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });

    it('returns false if the second argument has extra keys', () => {
      const objA = {propA: 1};
      const objB = {propA: 1, propB: 2};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });
  });

  describe('undefined', () => {
    it('compares undefined', () => {
      const objA = {propA: undefined};
      const objB = {propA: undefined};
      expect(isObjectsEqual(objA, objB)).toBe(true);
    });

    it('returns true if both arguments are undefined', () => {
      const objA = undefined;
      const objB = undefined;
      expect(isObjectsEqual(objA, objB)).toBe(true);
    });

    it('returns false when only one argument is undefined', () => {
      const objA = {propA: undefined};
      const objB = {propA: 4};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });
  });

  describe('functions', () => {
    it('compares anonymous function equaility', () => {
      const objA = {propA: () => {}};
      const objB = {propA: () => {}};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });

    it('compares function declaration equaility', () => {
      function propA() {}
      const objA = {propA};
      const objB = {propA() {}};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });

    it('compares function expression equaility', () => {
      const propA = function() {};
      const objA = {propA};
      const objB = {propA() {}};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });
  });

  describe('primitives', () => {
    it('compares values', () => {
      const objA = {propA: 5};
      const objB = {propA: 5};
      expect(isObjectsEqual(objA, objB)).toBe(true);
    });

    it('uses strict equaility', () => {
      const objA = {propA: 5};
      const objB = {propA: '5'};
      expect(isObjectsEqual(objA, objB)).toBe(false);
    });
  });

  describe('arrays', () => {
    it('compares array equality', () => {
      const objA = {propA: [2, 3, 4, 5]};
      const objB = {propA: [2, 3, 4, 5]};
      expect(isObjectsEqual(objA, objB)).toBe(true);
    });
  });

  describe('circular references', () => {
    it('compares arrays with circular references', () => {
      let array1: any[] = [];
      let array2: any[] = [];

      array1.push(array1);
      array2.push(array2);

      expect(isObjectsEqual(array1, array2)).toBe(true);

      array1 = ['a', 'b', 'c'];
      array1[1] = array1;
      array2 = ['a', ['a', 'b', 'c'], 'c'];

      expect(isObjectsEqual(array1, array2)).toBe(false);
    });

    it('compares objects with circular references', () => {
      let objA: any = {};
      let objB: any = {};

      objA.propA = objA;
      objB.propA = objB;

      expect(isObjectsEqual(objA, objB)).toBe(true);

      objA = {propA: 1, propB: 2, propC: 3};
      objA.propB = objA;
      objB = {propA: 1, propB: {propA: 1, propB: 2, propC: 3}, propC: 3};

      expect(isObjectsEqual(objA, objB)).toBe(false);
    });

    it('compares objects with multiple circular references', () => {
      const arrA: any[] = [{}];
      const arrB: any[] = [{}];

      (arrA[0].propA = arrA).push(arrA);
      (arrB[0].propA = arrB).push(arrB);

      expect(isObjectsEqual(arrA, arrB)).toBe(true);

      arrA[0].propB = 1;
      arrB[0].propB = 2;

      expect(isObjectsEqual(arrA, arrB)).toBe(false);
    });

    it('compares objects with complex circular references', () => {
      const objA: any = {
        propA: {propB: {propC: {propD: {}}}},
        propB: {propA: 2},
      };

      const objB: any = {
        propA: {propB: {propC: {propD: {}}}},
        propB: {propA: 2},
      };

      objA.propA.propB.propC.propD = objA;
      objA.propB.propB = objA.propA.propB;

      objB.propA.propB.propC.propD = objB;
      objB.propB.propB = objB.propA.propB;

      expect(isObjectsEqual(objA, objB)).toBe(true);
    });
  });
});
