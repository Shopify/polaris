import * as React from 'react';
import {mountWithAppProvider} from '../../../../tests/utilities';
import Indicator from '..';

describe('<Indicator />', () => {
  describe('accessibilityLabel', () => {
    it('renders a span', () => {
      const indicator = mountWithAppProvider(<Indicator />);
      expect(indicator.find('span')).toHaveLength(1);
    });
  });
});
