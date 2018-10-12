import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider, createPolarisProps} from 'tests/utilities';

import {noop} from '../../../utilities/other';

import Toast from '../Toast';

describe('<Toast />', () => {
  it('shows the toast with a unique ID on mount', () => {
    const props = {content: 'Image uploaded', onDismiss: noop};
    const composedProps = {
      ...props,
      ...createPolarisProps(),
    };
    const {frame} = mountWithContext(<Toast {...props} />);
    expect(frame.showToast).toHaveBeenCalledWith({
      id: expect.any(String),
      ...composedProps,
    });
  });

  it('hides the toast based on ID on unmount', () => {
    const {toast, frame} = mountWithContext(
      <Toast content="Message sent" onDismiss={noop} />,
    );
    expect(frame.hideToast).not.toHaveBeenCalled();
    toast.unmount();

    const {id} = frame.showToast.mock.calls[0][0];
    expect(frame.hideToast).toHaveBeenCalledWith({id});
  });

  it('shows easdk flash notice content on mount', () => {
    const content = 'Message sent';
    const {easdk} = mountWithEasdk(
      <Toast content={content} onDismiss={noop} />,
    );
    expect(easdk.showFlashNotice).toHaveBeenCalledWith(content, {
      error: undefined,
    });
  });

  it('shows easdk flash error content on mount', () => {
    const content = 'Message sent';
    const {easdk} = mountWithEasdk(
      <Toast content={content} onDismiss={noop} error />,
    );
    expect(easdk.showFlashNotice).toHaveBeenCalledWith(content, {
      error: true,
    });
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {showToast: jest.fn(), hideToast: jest.fn()};
  const toast = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {toast, frame};
}

function mountWithEasdk(element: React.ReactElement<any>) {
  const easdk = {showFlashNotice: jest.fn()};
  const toast = mountWithAppProvider(element, {
    context: {frame: {}, easdk},
    childContextTypes: {frame: PropTypes.any},
  });

  return {toast, easdk};
}
