import * as React from 'react';
import {shallow} from 'enzyme';
import Indicator from '../Indicator';

describe('<Indicator />', () => {
  describe('active', () => {
    it('set to false will cause the indicator to render null', () => {
      const element = shallow(<Indicator active={false} />);
      expect(element.html()).toBeNull();
    });

    it('set to true will cause the indicator to render', () => {
      const element = shallow(<Indicator active />);
      expect(element.html()).toContain('span');
    });
  });
});
