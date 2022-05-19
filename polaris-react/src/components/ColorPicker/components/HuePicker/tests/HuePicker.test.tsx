import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {calculateDraggerY, hueForDraggerY} from '../utilities';
import {Slidable} from '../../Slidable';
import {HuePicker} from '../HuePicker';

describe('<HuePicker />', () => {
  const mockProps = {
    hue: 0,
    onChange: noop,
  };

  describe('hue', () => {
    it('is used to calculate Slidable’s draggerY coordinate', () => {
      const hue = 44;
      const expectedHue = calculateDraggerY(hue, 0, 0);
      const huePicker = mountWithApp(<HuePicker {...mockProps} hue={hue} />);
      expect(huePicker).toContainReactComponent(Slidable, {
        draggerY: expectedHue,
      });
    });
  });

  describe('onChange()', () => {
    it('gets called when slidable changes', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithApp(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      huePicker.find(Slidable)!.trigger('onChange', {
        y: 0,
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('gets called with the new hue value', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithApp(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      const yPosition = 7;
      const expectedHue = hueForDraggerY(yPosition, 0);
      huePicker.find(Slidable)!.trigger('onChange', {
        y: yPosition,
      });
      expect(onChangeSpy).toHaveBeenCalledWith(expectedHue);
    });
  });

  describe('<Slidable />', () => {
    it('receives dragger height changes and uses them to calculate draggerY', () => {
      const hue = 80;
      const huePicker = mountWithApp(<HuePicker {...mockProps} hue={hue} />);
      const newDraggerHeight = 7;
      const expectedNewHue = calculateDraggerY(hue, 0, newDraggerHeight);
      huePicker.find(Slidable)!.trigger('onDraggerHeight', newDraggerHeight);
      expect(huePicker).toContainReactComponent(Slidable, {
        draggerY: expectedNewHue,
      });
    });

    it('passes draggerX to Slidable with value 0', () => {
      const huePicker = mountWithApp(<HuePicker {...mockProps} />);
      expect(huePicker).toContainReactComponent(Slidable, {
        draggerX: 0,
      });
    });
  });
});

function noop() {}
