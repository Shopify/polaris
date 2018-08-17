import {pluckDeep} from '../pluckDeep';

describe('pluckDeep', () => {
  it('will return a value from a flat object', () => {
    const pluckedValue = pluckDeep({test: 'val', hello: 'world'}, 'hello');
    expect(pluckedValue).toBe('world');
  });

  it('will return a value from a nested structure', () => {
    const pluckedValue = pluckDeep(
      {
        a: {
          b: {
            c: {
              d: {},
            },
            e: {f: {}},
          },
        },
        g: {
          hello: 'world',
        },
      },
      'hello',
    );
    expect(pluckedValue).toBe('world');
  });

  it('will return null if the key is not found', () => {
    const pluckedValue = pluckDeep(
      {
        a: {
          b: {
            c: {
              d: {},
            },
            e: {f: {}},
          },
        },
        g: {
          f: 'world',
        },
      },
      'hello',
    );
    expect(pluckedValue).toBe(null);
  });

  describe('obj argument', () => {
    it('will return null if null is supplied', () => {
      const pluckedValue = pluckDeep(null, 'hello');
      expect(pluckedValue).toBe(null);
    });
  });
});
