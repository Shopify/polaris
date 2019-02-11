import isObjectsEqual from '../isObjectsEqual';

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
      expect(isObjectsEqual(objA, objB)).toBe(true);
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
});
