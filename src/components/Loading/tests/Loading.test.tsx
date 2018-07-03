import * as React from 'react';
import * as PropTypes from 'prop-types';
import {mountWithAppProvider} from '../../../../tests/utilities';

import Loading from '../Loading';

describe('<Loading />', () => {
  it('starts loading on mount', () => {
    const {frame} = mountWithContext(<Loading />);
    expect(frame.startLoading).toHaveBeenCalled();
  });

  it('stops loading on unmount', () => {
    const {loading, frame} = mountWithContext(<Loading />);
    expect(frame.stopLoading).not.toHaveBeenCalled();

    loading.unmount();
    expect(frame.stopLoading).toHaveBeenCalled();
  });
});

function mountWithContext(element: React.ReactElement<any>) {
  const frame = {startLoading: jest.fn(), stopLoading: jest.fn()};
  const loading = mountWithAppProvider(element, {
    context: {frame},
    childContextTypes: {frame: PropTypes.any},
  });

  return {loading, frame};
}
