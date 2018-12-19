import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider} from 'test-utilities';
import RangeSlider from '../RangeSlider';
import {DualThumb, SingleThumb} from '../components';

const mockProps = {
  id: 'MyRangeSlider',
  label: 'RangeSlider',
  min: 10,
  max: 20,
  step: 0.5,
  onChange: noop,
};

describe('<RangeSlider />', () => {
  it('renders a dual thumb if value is a tuple', () => {
    const element = mountWithAppProvider(
      <RangeSlider value={[0, 25]} {...mockProps} />,
    );

    expect(element.find(DualThumb)).toHaveLength(1);
  });

  it('renders a single thumb if value is a single number', () => {
    const element = mountWithAppProvider(
      <RangeSlider value={25} {...mockProps} />,
    );
    expect(element.find(SingleThumb)).toHaveLength(1);
  });
});
