import {mountWithApp} from 'tests/utilities';

import {Form} from '../Form';

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
      const wrapper = mountWithApp(
        <Form acceptCharset={acceptCharset} onSubmit={noop} />,
      );
      expect(wrapper).toContainReactComponent('form', {acceptCharset});
    });
  });

  describe('action', () => {
    it('sets the action attribute when provided', () => {
      const wrapper = mountWithApp(<Form action={action} onSubmit={noop} />);
      expect(wrapper).toContainReactComponent('form', {action});
    });
  });

  describe('autoComplete', () => {
    it('sets the autocomplete attribute to "off" when provided as false', () => {
      const wrapper = mountWithApp(
        <Form autoComplete={false} onSubmit={noop} />,
      );
      expect(wrapper).toContainReactComponent('form', {autoComplete: 'off'});
    });
  });

  describe('encType', () => {
    it('sets the encType attribute when provided', () => {
      const wrapper = mountWithApp(<Form encType={encType} onSubmit={noop} />);
      expect(wrapper).toContainReactComponent('form', {encType});
    });
  });

  describe('implicitSubmit', () => {
    it('renders a button when the prop is set to true', () => {
      const wrapper = mountWithApp(<Form onSubmit={noop} />);
      expect(wrapper).toContainReactComponentTimes('button', 1);
    });

    it('does not render a button when the prop is set to false', () => {
      const wrapper = mountWithApp(
        <Form onSubmit={noop} implicitSubmit={false} />,
      );
      expect(wrapper).not.toContainReactComponent('button');
    });
  });

  describe('method', () => {
    it('sets the method attribute when provided', () => {
      const wrapper = mountWithApp(<Form method={method} onSubmit={noop} />);
      expect(wrapper).toContainReactComponent('form', {method});
    });

    it('defaults to post when no method is set', () => {
      const wrapper = mountWithApp(<Form onSubmit={noop} />);
      expect(wrapper).toContainReactComponent('form', {method: 'post'});
    });
  });

  describe('name', () => {
    it('sets the name attribute when provided', () => {
      const wrapper = mountWithApp(<Form name={name} onSubmit={noop} />);
      expect(wrapper).toContainReactComponent('form', {name});
    });
  });

  describe('noValidate', () => {
    it('sets the noValidate attribute when provided', () => {
      const wrapper = mountWithApp(
        <Form noValidate={noValidate} onSubmit={noop} />,
      );
      expect(wrapper).toContainReactComponent('form', {noValidate});
    });
  });

  describe('onSubmit', () => {
    it('is called when the form is submitted', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(<Form onSubmit={spy} />);
      wrapper!.find('form')!.trigger('onSubmit', {preventDefault: () => {}});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('preventDefault', () => {
    it('sets the preventDefault attribute when provided', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mountWithApp(
        <Form preventDefault={false} onSubmit={onSubmitSpy} />,
      );

      wrapper!
        .find('form')!
        .trigger('onSubmit', {preventDefault: preventDefaultSpy});

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('submits the form with preventDefault when the prop is not provided', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mountWithApp(<Form onSubmit={onSubmitSpy} />);

      wrapper!
        .find('form')!
        .trigger('onSubmit', {preventDefault: preventDefaultSpy});

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('submits the form with preventDefault when the prop is set to true', () => {
      const onSubmitSpy = jest.fn();
      const preventDefaultSpy = jest.fn();

      const wrapper = mountWithApp(
        <Form preventDefault onSubmit={onSubmitSpy} />,
      );

      wrapper!
        .find('form')!
        .trigger('onSubmit', {preventDefault: preventDefaultSpy});

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('target', () => {
    it('sets the target attribute when provided', () => {
      const wrapper = mountWithApp(<Form target={target} onSubmit={noop} />);
      expect(wrapper).toContainReactComponent('form', {target});
    });
  });
});

function noop() {}
