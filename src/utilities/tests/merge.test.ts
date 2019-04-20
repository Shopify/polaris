import merge from '../merge';

describe('merge', () => {
  it('returns an object', () => {
    expect(merge()).toEqual({});
  });

  it('does not merge prototypes', () => {
    class Obj {}
    (Obj.prototype as any).prototypeVal = 'val';
    expect(merge(new Obj(), {})).toEqual({});
  });

  it('merges X number of objects', () => {
    const objA = {keyA: 1};
    const objB = {keyB: 2};
    const objC = {keyC: 3};
    const expectedObject = {keyA: 1, keyB: 2, keyC: 3};
    expect(merge(objA, objB, objC)).toEqual(expectedObject);
  });

  it('does not mutate the provided arguments', () => {
    const objA = {keyA: 1};
    const objB = {keyB: 2};
    const mergedObject = merge(objA, objB);
    expect(mergedObject).not.toBe(objA);
    expect(mergedObject).not.toBe(objB);
  });

  it('merges complex objects', () => {
    const objA = {propA: {propB: {propC: 4, propD: {propF: null}}}};
    const objB = {propA: {propB: {propC: 4, propD: {propF: {propG: 7}}}}};
    const objC = {propA: {propB: {propC: 4, propD: {propF: {propH: 7}}}}};
    expect(merge(objA, objB, objC)).toEqual({
      propA: {propB: {propC: 4, propD: {propF: {propG: 7, propH: 7}}}},
    });
  });

  /** Functions are objects but typeof <Function> === 'function' */
  describe('Functions', () => {
    it('replaces functions with objects', () => {
      function funcA() {}
      function funcB() {
        return 4;
      }
      const objA = {propA: {propB: funcA}};
      const objB = {propA: {propB: funcB}};
      const objC = {propA: {propB: {propC: 4, propD: {propF: {propH: 7}}}}};
      expect(merge(objA, objB, objC)).toEqual({
        propA: {propB: {propC: 4, propD: {propF: {propH: 7}}}},
      });
    });

    it('replaces objects with functions', () => {
      function test() {}
      function oo() {
        return 4;
      }
      const objA = {propA: {propB: test}};
      const objB = {propA: {propB: {propC: 4, propD: {propF: {propH: 7}}}}};
      const objC = {propA: {propB: oo}};
      expect(merge(objA, objB, objC)).toEqual({
        propA: {propB: oo},
      });
    });
  });

  /** Arrays are typeof 'object' */
  describe('Arrays', () => {
    it('does not merge arrays', () => {
      const objA = {propA: {propB: [1, 2, 3, 4]}};
      const objB = {propA: {propB: [2, 3, 4, 5]}};
      expect(merge(objA, objB)).toEqual({
        propA: {propB: [2, 3, 4, 5]},
      });
    });
  });
});
