import {MouseEvent} from 'react';
import {handleMouseUpByBlurring} from '../focus';

describe('focus', () => {
  describe('handleMouseUpByBlurring()', () => {
    it('calls blur on the currentTarget', () => {
      const currentTarget = document.createElement('button');
      currentTarget.blur = jest.fn();
      const mouseEvent = {currentTarget};
      handleMouseUpByBlurring(mouseEvent as MouseEvent<HTMLButtonElement>);
      expect(currentTarget.blur).toHaveBeenCalled();
    });
  });
});
