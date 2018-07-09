import * as React from 'react';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import Loading from '../Loading';

describe('<Loading />', () => {
  const loading = mountWithAppProvider(<Loading />);

  it('mounts', () => {
    expect(loading.exists()).toBe(true);
  });
});
