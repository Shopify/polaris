import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import RangeSlider from '../RangeSlider';
import {DualThumb, SingleThumb} from '../components';
import {DEFAULT_RANGE_SLIDER_PROPS} from '../utilities';

const mockRangeSliderProps = {
  label: 'RangeSlider',
  onChange: noop,
};

describe('<RangeSlider />', () => {
  describe('<DualThumb />', () => {
    it('renders a dual thumb if value is a tuple', () => {
      const element = mountWithAppProvider(
        <RangeSlider value={[0, 25]} {...mockRangeSliderProps} />,
      );

      expect(element.find(DualThumb)).toHaveLength(1);
    });

    it('passes default props to dual thumb', () => {
      const element = mountWithAppProvider(
        <RangeSlider value={[0, 25]} {...mockRangeSliderProps} />,
      );

      const {min, max, step} = element.find(DualThumb).props();

      expect({
        min,
        max,
        step,
      }).toEqual({
        min: DEFAULT_RANGE_SLIDER_PROPS.min,
        max: DEFAULT_RANGE_SLIDER_PROPS.max,
        step: DEFAULT_RANGE_SLIDER_PROPS.step,
      });
    });

    it('passes overrides to default props to dual thumb', () => {
      const overrideProps = {
        id: 'MyRangeSlider',
        min: 99,
        max: 999,
        step: 9,
      };

      const element = mountWithAppProvider(
        <RangeSlider
          value={[0, 25]}
          {...mockRangeSliderProps}
          {...overrideProps}
        />,
      );

      const {min, max, id, step} = element.find(DualThumb).props();

      expect({
        min,
        max,
        step,
        id,
      }).toEqual(overrideProps);
    });

    it('passes an id to dual thumb', () => {
      const element = mountWithAppProvider(
        <RangeSlider value={[0, 25]} {...mockRangeSliderProps} />,
      );

      expect(element.find(DualThumb).props().id).not.toBeNull();
    });
  });

  describe('<SingleThumb />', () => {
    it('renders a single thumb if value is a single number', () => {
      const element = mountWithAppProvider(
        <RangeSlider value={25} {...mockRangeSliderProps} />,
      );
      expect(element.find(SingleThumb)).toHaveLength(1);
    });

    it('passes default props to single thumb', () => {
      const element = mountWithAppProvider(
        <RangeSlider value={25} {...mockRangeSliderProps} />,
      );

      const {min, max, step} = element.find(SingleThumb).props();

      expect({
        min,
        max,
        step,
      }).toEqual({
        min: DEFAULT_RANGE_SLIDER_PROPS.min,
        max: DEFAULT_RANGE_SLIDER_PROPS.max,
        step: DEFAULT_RANGE_SLIDER_PROPS.step,
      });
    });

    it('passes an id to single thumb', () => {
      const element = mountWithAppProvider(
        <RangeSlider value={25} {...mockRangeSliderProps} />,
      );

      expect(element.find(SingleThumb).props().id).not.toBeNull();
    });

    it('passes overrides to default props to single thumb', () => {
      const overrideProps = {
        id: 'MyRangeSlider',
        min: 99,
        max: 999,
        step: 9,
      };

      const element = mountWithAppProvider(
        <RangeSlider value={25} {...mockRangeSliderProps} {...overrideProps} />,
      );

      const {min, max, id, step} = element.find(SingleThumb).props();

      expect({
        min,
        max,
        step,
        id,
      }).toEqual(overrideProps);
    });
  });
});
