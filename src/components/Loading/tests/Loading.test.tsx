import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from 'tests/utilities';

import Loading from '../Loading';

describe('<Loading />', () => {
  it('starts loading on mount', () => {
    const {frame} = mountWithFrame(<Loading />);
    expect(frame.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const {loading, frame} = mountWithFrame(<Loading />);
    expect(frame.stopLoading).not.toHaveBeenCalled();

    loading.unmount();
    expect(frame.stopLoading).toHaveBeenCalled();
  });

  it('starts easdk loading on mount', () => {
    const {easdk} = mountWithEasdk(<Loading />);
    expect(easdk.startLoading).toHaveBeenCalled();
  });

  it('stops easdk loading on unmount', () => {
    const {loading, easdk} = mountWithEasdk(<Loading />);
    expect(easdk.stopLoading).not.toHaveBeenCalled();

    loading.unmount();
    expect(easdk.stopLoading).toHaveBeenCalled();
  });
});

function mountWithFrame(element: React.ReactElement<any>) {
  const frame = {startLoading: jest.fn(), stopLoading: jest.fn()};
  const loading = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {loading, frame};
}

function mountWithEasdk(element: React.ReactElement<any>) {
  const easdk = {startLoading: jest.fn(), stopLoading: jest.fn()};
  const loading = mountWithAppProvider(element, {
    context: {frame: {}, easdk},
    childContextTypes: {frame: PropTypes.any},
  });

  return {loading, easdk};
}
