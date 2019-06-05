import {clock} from '@shopify/jest-dom-mocks';
import throttle from '../throttle';

const DELAY = 5;

describe('#throttle', () => {
  beforeEach(() => {
    clock.mock();
  });

  afterEach(() => {
    clock.restore();
  });

  it('prevents callback within throttle delay', () => {
    const spy = jest.fn();
    const throttleDefault = throttle(spy, DELAY, {
      leading: false,
      trailing: false,
    });
    throttleDefault();
    clock.tick(DELAY - 1);
    throttleDefault();
    clock.tick(DELAY - 1);
    throttleDefault();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('resets after throttle delay has passed', () => {
    const spy = jest.fn();
    const throttleDefault = throttle(spy, DELAY, {
      leading: false,
      trailing: false,
    });

    throttleDefault();
    clock.tick(DELAY + 1);
    throttleDefault();

    expect(spy).not.toHaveBeenCalled();
  });
});
