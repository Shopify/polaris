import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {RangeSlider} from '../RangeSlider';
import {DualThumb, SingleThumb} from '../components';

const mockRangeSliderProps = {
  label: 'RangeSlider',
  onChange: noop,
};

describe('<RangeSlider />', () => {
  describe('<DualThumb />', () => {
    it('renders a dual thumb if value is a tuple', () => {
      const element = mountWithApp(
        <RangeSlider value={[0, 25]} {...mockRangeSliderProps} />,
      );

      expect(element).toContainReactComponentTimes(DualThumb, 1);
    });

    it('passes default props to dual thumb', () => {
      const element = mountWithApp(
        <RangeSlider value={[0, 25]} {...mockRangeSliderProps} />,
      );

      expect(element).toContainReactComponent(DualThumb, {
        min: 0,
        max: 100,
        step: 1,
      });
    });

    it('passes overrides to default props to dual thumb', () => {
      const overrideProps = {
        id: 'MyRangeSlider',
        min: 99,
        max: 999,
        step: 9,
      };

      const element = mountWithApp(
        <RangeSlider
          value={[0, 25]}
          {...mockRangeSliderProps}
          {...overrideProps}
        />,
      );

      expect(element).toContainReactComponent(DualThumb, overrideProps);
    });

    it('passes an id to dual thumb', () => {
      const element = mountWithApp(
        <RangeSlider value={[0, 25]} {...mockRangeSliderProps} />,
      );

      expect(element).toContainReactComponent(DualThumb, {
        id: expect.anything(),
      });
    });
  });

  describe('<SingleThumb />', () => {
    it('renders a single thumb if value is a single number', () => {
      const element = mountWithApp(
        <RangeSlider value={25} {...mockRangeSliderProps} />,
      );
      expect(element).toContainReactComponentTimes(SingleThumb, 1);
    });

    it('passes default props to single thumb', () => {
      const element = mountWithApp(
        <RangeSlider value={25} {...mockRangeSliderProps} />,
      );

      expect(element).toContainReactComponent(SingleThumb, {
        min: 0,
        max: 100,
        step: 1,
      });
    });

    it('passes an id to single thumb', () => {
      const element = mountWithApp(
        <RangeSlider value={25} {...mockRangeSliderProps} />,
      );

      expect(element).toContainReactComponent(SingleThumb, {
        id: expect.anything(),
      });
    });

    it('passes overrides to default props to single thumb', () => {
      const overrideProps = {
        id: 'MyRangeSlider',
        min: 99,
        max: 999,
        step: 9,
      };

      const element = mountWithApp(
        <RangeSlider value={25} {...mockRangeSliderProps} {...overrideProps} />,
      );

      expect(element).toContainReactComponent(SingleThumb, overrideProps);
    });
  });
});

function noop() {}
