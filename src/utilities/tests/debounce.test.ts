import {clock} from '@shopify/jest-dom-mocks';
import debounce from '../debounce';

const DELAY = 5;

describe('#debounce', () => {
  beforeEach(() => {
    clock.mock();
  });

  afterEach(() => {
    clock.restore();
  });

  it('passes args', () => {
    const spy = jest.fn();

    const debounceLeading = debounce(spy, DELAY, {
      leading: true,
      trailing: false,
    });
    debounceLeading.call(window, 'foo');

    expect(spy).toHaveBeenCalledWith('foo');
  });

  it('prevents callback within wait period', () => {
    const spy = jest.fn();
    const debounceTrailing = debounce(spy, DELAY);
    debounceTrailing();
    debounceTrailing();
    clock.tick(DELAY);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('continues to prevent callback if triggered within wait period', () => {
    const spy = jest.fn();
    const debounceTrailing = debounce(spy, DELAY);
    debounceTrailing();
    clock.tick(DELAY - 1);
    debounceTrailing();
    clock.tick(DELAY - 1);
    debounceTrailing();
    clock.tick(DELAY);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('allows callback after wait period', () => {
    const spy = jest.fn();
    const debounceTrailing = debounce(spy, DELAY);
    debounceTrailing();
    clock.tick(DELAY);
    debounceTrailing();
    clock.tick(DELAY);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('callback on the leading edge only', () => {
    const spy = jest.fn();
    const debounceLeading = debounce(spy, DELAY, {
      leading: true,
      trailing: false,
    });
    debounceLeading();

    expect(spy).toHaveBeenCalledTimes(1);
    clock.tick(DELAY);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('callback after reset on the leading edge', () => {
    const spy = jest.fn();
    const debounceLeading = debounce(spy, DELAY, {
      leading: true,
      trailing: false,
    });
    debounceLeading();
    clock.tick(DELAY);
    debounceLeading();

    expect(spy).toHaveBeenCalledTimes(2);
    clock.tick(DELAY);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('callback on the trailing edge only', () => {
    const spy = jest.fn();
    const debounceTrailing = debounce(spy, DELAY);
    debounceTrailing();

    expect(spy).not.toHaveBeenCalled();
    clock.tick(DELAY);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('callback on the leading and trailing edge called if triggered twice', () => {
    const spy = jest.fn();
    const debounceLeadingAndTrailing = debounce(spy, DELAY, {
      leading: true,
      trailing: true,
    });
    debounceLeadingAndTrailing();
    debounceLeadingAndTrailing();

    expect(spy).toHaveBeenCalledTimes(1);
    clock.tick(DELAY);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('callback on the leading and trailing edge called only on leading edge if triggered once', () => {
    const spy = jest.fn();
    const debounceLeadingAndTrailing = debounce(spy, DELAY, {
      leading: true,
      trailing: true,
    });
    debounceLeadingAndTrailing();

    expect(spy).toHaveBeenCalledTimes(1);
    clock.tick(DELAY);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('callback after reset on the leading and trailing edge called only on leading edge if triggered once', () => {
    const spy = jest.fn();
    const debounceLeadingAndTrailing = debounce(spy, DELAY, {
      leading: true,
      trailing: true,
    });
    debounceLeadingAndTrailing();
    clock.tick(DELAY);
    debounceLeadingAndTrailing();

    expect(spy).toHaveBeenCalledTimes(2);
    clock.tick(DELAY);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('will not callback if both leading and trailing edge are false', () => {
    const spy = jest.fn();
    const fn = debounce(spy, 1, {leading: false, trailing: false});

    fn();

    expect(spy).not.toHaveBeenCalled();
    clock.tick(DELAY);
    expect(spy).not.toHaveBeenCalled();
  });
});
