import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Scrollable from '../Scrollable';

describe('<Scrollable />', () => {
  it('mounts', () => {
    const mounted = mountWithAppProvider(<Scrollable />);
    expect(mounted).toBeTruthy();
  });
});
