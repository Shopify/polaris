import React from 'react';
import {mountWithApp} from 'tests/utilities';

import * as hooks from '../hooks';
import {IndexFiltersMode} from '../types';

describe('useSetIndexFiltersMode', () => {
  it('returns mode from the provider', () => {
    const spy = jest.fn();

    function MockComponent() {
      const value = hooks.useSetIndexFiltersMode();
      spy(value);
      return null;
    }

    mountWithApp(<MockComponent />, {
      indexFilters: {
        mode: IndexFiltersMode.Filtering,
      },
    });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: IndexFiltersMode.Filtering,
      }),
    );
  });

  describe('with a mocked value', () => {
    it('calls setMode with defaultMode inside useEffect', () => {
      const initialMode = IndexFiltersMode.EditingColumns;
      const useSetIndexFiltersModeMock = jest.spyOn(
        hooks,
        'useSetIndexFiltersMode',
      );

      function MockComponent() {
        hooks.useSetIndexFiltersMode(initialMode);
        return null;
      }
      mountWithApp(<MockComponent />);

      expect(useSetIndexFiltersModeMock).toHaveBeenCalledTimes(1);
      expect(useSetIndexFiltersModeMock).toHaveBeenCalledWith(initialMode);
    });
  });
});
