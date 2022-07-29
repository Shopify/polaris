import {mountWithApp} from 'tests/utilities';

import {InlineError} from '../../../../InlineError';
import {SingleThumb} from '../SingleThumb';

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
    const wrapper = mountWithApp(<SingleThumb disabled {...mockProps} />);

    expect(wrapper).toContainReactComponent('input', {
      value: 15,
      min: 10,
      max: 20,
      step: 0.5,
      disabled: true,
    });
  });

  describe('onChange()', () => {
    it('is called when the input changes', () => {
      const onChangeSpy = jest.fn();
      const {onChange, ...rest} = mockProps;
      const element = mountWithApp(
        <SingleThumb onChange={onChangeSpy} {...rest} />,
      );

      const input = element.find('input')!;

      input.trigger('onChange', {
        currentTarget: input!.domNode as HTMLInputElement,
      });

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('is called with a new value', () => {
      const onChangeSpy = jest.fn();
      const {onChange, ...rest} = mockProps;
      const element = mountWithApp(
        <SingleThumb onChange={onChangeSpy} {...rest} />,
      );

      element.find('input')!.trigger('onChange', {
        currentTarget: {value: '40'},
      });
      expect(onChangeSpy).toHaveBeenCalledWith(40, 'MyRangeSlider');
    });
  });

  describe('onFocus()', () => {
    it('is called when the input is focused', () => {
      const onFocusSpy = jest.fn();
      const wrapper = mountWithApp(
        <SingleThumb {...mockProps} onFocus={onFocusSpy} />,
      );

      wrapper.find('input')!.trigger('onFocus');
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onBlur()', () => {
    it('is called when the input is blurred', () => {
      const onBlurSpy = jest.fn();
      const element = mountWithApp(
        <SingleThumb {...mockProps} onBlur={onBlurSpy} />,
      );

      element.find('input')!.trigger('onBlur');

      expect(onBlurSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('id', () => {
    it('sets the id on the input', () => {
      const wrapper = mountWithApp(<SingleThumb {...mockProps} />);

      expect(wrapper).toContainReactComponent('input', {id: 'MyRangeSlider'});
    });
  });

  describe('output', () => {
    it('connects the input to the output', () => {
      const wrapper = mountWithApp(<SingleThumb {...mockProps} output />);
      const inputId = wrapper.find('input')!.prop('id');

      expect(typeof inputId).toBe('string');

      expect(wrapper).toContainReactComponent('output', {htmlFor: inputId});
    });

    it('contains the value as text', () => {
      const wrapper = mountWithApp(<SingleThumb {...mockProps} output />);

      expect(wrapper.find('output')).toContainReactText('15');
    });
  });

  describe('helpText', () => {
    it('connects the input to the help text', () => {
      const element = mountWithApp(
        <SingleThumb {...mockProps} helpText="Some help" />,
      );
      const helpTextID = element.find('input')!.prop('aria-describedby');

      expect(typeof helpTextID).toBe('string');

      expect(element.find('div', {id: helpTextID})).toContainReactText(
        'Some help',
      );
    });
  });

  describe('error', () => {
    it('marks the input as invalid', () => {
      const element = mountWithApp(
        <SingleThumb error={<span>Invalid</span>} {...mockProps} />,
      );
      expect(element).toContainReactComponent('input', {'aria-invalid': true});

      element.setProps({error: 'Some error'});
      expect(element).toContainReactComponent('input', {'aria-invalid': true});
    });

    it('connects the input to the error', () => {
      const element = mountWithApp(
        <SingleThumb {...mockProps} error="Some error" />,
      );
      const errorID = element.find('input')!.prop('aria-describedby');

      expect(typeof errorID).toBe('string');
      expect(element).toContainReactComponent(InlineError, {
        message: 'Some error',
      });
    });

    it('connects the input to both an error and help text', () => {
      const element = mountWithApp(
        <SingleThumb {...mockProps} helpText="Some help" error="Some error" />,
      );
      const descriptions = element
        .find('input')!
        .prop('aria-describedby')!
        .split(' ');
      expect(descriptions).toHaveLength(2);

      expect(element).toContainReactComponent(InlineError, {
        message: 'Some error',
      });
      expect(element.find('div', {id: descriptions[1]})).toContainReactText(
        'Some help',
      );
    });

    describe('prefix', () => {
      const text = 'prefix text';

      it('outputs the provided prefix element', () => {
        const element = mountWithApp(
          <SingleThumb {...mockProps} prefix={<p>{text}</p>} />,
        );
        const prefixElement = element.find('p')!;

        expect(prefixElement).toContainReactText(text);
      });
    });
  });

  describe('suffix', () => {
    const text = 'suffix text';

    it('outputs the provided suffix element', () => {
      const element = mountWithApp(
        <SingleThumb {...mockProps} suffix={<p>{text}</p>} />,
      );
      const suffixElement = element.find('p');

      expect(suffixElement).toContainReactText(text);
    });
  });

  describe('CSS custom properties', () => {
    it('gets set on the parent element', () => {
      const element = mountWithApp(<SingleThumb {...mockProps} />);
      const expected = {
        '--pc-range-slider-min': 10,
        '--pc-range-slider-max': 20,
        '--pc-range-slider-current': 15,
        '--pc-range-slider-progress': '50%',
        '--pc-range-slider-output-factor': '0',
      };

      expect(element).toContainReactComponent('div', {
        style: expect.objectContaining(expected),
      });
    });
  });

  describe('value', () => {
    it('gets adjusted to be at least the min', () => {
      const value = 9;
      const min = 10;
      const wrapper = mountWithApp(
        <SingleThumb {...mockProps} value={value} min={min} />,
      );

      expect(wrapper).toContainReactComponent('input', {value: min});
    });

    it('gets adjusted to be no more than the max', () => {
      const value = 101;
      const max = 100;
      const wrapper = mountWithApp(
        <SingleThumb {...mockProps} value={value} max={max} />,
      );

      expect(wrapper).toContainReactComponent('input', {value: max});
    });
  });

  describe('aria-valuenow', () => {
    it('gets passed the value', () => {
      const value = 15;
      const wrapper = mountWithApp(
        <SingleThumb {...mockProps} value={value} />,
      );

      expect(wrapper).toContainReactComponent('input', {
        'aria-valuenow': value,
      });
    });

    it('gets adjusted to be at least the min', () => {
      const value = 9;
      const min = 10;
      const wrapper = mountWithApp(
        <SingleThumb {...mockProps} value={value} min={min} />,
      );

      expect(wrapper).toContainReactComponent('input', {
        'aria-valuenow': min,
      });
    });

    it('gets adjusted to be no more than the max', () => {
      const value = 101;
      const max = 100;
      const wrapper = mountWithApp(
        <SingleThumb {...mockProps} value={value} max={max} />,
      );

      expect(wrapper).toContainReactComponent('input', {
        'aria-valuenow': max,
      });
    });
  });
});

function noop() {}
