import React from 'react';
import {mount} from 'enzyme';
import {mountWithAppProvider} from 'test-utilities/legacy';
import ContextualSaveBar from '../ContextualSaveBar';

describe('<ContextualSaveBar />', () => {
  const props = {
    saveAction: {content: 'Save', onAction: noop},
    discardAction: {content: 'Discard', onAction: noop},
    message: 'Unsaved changes',
  };

  it('calls the contextual save bar on mount with values', () => {
    const mockFrameContext = {
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    };

    mountWithAppProvider(<ContextualSaveBar {...props} />, {
      frame: mockFrameContext,
    });
    expect(mockFrameContext.setContextualSaveBar).toHaveBeenCalledWith({
      ...props,
    });
  });

  it('removes the contextual save bar on unmount', () => {
    const mockFrameContext = {
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    };

    const frame = mountWithAppProvider(<ContextualSaveBar {...props} />, {
      frame: mockFrameContext,
    });
    expect(mockFrameContext.removeContextualSaveBar).not.toHaveBeenCalled();
    frame.unmount();
    expect(mockFrameContext.removeContextualSaveBar).toHaveBeenCalled();
  });

  it('calls the contextual save bar with values if its props change after it mounted', () => {
    const mockFrameContext = {
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    };

    const contextualSaveBar = mountWithAppProvider(
      <ContextualSaveBar {...props} />,
      {frame: mockFrameContext},
    );
    const newProps = {
      saveAction: {content: 'Save', onAction: noop, loading: true},
      discardAction: {content: 'Discard', onAction: noop},
      message: 'Unsaved changes',
    };
    contextualSaveBar.setProps(newProps);
    expect(mockFrameContext.setContextualSaveBar).toHaveBeenCalledWith(
      newProps,
    );
    expect(mockFrameContext.setContextualSaveBar).toHaveBeenCalledTimes(2);
  });

  it('doesnt call the contextual save bar if its props remain unchanged after it mounted', () => {
    const mockFrameContext = {
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    };

    const contextualSaveBar = mountWithAppProvider(
      <ContextualSaveBar {...props} />,
      {frame: mockFrameContext},
    );

    expect(mockFrameContext.setContextualSaveBar).toHaveBeenCalledTimes(1);
    contextualSaveBar.setProps({...props});
    expect(mockFrameContext.setContextualSaveBar).toHaveBeenCalledTimes(1);
  });

  it("doesn't call setContextualSave when frame is not defined", () => {
    function fn() {
      mount(<ContextualSaveBar {...props} />);
    }

    expect(fn).not.toThrow();
  });

  it("doesn't call removeContextualSave when frame is not defined", () => {
    function fn() {
      const contextualSavebar = mount(<ContextualSaveBar {...props} />);
      contextualSavebar.unmount();
    }

    expect(fn).not.toThrow();
  });
});

function noop() {}
