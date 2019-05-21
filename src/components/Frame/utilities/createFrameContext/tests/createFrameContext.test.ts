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

    expect(context).toStrictEqual(defaultFrameContext);
  });

  it('returns the right context with showToast', () => {
    const mockShowToast = () => {};
    const context = createFrameContext({showToast: mockShowToast});
    const mockContext = {
      ...defaultFrameContext,
      showToast: mockShowToast,
    };

    expect(context).toStrictEqual(mockContext);
  });

  it('returns the right context with hideToast', () => {
    const mockHideToast = () => {};
    const context = createFrameContext({hideToast: mockHideToast});
    const mockContext = {
      ...defaultFrameContext,
      hideToast: mockHideToast,
    };

    expect(context).toStrictEqual(mockContext);
  });

  it('returns the right context with setContextualSaveBar', () => {
    const mockSetContextualSaveBar = () => {};
    const context = createFrameContext({
      setContextualSaveBar: mockSetContextualSaveBar,
    });
    const mockContext = {
      ...defaultFrameContext,
      setContextualSaveBar: mockSetContextualSaveBar,
    };

    expect(context).toStrictEqual(mockContext);
  });

  it('returns the right context with removeContextualSaveBar', () => {
    const mockRemoveContextualSaveBar = () => {};
    const context = createFrameContext({
      removeContextualSaveBar: mockRemoveContextualSaveBar,
    });
    const mockContext = {
      ...defaultFrameContext,
      removeContextualSaveBar: mockRemoveContextualSaveBar,
    };

    expect(context).toStrictEqual(mockContext);
  });

  it('returns the right context with startLoading', () => {
    const mockStartLoading = () => {};
    const context = createFrameContext({
      startLoading: mockStartLoading,
    });
    const mockContext = {
      ...defaultFrameContext,
      startLoading: mockStartLoading,
    };

    expect(context).toStrictEqual(mockContext);
  });

  it('returns the right context with stopLoading', () => {
    const mockStopLoading = () => {};
    const context = createFrameContext({
      stopLoading: mockStopLoading,
    });
    const mockContext = {
      ...defaultFrameContext,
      stopLoading: mockStopLoading,
    };

    expect(context).toStrictEqual(mockContext);
  });
});
