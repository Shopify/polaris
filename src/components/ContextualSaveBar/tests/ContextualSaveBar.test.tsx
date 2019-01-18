import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import {noop} from '../../../utilities/other';
import ContextualSaveBar from '../ContextualSaveBar';
import {Provider, createFrameContext} from '../../Frame';

describe('<ContextualSaveBar />', () => {
  const props = {
    saveAction: {content: 'Save', onAction: noop},
    discardAction: {content: 'Discard', onAction: noop},
    message: 'Unsaved changes',
  };

  it('calls the contextual save bar on mount with correct values', () => {
    const mockFrameContext = createFrameContext({
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    });

    mountWithAppProvider(
      <Provider value={mockFrameContext}>
        <ContextualSaveBar {...props} />
      </Provider>,
    );
    expect(mockFrameContext.frame.setContextualSaveBar).toHaveBeenCalledWith({
      ...props,
    });
  });

  it('removes the contextual save bar on unmount', () => {
    const mockFrameContext = createFrameContext({
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    });

    const frame = mountWithAppProvider(
      <Provider value={mockFrameContext}>
        <ContextualSaveBar {...props} />
      </Provider>,
    );
    expect(
      mockFrameContext.frame.removeContextualSaveBar,
    ).not.toHaveBeenCalled();
    frame.unmount();
    expect(mockFrameContext.frame.removeContextualSaveBar).toHaveBeenCalled();
  });

  it('calls the contextual save bar with correct values if its props change after it mounted', () => {
    const mockFrameContext = createFrameContext({
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    });

    const frame = mountWithAppProvider(
      <Provider value={mockFrameContext}>
        <ContextualSaveBar {...props} />
      </Provider>,
    );
    const newProps = {
      saveAction: {content: 'Save', onAction: noop, loading: true},
      discardAction: {content: 'Discard', onAction: noop},
      message: 'Unsaved changes',
    };
    frame.setProps({
      children: <ContextualSaveBar {...newProps} />,
    });
    expect(mockFrameContext.frame.setContextualSaveBar).toHaveBeenCalledWith({
      ...newProps,
    });
    expect(mockFrameContext.frame.setContextualSaveBar).toHaveBeenCalledTimes(
      2,
    );
  });

  it('doesnt call the contextual save bar if its props remain unchanged after it mounted', () => {
    const mockFrameContext = createFrameContext({
      setContextualSaveBar: jest.fn(),
      removeContextualSaveBar: jest.fn(),
    });

    const frame = mountWithAppProvider(
      <Provider value={mockFrameContext}>
        <ContextualSaveBar {...props} />
      </Provider>,
    );

    expect(mockFrameContext.frame.setContextualSaveBar).toHaveBeenCalledTimes(
      1,
    );
    const newProps = {...props};
    frame.setProps({
      children: <ContextualSaveBar {...newProps} />,
    });
    expect(mockFrameContext.frame.setContextualSaveBar).toHaveBeenCalledTimes(
      1,
    );
  });
});
