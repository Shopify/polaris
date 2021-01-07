import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Loading} from '../Loading';

describe('<Loading />', () => {
  const loading = mountWithAppProvider(<Loading />);
  let requestAnimationFrameSpy: jest.SpyInstance;

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    requestAnimationFrameSpy.mockImplementation((cb: () => number) => {
      cb();
      return 1;
    });
  });

  afterEach(() => {
    requestAnimationFrameSpy.mockRestore();
  });

  it('mounts', () => {
    expect(loading.exists()).toBe(true);
  });

  it('unmounts safely', () => {
    expect(() => {
      loading.unmount();
    }).not.toThrow();
  });

  it('calls requestAnimationFrame', () => {
    mountWithAppProvider(<Loading />);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
  });
});
