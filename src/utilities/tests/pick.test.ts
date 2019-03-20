import pick from '../pick';

describe('pick', () => {
  it('returns an empty object when null is provided', () => {
    expect(pick(null, 'a')).toEqual({});
  });

  it('returns an empty object when an empty keypath is provided', () => {
    expect(pick({propA: 1}, '')).toEqual({});
  });

  it('does not mutate the original object', () => {
    const obj = {propA: 1};
    expect(pick(obj, 'propA')).not.toBe(obj);
  });

  it('returns a object with values picked from the provided argument', () => {
    expect(pick({propA: 1, propB: 2, propC: 3}, 'propA', 'propC')).toEqual({
      propA: 1,
      propC: 3,
    });
  });

  it('flattens paths', () => {
    expect(
      pick({propA: 1, propB: 2, propC: 3}, ['propA', 'propB'], 'propC'),
    ).toEqual({
      propA: 1,
      propB: 2,
      propC: 3,
    });
  });

  it('picks a key over a path', () => {
    expect(pick({propA: {propB: 3}, 'propA.propB': 5}, 'propA.propB')).toEqual({
      'propA.propB': 5,
    });
  });

  it('picks keys with undefined values', () => {
    expect(Object.entries(pick({propA: undefined}, 'propA'))).toEqual([
      ['propA', undefined],
    ]);
  });

  it('filters out unmatched keypaths', () => {
    expect(Object.entries(pick({propA: 1, propB: 2}, 'propG'))).toEqual([]);
  });

  describe('nested paths', () => {
    it('picks array paths', () => {
      expect(
        pick({propA: {propB: 3}, 'propA.propB': 5}, ['propA', 'propB']),
      ).toEqual({
        propA: {
          propB: 3,
        },
      });
    });

    it('picks combined keypaths', () => {
      expect(pick({propA: {propB: 3}}, 'propA.propB')).toEqual({
        propA: {
          propB: 3,
        },
      });
    });
  });
});
