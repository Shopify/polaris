import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Loading} from '../Loading';

describe('<Loading />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts loading on mount', () => {
    const mockFrameContext = {
      startLoading: jest.fn(),
    };

    mountWithAppProvider(<Loading />, {frame: mockFrameContext});
    expect(mockFrameContext.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const mockFrameContext = {
      stopLoading: jest.fn(),
    };
    const frame = mountWithAppProvider(<Loading />, {frame: mockFrameContext});
    expect(mockFrameContext.stopLoading).not.toHaveBeenCalled();

    frame.unmount();
    expect(mockFrameContext.stopLoading).toHaveBeenCalled();
  });
});
