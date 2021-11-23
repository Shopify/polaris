import {mountWithApp} from 'tests/utilities';

import {Backdrop} from '..';

describe('<Backdrop />', () => {
  describe('onDismiss()', () => {
    it('is called when the backdrop is clicked', () => {
      const spy = jest.fn();
      const backdrop = mountWithApp(<Backdrop onClick={spy} />);
      backdrop.find('div', {onClick: spy})!.trigger('onClick');
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
