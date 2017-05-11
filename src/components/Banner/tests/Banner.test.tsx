import * as React from 'react';
import {shallow} from 'enzyme';
import Banner from '..';
import Button from '../../Button';

describe('<Banner />', () => {
  describe('onDismiss()', () => {
    it('is called when the dismiss button is clicked', () => {
      const spy = jest.fn();
      const banner = shallow(<Banner onDismiss={spy} />);
      banner.find(Button).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
