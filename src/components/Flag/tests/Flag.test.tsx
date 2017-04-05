import * as React from 'react';
import {shallow} from 'enzyme';
import Flag from '../Flag';

describe('<Flag />', () => {
  describe('label', () => {
    it('has an empty alt tag by default', () => {
      const alt = shallow(<Flag />).find('img').prop('alt');
      expect(alt).toBe('');
    });

    it('uses the label for the alt text', () => {
      const alt = shallow(<Flag label="My country" />).find('img').prop('alt');
      expect(alt).toBe('My country');
    });
  });
});
