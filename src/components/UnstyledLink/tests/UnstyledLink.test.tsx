import * as React from 'react';
import {shallow} from 'enzyme';
import UnstyledLink from '..';

describe('<UnstyledLink />', () => {
  describe('external', () => {
    it('adds the correct attributes', () => {
      const anchorElement = shallow(
        <UnstyledLink external url="https://shopify.com" />,
      ).find('a');
      expect(anchorElement.prop('target')).toBe('_blank');
      expect(anchorElement.prop('rel')).toBe('noopener noreferrer');
    });
  });
});
