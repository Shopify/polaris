import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Loading} from '../Loading';

describe('<Loading />', () => {
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
    const loading = mountWithApp(<Loading />);
    expect(loading).not.toBeNull();
  });

  it('unmounts safely', () => {
    const loading = mountWithApp(<Loading />);

    expect(() => {
      loading.unmount();
    }).not.toThrow();
  });

  it('calls requestAnimationFrame', () => {
    mountWithApp(<Loading />);
    expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(1);
  });
});
