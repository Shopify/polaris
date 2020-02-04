import React from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, ReactWrapper} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {SearchField} from '../SearchField';

describe('<TextField />', () => {
  it('mounts', () => {
    const textField = mountWithAppProvider(
      <SearchField value="" onChange={noop} />,
    );

    expect(textField.exists()).toBe(true);
  });

  it('passes the placeholder prop to input', () => {
    const textField = mountWithAppProvider(
      <SearchField value="" onChange={noop} placeholder="hello polaris" />,
    );

    expect(findInput(textField).prop('placeholder')).toBe('hello polaris');
  });

  describe('focused', () => {
    it('will give input focus when the focused prop is true', () => {
      const textField = mountWithAppProvider(
        <SearchField value="" onChange={noop} focused />,
      );

      expect(findInput(textField).getDOMNode()).toBe(document.activeElement);
    });

    it('will give input focus if focus has been toggled', () => {
      const textField = mountWithAppProvider(
        <SearchField value="" onChange={noop} focused={false} />,
      );
      expect(findInput(textField).getDOMNode()).not.toBe(
        document.activeElement,
      );
      textField.setProps({value: '', onChange: noop, focused: true});
      expect(findInput(textField).getDOMNode()).toBe(document.activeElement);
    });

    it('will blur input if focused has been toggled', () => {
      const textField = mountWithAppProvider(
        <SearchField value="" onChange={noop} focused />,
      );

      textField.setProps({value: '', onChange: noop, focused: false});
      expect(findInput(textField).getDOMNode()).not.toBe(
        document.activeElement,
      );
    });
  });

  describe('clear content', () => {
    it('will render a cancel icon when a value is provided', () => {
      const textField = mountWithAppProvider(
        <SearchField value="hello polaris" onChange={noop} />,
      );

      expect(
        textField
          .find('Icon')
          .filterWhere((el) => el.prop('source') === CircleCancelMinor),
      ).toHaveLength(1);
    });

    it('will call the onChange with an empty string when the cancel button is pressed', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <SearchField value="hello polaris" onChange={spy} />,
      );

      textField.find('button').simulate('click');
      expect(spy).toHaveBeenCalledWith('');
    });
  });

  describe('onBlur()', () => {
    it('is called when the text field is blurred', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <SearchField value="hello polaris" onChange={noop} onBlur={spy} />,
      );

      textField.simulate('blur');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus', () => {
    it('is called when the text field is focused', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <SearchField value="hello polaris" onChange={noop} onFocus={spy} />,
      );

      textField.simulate('focus');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <SearchField value="hello polaris" onChange={spy} />,
      );

      (findInput(textField) as any).instance().value = 'hello world';
      findInput(textField).simulate('change');
      expect(spy).toHaveBeenCalledWith('hello world');
    });
  });

  describe('onKeyDown', () => {
    it("will prevent default on the 'enter' keydown", () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <SearchField value="hello polaris" onChange={noop} />,
      );

      findInput(textField).simulate('keydown', {
        key: 'Enter',
        preventDefault: spy,
      });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('unstableGlobalTheming', () => {
    it('does not render a container with globalTheming className by default', () => {
      const textField = mountWithApp(
        <SearchField value="hello polaris" onChange={noop} />,
      );
      expect(textField).not.toContainReactComponent('div', {
        className: 'SearchField SearchField-globalTheming',
      });
    });

    it('renders a container with globalTheming className when unstableGlobalTheming is true', () => {
      const textField = mountWithApp(
        <SearchField value="hello polaris" onChange={noop} />,
        {
          features: {unstableGlobalTheming: true},
        },
      );
      expect(textField).toContainReactComponent('div', {
        className: 'SearchField SearchField-globalTheming',
      });
    });
  });
});

function noop() {}

function findInput(wrapper: ReactWrapper) {
  return wrapper.find('input');
}
