import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {ReactWrapper} from 'enzyme';
import {mountWithAppProvider} from '../../../../../../tests/utilities';
import TextField from '../TextField';

describe('<TextField />', () => {
  it('mounts', () => {
    const textField = mountWithAppProvider(
      <TextField value="" onChange={noop} />,
    );

    expect(textField.exists()).toBe(true);
  });

  it('passes the placeholder prop to input', () => {
    const textField = mountWithAppProvider(
      <TextField value="" onChange={noop} placeholder="hello polaris" />,
    );

    expect(findInput(textField).prop('placeholder')).toBe('hello polaris');
  });

  describe('focused', () => {
    it('will give input focus when the focused prop is true', () => {
      const textField = mountWithAppProvider(
        <TextField value="" onChange={noop} focused />,
      );

      expect(findInput(textField).getDOMNode()).toBe(document.activeElement);
    });

    it('will give input focus if focus has been toggled', () => {
      const textField = mountWithAppProvider(
        <TextField value="" onChange={noop} focused={false} />,
      );
      expect(findInput(textField).getDOMNode()).not.toBe(
        document.activeElement,
      );
      textField.setProps({value: '', onChange: noop, focused: true});
      expect(findInput(textField).getDOMNode()).toBe(document.activeElement);
    });

    it('will blur input if focused has been toggled', () => {
      const textField = mountWithAppProvider(
        <TextField value="" onChange={noop} focused />,
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
        <TextField value="hello polaris" onChange={noop} />,
      );

      expect(
        textField
          .find('Icon')
          .filterWhere((e) => e.prop('source') === 'circleCancel'),
      ).toHaveLength(1);
    });

    it('will call the onChange with an empty string when the cancel button is pressed', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <TextField value="hello polaris" onChange={spy} />,
      );

      textField.find('button').simulate('click');
      expect(spy).toHaveBeenCalledWith('');
    });
  });

  describe('onBlur()', () => {
    it('is called when the text field is blurred', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <TextField value="hello polaris" onChange={noop} onBlur={spy} />,
      );

      textField.simulate('blur');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onFocus', () => {
    it('is called when the text field is focused', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <TextField value="hello polaris" onChange={noop} onFocus={spy} />,
      );

      textField.simulate('focus');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const textField = mountWithAppProvider(
        <TextField value="hello polaris" onChange={spy} />,
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
        <TextField value="hello polaris" onChange={noop} />,
      );

      findInput(textField).simulate('keydown', {
        key: 'Enter',
        preventDefault: spy,
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});

function findInput(wrapper: ReactWrapper) {
  return wrapper.find('input');
}
