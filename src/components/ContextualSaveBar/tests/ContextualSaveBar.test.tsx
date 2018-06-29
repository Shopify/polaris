import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from '../../../../tests/utilities';
import {noop} from '../../../utilities/other';
import ContextualSaveBar from '../ContextualSaveBar';

describe('<ContextualSaveBar />', () => {
  const props = {
    saveAction: {content: 'Save', onAction: noop},
    discardAction: {content: 'Discard', onAction: noop},
    branding: {id: 'contextualsavebar-id', src: 'src/assets/shopify.png'},
    message: 'Unsaved changes',
  };

  it('sets the contextual save bar on mount when visible with correct values', () => {
    const {frame} = mountWithContext(<ContextualSaveBar {...props} visible />);
    expect(frame.setContextualSaveBar).toHaveBeenCalledWith({
      ...props,
      visible: true,
    });
  });

  it('sets the contextual save bar when visible is set to true', () => {
    const {frame, contextualSaveBar} = mountWithContext(
      <ContextualSaveBar {...props} visible={false} />,
    );
    contextualSaveBar.setProps({visible: true});
    expect(frame.setContextualSaveBar).toHaveBeenCalledWith({
      ...props,
      visible: true,
    });
  });

  it('removes the contextual save bar on mount when visible is false', () => {
    const {frame, contextualSaveBar} = mountWithContext(
      <ContextualSaveBar {...props} visible />,
    );
    contextualSaveBar.setProps({visible: false});
    expect(frame.removeContextualSaveBar).toHaveBeenCalledWith();
  });

  it('removes the contextual save bar on unmount', () => {
    const {contextualSaveBar, frame} = mountWithContext(
      <ContextualSaveBar {...props} visible />,
    );
    expect(frame.removeContextualSaveBar).not.toHaveBeenCalled();
    contextualSaveBar.unmount();

    expect(frame.removeContextualSaveBar).toHaveBeenCalled();
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
