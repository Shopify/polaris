import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
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
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} hue={hue} />,
      );
      expect(huePicker.find(Slidable).prop('draggerY')).toBe(expectedHue);
    });
  });

  describe('onChange()', () => {
    it('gets called when slidable changes', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      trigger(huePicker.find(Slidable), 'onChange', {
        y: 0,
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('gets called with the new hue value', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      const yPosition = 7;
      const expectedHue = hueForDraggerY(yPosition, 0);
      trigger(huePicker.find(Slidable), 'onChange', {
        y: yPosition,
      });
      expect(onChangeSpy).toHaveBeenCalledWith(expectedHue);
    });
  });

  describe('<Slidable />', () => {
    it('receives dragger height changes and uses them to calculate draggerY', () => {
      const hue = 80;
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} hue={hue} />,
      );
      const newDraggerHeight = 7;
      const expectedNewHue = calculateDraggerY(hue, 0, newDraggerHeight);
      trigger(huePicker.find(Slidable), 'onDraggerHeight', newDraggerHeight);
      expect(huePicker.find(Slidable).prop('draggerY')).toBe(expectedNewHue);
    });

    it('is called on ArrowUp keyup event', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      huePicker.find('[role="application"]').simulate('keyup', {
        key: 'ArrowUp',
      });
      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('is called on ArrowDown keyup event', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      huePicker.find('[role="application"]').simulate('keyup', {
        key: 'ArrowDown',
      });
      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('is not called on ArrowLeft keyup event', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      huePicker.find('[role="application"]').simulate('keyup', {
        key: 'ArrowLeft',
      });
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('is not called on ArrowRight keyup event', () => {
      const onChangeSpy = jest.fn();
      const huePicker = mountWithAppProvider(
        <HuePicker {...mockProps} onChange={onChangeSpy} />,
      );
      huePicker.find('[role="application"]').simulate('keyup', {
        key: 'ArrowRight',
      });
      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });
});

function noop() {}
