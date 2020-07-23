import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Toast} from '../Toast';

describe('<Toast />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows the toast with a unique ID on mount', () => {
    const mockFrameContext = {
      showToast: jest.fn(),
    };

    const props = {content: 'Image uploaded', onDismiss: noop};
    mountWithAppProvider(<Toast {...props} />, {
      frame: mockFrameContext,
    });

    expect(mockFrameContext.showToast).toHaveBeenCalledWith(
      expect.objectContaining({id: expect.any(String), ...props}),
    );
  });

  it('hides the toast based on ID on unmount', () => {
    const mockFrameContext = {
      hideToast: jest.fn(),
    };

    const frame = mountWithAppProvider(
      <Toast content="Message sent" onDismiss={noop} />,
      {frame: mockFrameContext},
    );

    expect(mockFrameContext.hideToast).not.toHaveBeenCalled();
    frame.unmount();

    const mockHideToast = mockFrameContext.hideToast as jest.Mock;
    const {id} = mockHideToast.mock.calls[0][0];
    expect(mockFrameContext.hideToast).toHaveBeenCalledWith({id});
  });
});

function noop() {}
