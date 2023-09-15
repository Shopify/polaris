import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {useIndexFiltersManager} from '../hooks';
import {IndexFiltersContext} from '../context';
import {IndexFiltersMode} from '../types';

describe('useIndexFiltersManager', () => {
  it('returns mode from the provider', () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = useIndexFiltersManager();
      spy(value);
      return null;
    }

    mountWithApp(
      <IndexFiltersContext.Provider
        value={{mode: IndexFiltersMode.Default, setMode: jest.fn()}}
      >
        <MockComponent />
      </IndexFiltersContext.Provider>,
    );

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: IndexFiltersMode.Default,
      }),
    );
  });
});
