import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from 'tests/utilities';
import {noop} from '../../../utilities/other';
import ContextualSaveBar from '../ContextualSaveBar';

describe('<ContextualSaveBar />', () => {
  const props = {
    saveAction: {content: 'Save', onAction: noop},
    discardAction: {content: 'Discard', onAction: noop},
    message: 'Unsaved changes',
  };

  it('calls the contextual save bar on mount with correct values', () => {
    const {frame} = mountWithContext(<ContextualSaveBar {...props} />);
    expect(frame.setContextualSaveBar).toHaveBeenCalledWith({
      ...props,
    });
  });

  it('removes the contextual save bar on unmount', () => {
    const {contextualSaveBar, frame} = mountWithContext(
      <ContextualSaveBar {...props} />,
    );
    expect(frame.removeContextualSaveBar).not.toHaveBeenCalled();
    contextualSaveBar.unmount();
    expect(frame.removeContextualSaveBar).toHaveBeenCalled();
  });

  it("calls the contextual save bar with correct values if it's props change after it mounted", () => {
    const {frame, contextualSaveBar} = mountWithContext(
      <ContextualSaveBar {...props} />,
    );
    expect(frame.setContextualSaveBar).toHaveBeenCalledTimes(1);
    const newProps = {
      saveAction: {content: 'Save', onAction: noop, loading: true},
      discardAction: {content: 'Discard', onAction: noop},
      message: 'Unsaved changes',
    };
    contextualSaveBar.setProps({...newProps});
    expect(frame.setContextualSaveBar).toHaveBeenCalledWith({
      ...newProps,
    });
    expect(frame.setContextualSaveBar).toHaveBeenCalledTimes(2);
  });

  it("doesnt call the contextual save bar if it's props remain unchanged after it mounted", () => {
    const {frame, contextualSaveBar} = mountWithContext(
      <ContextualSaveBar {...props} />,
    );
    expect(frame.setContextualSaveBar).toHaveBeenCalledTimes(1);
    const newProps = {...props};
    contextualSaveBar.setProps({...newProps});
    expect(frame.setContextualSaveBar).toHaveBeenCalledTimes(1);
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {
    setContextualSaveBar: jest.fn(),
    removeContextualSaveBar: jest.fn(),
  };
  const contextualSaveBar = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {contextualSaveBar, frame};
}
