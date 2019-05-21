import {MouseEvent} from 'react';
import {handleMouseUpByBlurring} from '../focus';

describe('focus', () => {
  describe('handleMouseUpByBlurring()', () => {
    it('calls blur on the currentTarget', () => {
      const currentTarget = document.createElement('button');
      jest.spyOn(currentTarget, 'blur');
      const mouseEvent = {currentTarget};
      handleMouseUpByBlurring(mouseEvent as MouseEvent<HTMLButtonElement>);
      expect(currentTarget.blur).toHaveBeenCalled();
    });
  });
});
