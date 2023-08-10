import React from 'react';
import {CircleCancelMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Icon} from '../../../../Icon';
import {SearchField} from '../SearchField';

describe('<SearchField />', () => {
  it('passes the placeholder prop to input', () => {
    const textField = mountWithApp(
      <SearchField value="" onChange={noop} placeholder="hello polaris" />,
    );

    expect(textField).toContainReactComponent('input', {
      placeholder: 'hello polaris',
    });
  });

  describe('clear content', () => {
    it('will render a cancel icon when a value is provided', () => {
      const textField = mountWithApp(
        <SearchField value="hello polaris" onChange={noop} />,
      );

      expect(textField).toContainReactComponent(Icon, {
        source: CircleCancelMinor,
      });
    });

    it('will call the onChange with an empty string when the cancel button is pressed', () => {
      const spy = jest.fn();
      const textField = mountWithApp(
        <SearchField value="hello polaris" onChange={spy} />,
      );

      textField.find('button')!.trigger('onClick');

      expect(spy).toHaveBeenCalledWith('');
    });
  });

  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const newValue = 'hello polaris';
      const textField = mountWithApp(
        <SearchField value={newValue} onChange={spy} />,
      );

      textField.find('input')!.trigger('onChange', {
        currentTarget: {
          value: newValue,
        },
      });

      expect(spy).toHaveBeenCalledWith(newValue);
    });
  });

  describe('onKeyDown', () => {
    it("will prevent default on the 'enter' keydown", () => {
      const spy = jest.fn();
      const textField = mountWithApp(
        <SearchField value="hello polaris" onChange={noop} />,
      );

      textField.find('input')!.trigger('onKeyDown', {
        key: 'Enter',
        preventDefault: spy,
      });
      expect(spy).toHaveBeenCalled();
    });
  });
});

function noop() {}
