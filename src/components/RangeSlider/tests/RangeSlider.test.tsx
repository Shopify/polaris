import * as React from 'react';
import {
  shallowWithAppProvider,
  mountWithAppProvider,
} from '../../../../tests/utilities';
import {noop} from '@shopify/javascript-utilities/other';
import RangeSlider, {invertNumber} from '..';

describe('<RangeSlider />', () => {
  it('allows specific props to pass through properties on the input', () => {
    const input = shallowWithAppProvider(
      <RangeSlider
        label="RangeSlider"
        value={15}
        min={10}
        max={20}
        step={0.5}
        disabled
        onChange={noop}
      />,
    ).find('input');

    expect(input.prop('value')).toBe(15);
    expect(input.prop('min')).toBe(10);
    expect(input.prop('max')).toBe(20);
    expect(input.prop('step')).toBe(0.5);
    expect(input.prop('disabled')).toBe(true);
  });

  describe('onChange()', () => {
    it('is called with the new value', () => {
      const spy = jest.fn();
      const element = mountWithAppProvider(
        <RangeSlider
          id="MyRangeSlider"
          label="RangeSlider"
          value={50}
          onChange={spy}
        />,
      );

      (element.find('input') as any).instance().value = 40;
      element.find('input').simulate('change');

      expect(spy).toHaveBeenCalledWith(40, 'MyRangeSlider');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const spy = jest.fn();
      shallowWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          value={50}
          onChange={noop}
          onFocus={spy}
        />,
      )
        .find('input')
        .simulate('focus');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is blurred', () => {
      const spy = jest.fn();
      const element = shallowWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          value={50}
          onChange={noop}
          onBlur={spy}
        />,
      );

      element.find('input').simulate('focus');
      element.find('input').simulate('blur');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallowWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          id="MyRangeSlider"
          value={50}
          onChange={noop}
        />,
      )
        .find('input')
        .prop('id');

      expect(id).toBe('MyRangeSlider');
    });

    it('sets a random id on the input when none is passed', () => {
      const id = shallowWithAppProvider(
        <RangeSlider label="RangeSlider" value={50} onChange={noop} />,
      )
        .find('input')
        .prop('id');

      expect(typeof id).toBe('string');
      expect(id).toBeTruthy();
    });
  });

  describe('output', () => {
    it('connects the input to the output', () => {
      const element = mountWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          id="MyRangeSlider"
          value={50}
          output
          onChange={noop}
        />,
      );
      const inputId = element.find('input').prop<string>('id');

      expect(typeof inputId).toBe('string');
      expect(element.find('output').prop<string>('htmlFor')).toBe(inputId);
    });

    it('output contains correct value text', () => {
      const element = mountWithAppProvider(
        <RangeSlider label="RangeSlider" value={50} output onChange={noop} />,
      );
      const outputText = element.find('output').find('span');

      expect(outputText.text()).toBe('50');
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const element = mountWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          value={50}
          helpText="Some help"
          onChange={noop}
        />,
      );
      const helpTextID = element.find('input').prop<string>('aria-describedby');

      expect(typeof helpTextID).toBe('string');
      expect(element.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const element = shallowWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          value={50}
          error={<span>Invalid</span>}
          onChange={noop}
        />,
      );
      expect(element.find('input').prop<string>('aria-invalid')).toBe(true);

      element.setProps({error: 'Some error'});
      expect(element.find('input').prop<string>('aria-invalid')).toBe(true);
    });

    it('connects the input to the error', () => {
      const element = mountWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          value={50}
          error="Some error"
          onChange={noop}
        />,
      );
      const errorID = element.find('input').prop<string>('aria-describedby');

      expect(typeof errorID).toBe('string');
      expect(element.find(`#${errorID}`).text()).toBe('Some error');
    });

    it('connects the input to both an error and help text', () => {
      const element = mountWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          value={50}
          helpText="Some help"
          error="Some error"
          onChange={noop}
        />,
      );
      const descriptions = element
        .find('input')
        .prop<string>('aria-describedby')
        .split(' ');

      expect(descriptions.length).toBe(2);
      expect(element.find(`#${descriptions[1]}`).text()).toBe('Some help');
      expect(element.find(`#${descriptions[0]}`).text()).toBe('Some error');
    });
  });

  describe('invertNumber', () => {
    it('returns a negative number when the argument is positive', () => {
      const negative = invertNumber(10);
      expect(negative).toBe(-10);
    });

    it('returns a positive number when the argument is negative', () => {
      const negative = invertNumber(-10);
      expect(negative).toBe(10);
    });

    it('returns 0 when the argument is 0', () => {
      const negative = invertNumber(0);
      expect(negative).toBe(0);
    });
  });

  describe('CSS custom properties', () => {
    it('sets the correct css custom properties', () => {
      const element = mountWithAppProvider(
        <RangeSlider
          label="RangeSlider"
          id="MyRangeSlider"
          value={25}
          onChange={noop}
        />,
      );
      const expected = {
        '--Polaris-RangeSlider-min': 0,
        '--Polaris-RangeSlider-max': 100,
        '--Polaris-RangeSlider-current': 25,
        '--Polaris-RangeSlider-progress': '25%',
        '--Polaris-RangeSlider-output-factor': 0.25,
      };
      const actual = element
        .find('input')
        .parent()
        .prop('style');

      expect(expected).toEqual(actual);
    });
  });
});
