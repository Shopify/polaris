import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from '../../../../tests/utilities';
import {noop} from '../../../utilities/other';
import ContextBar from '../ContextBar';

describe('<ContextBar />', () => {
  const props = {
    primaryAction: {content: 'Save', onAction: noop},
    cancelAction: {content: 'Discard', onAction: noop},
    branding: {id: 'contextbar-id', src: 'src/assets/shopify.png'},
    message: 'Hello',
  };

  it('sets the context bar on mount when visible with correct values', () => {
    const {frame} = mountWithContext(<ContextBar {...props} visible />);
    expect(frame.setContextBar).toHaveBeenCalledWith({
      ...props,
      visible: true,
    });
  });

  it('sets the context bar when visible is set to true', () => {
    const {frame, contextBar} = mountWithContext(
      <ContextBar {...props} visible={false} />,
    );
    contextBar.setProps({visible: true});
    expect(frame.setContextBar).toHaveBeenCalledWith({...props, visible: true});
  });

  it('removes the context bar on mount when visible is false', () => {
    const {frame, contextBar} = mountWithContext(
      <ContextBar {...props} visible />,
    );
    contextBar.setProps({visible: false});
    expect(frame.removeContextBar).toHaveBeenCalledWith();
  });

  it('removes the context bar on unmount', () => {
    const {contextBar, frame} = mountWithContext(
      <ContextBar {...props} visible />,
    );
    expect(frame.removeContextBar).not.toHaveBeenCalled();
    contextBar.unmount();

    expect(frame.removeContextBar).toHaveBeenCalled();
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {setContextBar: jest.fn(), removeContextBar: jest.fn()};
  const contextBar = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {contextBar, frame};
}
