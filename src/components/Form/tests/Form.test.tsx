import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
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
      const wrapper = mountWithAppProvider(
        <Form acceptCharset={acceptCharset} onSubmit={noop} />,
      );
      expect(wrapper.prop('acceptCharset')).toBe(acceptCharset);
    });
  });

  describe('action', () => {
    it('sets the action attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form action={action} onSubmit={noop} />,
      );
      expect(wrapper.prop('action')).toBe(action);
    });
  });

  describe('autoComplete', () => {
    it('sets the autocomplete attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form autoComplete={false} onSubmit={noop} />,
      );
      expect(wrapper.prop('autoComplete')).toBe(false);
    });
  });

  describe('encType', () => {
    it('sets the encType attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form encType={encType} onSubmit={noop} />,
      );
      expect(wrapper.prop('encType')).toBe(encType);
    });
  });

  describe('implicitSubmit', () => {
    it('renders a button when the prop is set to true', () => {
      const wrapper = mountWithAppProvider(<Form onSubmit={noop} />);
      expect(wrapper.find('button')).toHaveLength(1);
    });

    it('does not render a button when the prop is set to false', () => {
      const wrapper = mountWithAppProvider(
        <Form onSubmit={noop} implicitSubmit={false} />,
      );
      expect(wrapper.find('button')).toHaveLength(0);
    });
  });

  describe('method', () => {
    it('sets the method attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form method={method} onSubmit={noop} />,
      );
      expect(wrapper.prop('method')).toBe(method);
    });
  });

  describe('name', () => {
    it('sets the name attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form name={name} onSubmit={noop} />,
      );
      expect(wrapper.prop('name')).toBe(name);
    });
  });

  describe('noValidate', () => {
    it('sets the noValidate attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form noValidate={noValidate} onSubmit={noop} />,
      );
      expect(wrapper.prop('noValidate')).toBe(noValidate);
    });
  });

  describe('onSubmit', () => {
    it('is called when the form is submitted', () => {
      const spy = jest.fn();
      const wrapper = mountWithAppProvider(<Form onSubmit={spy} />);
      wrapper.simulate('submit');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('preventDefault', () => {
    it('sets the preventDefault attribute when provided', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mountWithAppProvider(
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

      const wrapper = mountWithAppProvider(<Form onSubmit={onSubmitSpy} />);

      wrapper.simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('submits the form with preventDefault when the prop is set to true', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mountWithAppProvider(
        <Form preventDefault onSubmit={onSubmitSpy} />,
      );

      wrapper.simulate('submit', {
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('target', () => {
    it('sets the target attribute when provided', () => {
      const wrapper = mountWithAppProvider(
        <Form target={target} onSubmit={noop} />,
      );
      expect(wrapper.prop('target')).toBe(target);
    });
  });
});
