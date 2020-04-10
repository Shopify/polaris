import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {SearchDismissOverlay} from '../SearchDismissOverlay';

describe('<SearchDismissOverlay />', () => {
  it('mounts', () => {
    const search = mountWithAppProvider(
      <SearchDismissOverlay visible={false} />,
    );
    expect(search.exists()).toBe(true);
  });

  it('calls onDismiss when clicked', () => {
    const spy = jest.fn();
    const search = mountWithAppProvider(
      <SearchDismissOverlay visible={false} onDismiss={spy} />,
    );
    search.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
