import {MouseEvent} from 'react';
import {handleMouseUpByBlurring} from '../focus';

describe('focus', () => {
  describe('handleMouseUpByBlurring()', () => {
    it('calls blur on the currentTarget', () => {
      const currentTarget = document.createElement('button');
      currentTarget.blur = jest.fn();
      handleMouseUpByBlurring({currentTarget} as MouseEvent<HTMLButtonElement>);
      expect(currentTarget.blur).toHaveBeenCalled();
    });
  });
});
