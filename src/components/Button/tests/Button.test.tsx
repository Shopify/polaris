import * as React from 'react';
import {shallowWithAppProvider} from '../../../../tests/utilities';

import Button from '..';
import UnstyledLink from '../../UnstyledLink';

describe('<Button />', () => {
  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const spy = jest.fn();
      shallowWithAppProvider(<Button onClick={spy}>Test</Button>).simulate(
        'click',
      );
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focused', () => {
      const spy = jest.fn();
      shallowWithAppProvider(<Button onFocus={spy}>Test</Button>).simulate(
        'focus',
      );
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const spy = jest.fn();
      shallowWithAppProvider(<Button onBlur={spy}>Test</Button>).simulate(
        'blur',
      );
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallowWithAppProvider(
        <Button disabled>Disabled test</Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('sets the disabled attribute on the button', () => {
      const button = shallowWithAppProvider(
        <Button disabled={false}>Disabled test</Button>,
      );
      expect(button.find('button').prop('disabled')).toBeFalsy();
    });

    it('does not unset the disabled attribute on the button when loading', () => {
      const button = shallowWithAppProvider(
        <Button loading disabled={false}>
          Disabled test
        </Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });
  });

  describe('loading', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallowWithAppProvider(
        <Button loading>Loading test</Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('does not set the disabled attribute on the button when false', () => {
      const button = shallowWithAppProvider(
        <Button loading={false}>Loading test</Button>,
      );
      expect(button.find('button').prop('disabled')).toBeFalsy();
    });

    it('does not unset the disabled attribute on the button', () => {
      const button = shallowWithAppProvider(
        <Button disabled loading={false}>
          Loading test
        </Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });
  });

  describe('submit', () => {
    it('sets the button’s type to submit', () => {
      const button = shallowWithAppProvider(
        <Button submit>Submit test</Button>,
      );
      expect(button.find('button').prop('type')).toBe('submit');
    });

    it('sets the button’s type to button when submit is not true', () => {
      let button = shallowWithAppProvider(<Button>Button test</Button>);
      expect(button.find('button').prop('type')).toBe('button');

      button = shallowWithAppProvider(
        <Button submit={false}>Button test</Button>,
      );
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the aria-label on the button', () => {
      const button = shallowWithAppProvider(
        <Button accessibilityLabel="This deletes a thing" icon="delete" />,
      );
      expect(button.find('button').prop('aria-label')).toBe(
        'This deletes a thing',
      );
    });

    it('sets the aria-controls on the button', () => {
      const button = shallowWithAppProvider(
        <Button ariaControls="controler-id" icon="delete" />,
      );
      expect(button.find('button').prop('aria-controls')).toBe('controler-id');
    });

    it('sets the aria-expanded on the button', () => {
      const button = shallowWithAppProvider(
        <Button ariaExpanded icon="delete" />,
      );
      expect(button.find('button').prop('aria-expanded')).toBe(true);
    });
  });

  describe('id', () => {
    it('is passed down to an underlying button', () => {
      const id = 'MyID';
      const button = shallowWithAppProvider(<Button id={id}>Button</Button>);

      expect(button.find('button').prop('id')).toBe(id);
    });

    it('is passed down to an underlying link button', () => {
      const id = 'MyID';
      const button = shallowWithAppProvider(
        <Button url="https://shopify.com" id={id}>
          Button
        </Button>,
      );

      expect(button.find(UnstyledLink).prop('id')).toBe(id);
    });
  });
});
