import {merge} from '../merge';

describe('merge', () => {
  it('returns an object', () => {
    expect(merge()).toStrictEqual({});
  });

  it('does not merge prototypes', () => {
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    class Obj {}
    (Obj.prototype as any).prototypeVal = 'val';
    expect(merge(new Obj(), {})).toStrictEqual({});
  });

  it('merges X number of objects', () => {
    const objA = {keyA: 1};
    const objB = {keyB: 2};
    const objC = {keyC: 3};
    const expectedObject = {keyA: 1, keyB: 2, keyC: 3};
    expect(merge(objA, objB, objC)).toStrictEqual(expectedObject);
  });

  it('does not mutate deeply nested objects', () => {
    const objA = {
      keyA: {nestedA: {nestedB: {nestedC: {}, nestedD: [{nestedE: {}}, []]}}},
    };
    const objB = {keyA: {nestedA: {nestedB: {nestedD: {}}}}};
    const objC = {keyA: {nestedA: {nestedB: {nestedE: [[], {nestedD: {}}]}}}};
    merge(objA, objB, objC);
    expect(objA).toStrictEqual({
      keyA: {nestedA: {nestedB: {nestedC: {}, nestedD: [{nestedE: {}}, []]}}},
    });
    expect(objB).toStrictEqual({keyA: {nestedA: {nestedB: {nestedD: {}}}}});
    expect(objC).toStrictEqual({
      keyA: {nestedA: {nestedB: {nestedE: [[], {nestedD: {}}]}}},
    });
  });

  it('does not mutate the provided arguments', () => {
    const objA = {keyA: {nestedA: 1}};
    const objB = {keyA: {nestedA: 2}};
    const mergedObject = merge(objA, objB);
    expect(mergedObject).not.toBe(objA);
    expect(mergedObject).not.toBe(objB);
    expect(objA).toStrictEqual({keyA: {nestedA: 1}});
    expect(objB).toStrictEqual({keyA: {nestedA: 2}});
  });

  it('does not mutate arrays in the provided arguments', () => {
    const objA = {keyA: [{nestedA: 1}]};
    const objB = {keyA: [{nestedA: 2}]};
    const mergedObject = merge(objA, objB);
    expect(mergedObject).not.toBe(objA);
    expect(mergedObject).not.toBe(objB);
    expect(objA).toStrictEqual({keyA: [{nestedA: 1}]});
    expect(objB).toStrictEqual({keyA: [{nestedA: 2}]});
  });

  it('merges complex objects', () => {
    const objA = {propA: {propB: {propC: 4, propD: {propF: null}}}};
    const objB = {propA: {propB: {propC: 4, propD: {propF: {propG: 7}}}}};
    const objC = {propA: {propB: {propC: 4, propD: {propF: {propH: 7}}}}};
    expect(merge(objA, objB, objC)).toStrictEqual({
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
      expect(merge(objA, objB, objC)).toStrictEqual({
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
      expect(merge(objA, objB, objC)).toStrictEqual({
        propA: {propB: oo},
      });
    });
  });

  /** Arrays are typeof 'object' */
  describe('Arrays', () => {
    it('does not merge arrays', () => {
      const objA = {propA: {propB: [1, 2, 3, 4]}};
      const objB = {propA: {propB: [2, 3, 4, 5]}};
      expect(merge(objA, objB)).toStrictEqual({
        propA: {propB: [2, 3, 4, 5]},
      });
    });
  });
});
