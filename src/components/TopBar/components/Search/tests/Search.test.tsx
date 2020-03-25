import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Search} from '../Search';
import {SearchDismissOverlay} from '../../SearchDismissOverlay';

describe('<Search />', () => {
  it('mounts', () => {
    const search = mountWithAppProvider(<Search />);
    expect(search.exists()).toBe(true);
  });

  it('renders its children', () => {
    const search = mountWithAppProvider(<Search>Hello Polaris</Search>);
    expect(search.text()).toContain('Hello Polaris');
  });

  it('renders a SearchDismissOverlay', () => {
    const search = mountWithAppProvider(<Search visible>Hello Polaris</Search>);
    expect(search.find(SearchDismissOverlay)).toHaveLength(1);
  });

  it('passes the overlayVisible prop to SearchDismissOverlay', () => {
    const search = mountWithAppProvider(
      <Search visible overlayVisible>
        Hello Polaris
      </Search>,
    );

    expect(search.find(SearchDismissOverlay).prop('visible')).toBe(true);
  });
});
