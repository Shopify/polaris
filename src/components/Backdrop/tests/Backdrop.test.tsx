import * as React from 'react';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import BackDrop from '..';

describe('<BackDrop />', () => {
  describe('onDismiss()', () => {
    it('is called when the backdrop is clicked', () => {
      const spy = jest.fn();
      const backdrop = mountWithAppProvider(<BackDrop onClick={spy} />);
      findByTestID(backdrop, 'Backdrop').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onTouchStart()', () => {
    it('is called when the backdrop is touched', () => {
      const spy = jest.fn();
      const backdrop = mountWithAppProvider(<BackDrop onTouchStart={spy} />);
      findByTestID(backdrop, 'Backdrop').simulate('touchStart');
      expect(spy).toHaveBeenCalled();
    });
  });
});
