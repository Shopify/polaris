import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Loading} from '../Loading';

describe('<Loading />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts loading on mount', () => {
    const mockFrameContext = {
      startLoading: jest.fn(),
    };

    mountWithApp(<Loading />, {frame: mockFrameContext});
    expect(mockFrameContext.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const mockFrameContext = {
      stopLoading: jest.fn(),
    };
    const frame = mountWithApp(<Loading />, {frame: mockFrameContext});
    expect(mockFrameContext.stopLoading).not.toHaveBeenCalled();

    frame.unmount();
    expect(mockFrameContext.stopLoading).toHaveBeenCalled();
  });
});
