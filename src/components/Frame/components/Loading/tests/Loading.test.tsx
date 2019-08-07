import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import Loading from '../Loading';

describe('<Loading />', () => {
  const loading = mountWithAppProvider(<Loading />);

  it('mounts', () => {
    expect(loading.exists()).toBe(true);
  });

  it('unmounts safely', () => {
    expect(() => {
      loading.unmount();
    }).not.toThrow();
  });
});
