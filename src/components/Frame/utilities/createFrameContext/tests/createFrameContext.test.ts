import {noop} from '@shopify/javascript-utilities/other';
import {createFrameContext} from '../..';

describe('createFrameContext()', () => {
  const defaultFrameContext = {
    showToast: noop,
    hideToast: noop,
    setContextualSaveBar: noop,
    removeContextualSaveBar: noop,
    startLoading: noop,
    stopLoading: noop,
  };

  it('returns the right context without arguments', () => {
    const context = createFrameContext();
    const mockContext = {
      frame: {
        ...defaultFrameContext,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with showToast', () => {
    const mockShowToast = () => {};
    const context = createFrameContext({showToast: mockShowToast});
    const mockContext = {
      frame: {
        ...defaultFrameContext,
        showToast: mockShowToast,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with hideToast', () => {
    const mockHideToast = () => {};
    const context = createFrameContext({hideToast: mockHideToast});
    const mockContext = {
      frame: {
        ...defaultFrameContext,
        hideToast: mockHideToast,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with setContextualSaveBar', () => {
    const mockSetContextualSaveBar = () => {};
    const context = createFrameContext({
      setContextualSaveBar: mockSetContextualSaveBar,
    });
    const mockContext = {
      frame: {
        ...defaultFrameContext,
        setContextualSaveBar: mockSetContextualSaveBar,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with removeContextualSaveBar', () => {
    const mockRemoveContextualSaveBar = () => {};
    const context = createFrameContext({
      removeContextualSaveBar: mockRemoveContextualSaveBar,
    });
    const mockContext = {
      frame: {
        ...defaultFrameContext,
        removeContextualSaveBar: mockRemoveContextualSaveBar,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with startLoading', () => {
    const mockStartLoading = () => {};
    const context = createFrameContext({
      startLoading: mockStartLoading,
    });
    const mockContext = {
      frame: {
        ...defaultFrameContext,
        startLoading: mockStartLoading,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with stopLoading', () => {
    const mockStopLoading = () => {};
    const context = createFrameContext({
      stopLoading: mockStopLoading,
    });
    const mockContext = {
      frame: {
        ...defaultFrameContext,
        stopLoading: mockStopLoading,
      },
    };

    expect(context).toEqual(mockContext);
  });
});
