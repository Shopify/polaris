import * as React from 'react';
import {shallow} from 'enzyme';
import Button from '..';

describe('<Button />', () => {
  describe('onClick()', () => {
    it('is called when the button is clicked', () => {
      const spy = jest.fn();
      shallow(<Button onClick={spy}>Test</Button>).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onFocus()', () => {
    it('is called when the button is focused', () => {
      const spy = jest.fn();
      shallow(<Button onFocus={spy}>Test</Button>).simulate('focus');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBlur()', () => {
    it('is called when the button is blurred', () => {
      const spy = jest.fn();
      shallow(<Button onBlur={spy}>Test</Button>).simulate('blur');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallow(<Button disabled>Disabled test</Button>);
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('sets the disabled attribute on the button', () => {
      const button = shallow(<Button disabled={false}>Disabled test</Button>);
      expect(button.find('button').prop('disabled')).toBeFalsy();
    });

    it('does not unset the disabled attribute on the button when loading', () => {
      const button = shallow(
        <Button loading disabled={false}>
          Disabled test
        </Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });
  });

  describe('loading', () => {
    it('sets the disabled attribute on the button', () => {
      const button = shallow(<Button loading>Loading test</Button>);
      expect(button.find('button').prop('disabled')).toBe(true);
    });

    it('does not set the disabled attribute on the button when false', () => {
      const button = shallow(<Button loading={false}>Loading test</Button>);
      expect(button.find('button').prop('disabled')).toBeFalsy();
    });

    it('does not unset the disabled attribute on the button', () => {
      const button = shallow(
        <Button disabled loading={false}>
          Loading test
        </Button>,
      );
      expect(button.find('button').prop('disabled')).toBe(true);
    });
  });

  describe('submit', () => {
    it('sets the button’s type to submit', () => {
      const button = shallow(<Button submit>Submit test</Button>);
      expect(button.find('button').prop('type')).toBe('submit');
    });

    it('sets the button’s type to button when submit is not true', () => {
      let button = shallow(<Button>Button test</Button>);
      expect(button.find('button').prop('type')).toBe('button');

      button = shallow(<Button submit={false}>Button test</Button>);
      expect(button.find('button').prop('type')).toBe('button');
    });
  });

  describe('accessibilityLabel', () => {
    it('sets the aria-label on the button', () => {
      const button = shallow(
        <Button accessibilityLabel="This deletes a thing" icon="delete" />,
      );
      expect(button.find('button').prop('aria-label')).toBe(
        'This deletes a thing',
      );
    });

    it('sets the aria-controls on the button', () => {
      const button = shallow(
        <Button ariaControls="controler-id" icon="delete" />,
      );
      expect(button.find('button').prop('aria-controls')).toBe('controler-id');
    });

    it('sets the aria-expanded on the button', () => {
      const button = shallow(<Button ariaExpanded icon="delete" />);
      expect(button.find('button').prop('aria-expanded')).toBe(true);
    });
  });
});
