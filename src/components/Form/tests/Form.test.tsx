import * as React from 'react';
import {mount} from 'enzyme';
import {noop} from '@shopify/javascript-utilities/other';
import Form from '../Form';

const name = 'form-name';
const noValidate = true;

const acceptCharset = 'UTF-8';
const action = 'shopifyapi.com';
const encType = 'text/plain';
const method = 'get';
const target = '_blank';

describe('<Form />', () => {
  describe('acceptCharset', () => {
    it('sets the acceptCharset attribute when provided', () => {
      const wrapper = mount(
        <Form acceptCharset={acceptCharset} onSubmit={noop} />,
      );
      expect(wrapper.prop('acceptCharset')).toBe(acceptCharset);
    });
  });

  describe('action', () => {
    it('sets the action attribute when provided', () => {
      const wrapper = mount(<Form action={action} onSubmit={noop} />);
      expect(wrapper.prop('action')).toBe(action);
    });
  });

  describe('autoComplete', () => {
    it('sets the autocomplete attribute when provided', () => {
      const wrapper = mount(<Form autoComplete={false} onSubmit={noop} />);
      expect(wrapper.prop('autoComplete')).toBe(false);
    });
  });

  describe('encType', () => {
    it('sets the encType attribute when provided', () => {
      const wrapper = mount(<Form encType={encType} onSubmit={noop} />);
      expect(wrapper.prop('encType')).toBe(encType);
    });
  });

  describe('method', () => {
    it('sets the method attribute when provided', () => {
      const wrapper = mount(<Form method={method} onSubmit={noop} />);
      expect(wrapper.prop('method')).toBe(method);
    });
  });

  describe('name', () => {
    it('sets the name attribute when provided', () => {
      const wrapper = mount(<Form name={name} onSubmit={noop} />);
      expect(wrapper.prop('name')).toBe(name);
    });
  });

  describe('noValidate', () => {
    it('sets the noValidate attribute when provided', () => {
      const wrapper = mount(<Form noValidate={noValidate} onSubmit={noop} />);
      expect(wrapper.prop('noValidate')).toBe(noValidate);
    });
  });

  describe('onSubmit', () => {
    it('is called when the form is submitted', () => {
      const spy = jest.fn();
      const wrapper = mount(<Form onSubmit={spy} />);
      wrapper.simulate('submit');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('preventDefault', () => {
    it('sets the preventDefault attribute when provided', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mount(
        <Form preventDefault={false} onSubmit={onSubmitSpy} />,
      );

      wrapper.simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('submits the form with preventDefault when the prop is not provided', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mount(<Form onSubmit={onSubmitSpy} />);

      wrapper.simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('submits the form with preventDefault when the prop is set to true', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mount(<Form preventDefault onSubmit={onSubmitSpy} />);

      wrapper.simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('target', () => {
    it('sets the target attribute when provided', () => {
      const wrapper = mount(<Form target={target} onSubmit={noop} />);
      expect(wrapper.prop('target')).toBe(target);
    });
  });
});
