import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Portal from '../Portal';

describe('<Portal />', () => {
  it('renders a div', () => {
    const portal = mountWithAppProvider(<Portal />);
    expect(document.querySelector('[data-portal-id]')).not.toBe(null);
    portal.unmount();
    expect(document.querySelector('[data-portal-id]')).toBe(null);
  });
});
