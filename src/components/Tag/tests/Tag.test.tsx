import React from 'react';
import {mountWithApp} from 'test-utilities';

import {Tag} from '../Tag';

describe('<Tag />', () => {
  describe('onRemove', () => {
    it('calls onRemove when remove button is clicked', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onRemove={spy} />);
      tag.find('button')!.domNode!.click();
      expect(spy).toHaveBeenCalled();
    });

    it('does not call onRemove when remove button is disabled', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onRemove={spy} disabled />);
      tag.find('button')!.domNode!.click();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onClick', () => {
    it('calls onClick when tag is clicked', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onClick={spy} />);
      tag.find('button')!.domNode!.click();
      expect(spy).toHaveBeenCalled();
    });

    it('does not call onClick when disabled', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onClick={spy} disabled />);
      tag.find('button')!.domNode!.click();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
