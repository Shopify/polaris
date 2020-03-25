import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Indicator} from '../Indicator';

describe('<Indicator />', () => {
  describe('accessibilityLabel', () => {
    it('renders a span', () => {
      const indicator = mountWithAppProvider(<Indicator />);
      expect(indicator.find('span')).toHaveLength(1);
    });
  });
});
