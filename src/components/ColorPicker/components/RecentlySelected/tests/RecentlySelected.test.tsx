import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {RecentlySelected} from '../';

const red = {
  alpha: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const white = {
  alpha: 1,
  hue: 0,
  saturation: 0,
  brightness: 1,
};

describe('<RecentlySelected />', () => {
  describe('colors', () => {
    it('onChange is called with color when swatch is clicked', () => {
      const spy = jest.fn();
      const recentlySelected = mountWithAppProvider(
        <RecentlySelected
          currentColor={red}
          colors={[red, white]}
          onChange={spy}
        />,
      );

      recentlySelected.find('button').at(1).simulate('click');

      expect(spy).toHaveBeenCalledWith(white);
    });
  });
});
