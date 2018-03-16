import * as React from 'react';
import {mount} from 'enzyme';
import {noop} from '@shopify/javascript-utilities/other';
import Form from '../Form';

const autoComplete = 'off';
const name = 'form-name';
const noValidate = true;

describe('<Form />', () => {
  describe('onSubmit', () => {
    it('is called when the form is submitted', () => {
      const spy = jest.fn();
      const wrapper = mount(<Form onSubmit={spy} />);
      wrapper.simulate('submit');

      expect(spy).toHaveBeenCalled();
    });

    it('submits the form with preventDefault', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mount(<Form onSubmit={onSubmitSpy} />);

      wrapper.simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('autoComplete', () => {
    it('sets the autocomplete attribute when provided', () => {
      const wrapper = mount(<Form autoComplete={autoComplete} onSubmit={noop} />);
      expect(wrapper.prop('autoComplete')).toBe(autoComplete);
    });
  });

  describe('name', () => {
    it('sets the name attribute when provided', () => {
      const wrapper = mount(<Form name={name} onSubmit={noop} />);
      expect(wrapper.prop('name')).toBe(name);
    });
  });

  describe('noValidate', () => {
    it('sets the nocalidate attribute when provided', () => {
      const wrapper = mount(<Form noValidate={noValidate} onSubmit={noop} />);
      expect(wrapper.prop('noValidate')).toBe(noValidate);
    });
  });
});
