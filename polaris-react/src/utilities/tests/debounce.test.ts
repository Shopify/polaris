import {debounce} from '../debounce';

const identity = (value: any) => value;

describe('debounce', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('debounces a function', () => {
    let callCount = 0;

    const debounced = debounce((value: any) => {
      ++callCount;
      return value;
    }, 32);

    let results = [debounced('a'), debounced('b'), debounced('c')];
    expect(results).toStrictEqual([undefined, undefined, undefined]);
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(128);

    expect(callCount).toBe(1);
    results = [debounced('d'), debounced('e'), debounced('f')];
    expect(results).toStrictEqual(['c', 'c', 'c']);
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(128);

    expect(callCount).toBe(2);
  });

  it('subsequent debounced calls return the last `func` result', () => {
    const debounced = debounce(identity, 32);
    debounced('a');

    jest.advanceTimersByTime(64);
    expect(debounced('b')).not.toBe('b');
    jest.advanceTimersByTime(64);
    expect(debounced('c')).not.toBe('c');
  });

  it('does not immediately call `func` when `wait` is `0`', () => {
    let callCount = 0;
    const debounced = debounce(() => {
      ++callCount;
    }, 0);

    debounced();
    debounced();
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(5);
    expect(callCount).toBe(1);
  });

  it('applies default options', () => {
    let callCount = 0;
    const debounced = debounce(
      () => {
        callCount++;
      },
      32,
      {},
    );

    debounced();
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(64);
    expect(callCount).toBe(1);
  });

  it('supports a `leading` option', () => {
    const callCounts = [0, 0];

    const withLeading = debounce(
      () => {
        callCounts[0]++;
      },
      32,
      {leading: true},
    );

    const withLeadingAndTrailing = debounce(
      () => {
        callCounts[1]++;
      },
      32,
      {leading: true},
    );

    withLeading();
    expect(callCounts[0]).toBe(1);

    withLeadingAndTrailing();
    withLeadingAndTrailing();
    expect(callCounts[1]).toBe(1);

    jest.advanceTimersByTime(64);
    expect(callCounts).toStrictEqual([1, 2]);

    withLeading();
    expect(callCounts[0]).toBe(2);
  });

  it('subsequent leading debounced calls return the last `func` result', () => {
    const debounced = debounce(identity, 32, {leading: true, trailing: false});
    let results = [debounced('a'), debounced('b')];

    expect(results).toStrictEqual(['a', 'a']);

    jest.advanceTimersByTime(64);

    results = [debounced('c'), debounced('d')];
    expect(results).toStrictEqual(['c', 'c']);
  });

  it('supports a `trailing` option', () => {
    let withCount = 0;
    let withoutCount = 0;

    const withTrailing = debounce(
      () => {
        withCount++;
      },
      32,
      {trailing: true},
    );

    const withoutTrailing = debounce(
      () => {
        withoutCount++;
      },
      32,
      {trailing: false},
    );

    withTrailing();
    expect(withCount).toBe(0);

    withoutTrailing();
    expect(withoutCount).toBe(0);

    jest.advanceTimersByTime(64);
    expect(withCount).toBe(1);
    expect(withoutCount).toBe(0);
  });

  it('supports a `maxWait` option', () => {
    let callCount = 0;

    const debounced = debounce(
      function () {
        ++callCount;
      },
      32,
      {maxWait: 64},
    );

    debounced();
    debounced();
    expect(callCount).toBe(0);

    jest.advanceTimersByTime(128);
    expect(callCount).toBe(1);

    debounced();
    debounced();
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(128);

    expect(callCount).toBe(2);
  });

  it('supports `maxWait` in a tight loop', () => {
    const limit = 1000;
    let withCount = 0;
    let withoutCount = 0;

    const withMaxWait = debounce(
      () => {
        withCount++;
      },
      64,
      {maxWait: 128},
    );

    const withoutMaxWait = debounce(() => {
      withoutCount++;
    }, 96);

    let i = 0;
    while (i < limit) {
      i++;
      withMaxWait();
      withoutMaxWait();
      jest.advanceTimersByTime(1);
    }

    const actual = [Boolean(withoutCount), Boolean(withCount)];

    expect(actual).toStrictEqual([false, true]);
  });

  it('queues a trailing call for subsequent debounced calls after `maxWait`', () => {
    let callCount = 0;

    const debounced = debounce(
      () => {
        ++callCount;
      },
      200,
      {maxWait: 200},
    );

    debounced();

    jest.advanceTimersByTime(190);
    debounced();

    jest.advanceTimersByTime(10);
    debounced();

    jest.advanceTimersByTime(10);
    debounced();

    jest.advanceTimersByTime(290);

    expect(callCount).toBe(2);
  });

  it('cancels `maxDelayed` when `delayed` is invoked', () => {
    let callCount = 0;

    const debounced = debounce(
      () => {
        callCount++;
      },
      32,
      {maxWait: 64},
    );

    debounced();

    jest.advanceTimersByTime(128);

    debounced();
    expect(callCount).toBe(1);

    jest.advanceTimersByTime(64);
    expect(callCount).toBe(2);
  });

  it('invokes the trailing call with the arguments and `this` binding', () => {
    let actual;
    let callCount = 0;
    const object = {};

    const debounced = debounce(
      function (this: unknown, ...args) {
        actual = [this];
        Array.prototype.push.apply(actual, args);
        return ++callCount !== 2;
      },
      32,
      {leading: true, maxWait: 64},
    );

    while (true) {
      if (!debounced.call(object, 'a')) {
        break;
      }
      jest.advanceTimersByTime(1);
    }

    expect(callCount).toBe(2);
    expect(actual).toStrictEqual([object, 'a']);
  });
});
