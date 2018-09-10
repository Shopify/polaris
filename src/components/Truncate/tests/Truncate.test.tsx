import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Truncate from '../Truncate';

describe('<Truncate />', () => {
  it('renders its children', () => {
    const truncate = mountWithAppProvider(<Truncate>Long text</Truncate>);
    expect(truncate.contains('Long text')).toBe(true);
  });
});
