import React from 'react';
import {mountWithApp} from 'tests/utilities';

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

  describe('url', () => {
    it('renders an anchor tag when url is provided', () => {
      const tag = mountWithApp(<Tag url="#" disabled />);
      expect(tag).toContainReactComponent('a', {href: '#'});
    });

    it('allows url and onRemove props at the same time', () => {
      const spy = jest.fn();
      const tag = mountWithApp(<Tag onRemove={spy} url="#" />);
      tag.find('button')!.domNode!.click();
      expect(spy).toHaveBeenCalled();
      expect(tag).toContainReactComponent('a', {href: '#'});
    });
  });
});
