import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {act} from 'react-dom/test-utils';
import {Loading} from '../Loading';

describe('<Loading />', () => {
  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  it('increases over time', () => {
    const loading = mountWithAppProvider(<Loading />);

    for (let i = 0; i <= 100; i++) {
      act(() => animationFrame.runFrame());
    }

    loading.update();

    expect(loading.find('.Level').prop('aria-valuenow')).toBe(26);
  });

  it('cancels the animationFrame on unmount', () => {
    const cancelAnimationFrameSpy = jest.spyOn(window, 'cancelAnimationFrame');
    const loading = mountWithAppProvider(<Loading />);

    expect(() => {
      loading.unmount();
    }).not.toThrow();

    expect(cancelAnimationFrameSpy).toHaveBeenCalledTimes(1);
  });
});
