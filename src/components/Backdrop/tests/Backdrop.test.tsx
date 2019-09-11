import React from 'react';
import {mountWithAppProvider, findByTestID} from 'test-utilities/legacy';
import {Backdrop} from '..';

describe('<Backdrop />', () => {
  describe('onDismiss()', () => {
    it('is called when the backdrop is clicked', () => {
      const spy = jest.fn();
      const backdrop = mountWithAppProvider(<Backdrop onClick={spy} />);
      findByTestID(backdrop, 'Backdrop').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onTouchStart()', () => {
    it('is called when the backdrop is touched', () => {
      const spy = jest.fn();
      const backdrop = mountWithAppProvider(<Backdrop onTouchStart={spy} />);
      findByTestID(backdrop, 'Backdrop').simulate('touchStart');
      expect(spy).toHaveBeenCalled();
    });
  });
});
