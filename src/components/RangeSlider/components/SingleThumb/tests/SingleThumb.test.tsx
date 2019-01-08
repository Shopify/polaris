import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {shallowWithAppProvider, mountWithAppProvider} from 'test-utilities';
import {SingleThumb} from '../..';

const mockProps = {
  id: 'MyRangeSlider',
  label: 'RangeSlider',
  min: 10,
  max: 20,
  step: 0.5,
  onChange: noop,
  value: 15,
};

describe('<SingleThumb />', () => {
  it('allows specific props to pass through properties on the input', () => {
    const input = shallowWithAppProvider(
      <SingleThumb disabled {...mockProps} />,
    ).find('input');

    expect(input.prop('value')).toBe(15);
    expect(input.prop('min')).toBe(10);
    expect(input.prop('max')).toBe(20);
    expect(input.prop('step')).toBe(0.5);
    expect(input.prop('disabled')).toBe(true);
  });

  describe('onChange()', () => {
    it('is called when the input changes', () => {
      const onChangeSpy = jest.fn();
      const {onChange, ...rest} = mockProps;
      const element = mountWithAppProvider(
        <SingleThumb onChange={onChangeSpy} {...rest} />,
      );

      const singleThumb = element.find(SingleThumb);
      singleThumb.find('input').simulate('change');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('is called with a new value', () => {
      const onChangeSpy = jest.fn();
      const {onChange, ...rest} = mockProps;
      const element = mountWithAppProvider(
        <SingleThumb onChange={onChangeSpy} {...rest} />,
      );

      const singleThumb = element.find(SingleThumb);
      (element.find('input') as any).instance().value = 40;
      singleThumb.find('input').simulate('change');
      expect(onChangeSpy).toHaveBeenCalledWith(40, 'MyRangeSlider');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const onFocusSpy = jest.fn();
      shallowWithAppProvider(
        <SingleThumb {...mockProps} onFocus={onFocusSpy} />,
      )
        .find('input')
        .simulate('focus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is blurred', () => {
      const onBlurSpy = jest.fn();
      const element = shallowWithAppProvider(
        <SingleThumb {...mockProps} onBlur={onBlurSpy} />,
      );

      element.find('input').simulate('focus');
      element.find('input').simulate('blur');

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const id = shallowWithAppProvider(<SingleThumb {...mockProps} />)
        .find('input')
        .prop('id');

      expect(id).toBe('MyRangeSlider');
    });
  });

  describe('output', () => {
    it('connects the input to the output', () => {
      const element = mountWithAppProvider(
        <SingleThumb {...mockProps} output />,
      );
      const inputId = element.find('input').prop('id');

      expect(typeof inputId).toBe('string');
      expect(element.find('output').prop('htmlFor')).toBe(inputId);
    });

    it('contains the correct value text', () => {
      const element = mountWithAppProvider(
        <SingleThumb {...mockProps} output />,
      );
      const outputText = element.find('output').find('span');

      expect(outputText.text()).toBe('15');
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const element = mountWithAppProvider(
        <SingleThumb {...mockProps} helpText="Some help" />,
      );
      const helpTextID = element.find('input').prop<string>('aria-describedby');

      expect(typeof helpTextID).toBe('string');
      expect(element.find(`#${helpTextID}`).text()).toBe('Some help');
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const element = shallowWithAppProvider(
        <SingleThumb error={<span>Invalid</span>} {...mockProps} />,
      );
      expect(element.find('input').prop<string>('aria-invalid')).toBe(true);

      element.setProps({error: 'Some error'});
      expect(element.find('input').prop<string>('aria-invalid')).toBe(true);
    });

    it('connects the input to the error', () => {
      const element = mountWithAppProvider(
        <SingleThumb {...mockProps} error="Some error" />,
      );
      const errorID = element.find('input').prop<string>('aria-describedby');

      expect(typeof errorID).toBe('string');
      expect(element.find(`#${errorID}`).text()).toBe('Some error');
    });

    it('connects the input to both an error and help text', () => {
      const element = mountWithAppProvider(
        <SingleThumb {...mockProps} helpText="Some help" error="Some error" />,
      );
      const descriptions = element
        .find('input')
        .prop<string>('aria-describedby')
        .split(' ');

      expect(descriptions).toHaveLength(2);
      expect(element.find(`#${descriptions[1]}`).text()).toBe('Some help');
      expect(element.find(`#${descriptions[0]}`).text()).toBe('Some error');
    });

    describe('prefix', () => {
      const text = 'prefix text';

      it('outputs the provided prefix element', () => {
        const element = mountWithAppProvider(
          <SingleThumb {...mockProps} prefix={<p>{text}</p>} />,
        );
        const prefixElement = element.find('p');

        expect(prefixElement.text()).toBe(text);
      });
    });
  });

  describe('suffix', () => {
    const text = 'suffix text';
    it('outputs the provided suffix element', () => {
      const element = mountWithAppProvider(
        <SingleThumb {...mockProps} suffix={<p>{text}</p>} />,
      );
      const suffixElement = element.find('p');

      expect(suffixElement.text()).toBe(text);
    });
  });

  describe('CSS custom properties', () => {
    it('sets the correct css custom properties', () => {
      const element = mountWithAppProvider(<SingleThumb {...mockProps} />);
      const expected = {
        '--Polaris-RangeSlider-min': 10,
        '--Polaris-RangeSlider-max': 20,
        '--Polaris-RangeSlider-current': 15,
        '--Polaris-RangeSlider-progress': '50%',
        '--Polaris-RangeSlider-output-factor': '0',
      };
      const actual = element.find('[style]').prop('style');

      expect(expected).toEqual(actual);
    });
  });

  describe('value', () => {
    it('gets adjusted to be at least the min', () => {
      const value = 9;
      const min = 10;
      const singleThumb = mountWithAppProvider(
        <SingleThumb {...mockProps} value={value} min={min} />,
      );

      expect(singleThumb.find('input').prop('value')).toBe(min);
    });

    it('gets adjusted to be no more than the max', () => {
      const value = 101;
      const max = 100;
      const singleThumb = mountWithAppProvider(
        <SingleThumb {...mockProps} value={value} max={max} />,
      );

      expect(singleThumb.find('input').prop('value')).toBe(max);
    });
  });

  describe('aria-valuenow', () => {
    it('gets passed the value', () => {
      const value = 15;
      const singleThumb = mountWithAppProvider(
        <SingleThumb {...mockProps} value={value} />,
      );

      expect(singleThumb.find('input').prop('aria-valuenow')).toBe(value);
    });

    it('gets adjusted to be at least the min', () => {
      const value = 9;
      const min = 10;
      const singleThumb = mountWithAppProvider(
        <SingleThumb {...mockProps} value={value} min={min} />,
      );

      expect(singleThumb.find('input').prop('aria-valuenow')).toBe(min);
    });

    it('gets adjusted to be no more than the max', () => {
      const value = 101;
      const max = 100;
      const singleThumb = mountWithAppProvider(
        <SingleThumb {...mockProps} value={value} max={max} />,
      );

      expect(singleThumb.find('input').prop('aria-valuenow')).toBe(max);
    });
  });
});
