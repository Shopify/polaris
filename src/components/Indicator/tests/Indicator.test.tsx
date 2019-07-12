import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import Indicator from '../Indicator';

describe('<Indicator />', () => {
  it('receives a pulse prop', () => {
    const indicator = mountWithAppProvider(<Indicator pulse />);
    expect(indicator.prop('pulse')).toBe(true);
  });

  it('does not pulse by default', () => {
    const indicator = mountWithAppProvider(<Indicator />);
    expect(indicator.prop('pulse')).toBeUndefined();
  });

  it('renders with a positive tone', () => {
    const indicator = mountWithAppProvider(<Indicator tone="positive" />);
    expect(indicator.prop('tone')).toBe('positive');
  });

  it('renders with a neutral tone', () => {
    const indicator = mountWithAppProvider(<Indicator tone="neutral" />);
    expect(indicator.prop('tone')).toBe('neutral');
  });

  it('renders with a negative tone', () => {
    const indicator = mountWithAppProvider(<Indicator tone="negative" />);
    expect(indicator.prop('tone')).toBe('negative');
  });

  describe('accessibilityLabel', () => {
    it('renders a span', () => {
      const indicator = mountWithAppProvider(<Indicator />);
      expect(indicator.find('span')).toHaveLength(1);
    });
  });
});
