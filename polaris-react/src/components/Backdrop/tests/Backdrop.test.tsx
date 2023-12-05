import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Backdrop} from '..';

describe('<Backdrop />', () => {
  describe('onClick()', () => {
    it('is called when the backdrop is clicked', () => {
      const spy = jest.fn();
      const backdrop = mountWithApp(<Backdrop onClick={spy} />);
      backdrop.find('div')!.trigger('onClick');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('setClosing()', () => {
    it('is called when the backdrop is clicked', () => {
      const spy = jest.fn();
      const backdrop = mountWithApp(<Backdrop setClosing={spy} />);
      backdrop.find('div')!.trigger('onClick');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onTouchStart()', () => {
    it('is called when the backdrop is touched', () => {
      const spy = jest.fn();
      const backdrop = mountWithApp(<Backdrop onTouchStart={spy} />);
      backdrop.find('div', {onTouchStart: spy})!.trigger('onTouchStart');
      expect(spy).toHaveBeenCalled();
    });
  });
});
