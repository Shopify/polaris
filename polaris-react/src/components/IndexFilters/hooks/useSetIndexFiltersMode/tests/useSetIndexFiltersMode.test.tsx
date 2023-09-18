import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {useSetIndexFiltersMode} from '../useSetIndexFiltersMode';
import {
  IndexFiltersMode,
  useIndexFiltersManager,
} from '../../../../../utilities/index-filters';

jest.mock('../../../../../utilities/index-filters', () => {
  return {
    ...jest.requireActual('../../../../../utilities/index-filters'),
    useIndexFiltersManager: jest.fn().mockReturnValue({
      mode: 'Default',
      setMode: jest.fn(),
    }),
  };
});

describe('useSetIndexFiltersMode', () => {
  it('calls setMode with defaultMode inside useEffect', () => {
    const defaultMode = IndexFiltersMode.EditingColumns;
    const setModeMock = jest.fn();
    (useIndexFiltersManager as jest.Mock).mockReturnValueOnce({
      mode: 'Default',
      setMode: setModeMock,
    });

    function MockComponent() {
      useSetIndexFiltersMode(defaultMode);
      return null;
    }
    mountWithApp(<MockComponent />);

    expect(setModeMock).toHaveBeenCalledTimes(1);
    expect(setModeMock).toHaveBeenCalledWith(defaultMode);
  });
});
