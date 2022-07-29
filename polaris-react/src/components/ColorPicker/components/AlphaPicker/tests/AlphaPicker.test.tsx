import {mountWithApp} from 'tests/utilities';

import {calculateDraggerY, alphaForDraggerY} from '../utilities';
import {Slidable} from '../../Slidable';
import {AlphaPicker} from '../AlphaPicker';

describe('<AlphaPicker />', () => {
  const color = {
    hue: 120,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  };

  const mockProps = {
    alpha: 0,
    color,
    onChange: noop,
  };

  describe('alpha', () => {
    it('is used to calculate Slidable’s draggerY coordinate', () => {
      const alpha = 0.7;
      const expectedHue = calculateDraggerY(alpha, 0, 0);
      const alphaPicker = mountWithApp(
        <AlphaPicker {...mockProps} alpha={alpha} />,
      );
      expect(alphaPicker).toContainReactComponent(Slidable, {
        draggerY: expectedHue,
      });
    });
  });

  describe('onChange()', () => {
    it('is called when Slidable changes', () => {
      const onChangeSpy = jest.fn();
      const alphaPicker = mountWithApp(
        <AlphaPicker {...mockProps} onChange={onChangeSpy} />,
      );
      alphaPicker.find(Slidable)!.trigger('onChange', {
        y: 0,
      });
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('is called with the new alpha value', () => {
      const onChangeSpy = jest.fn();
      const alphaPicker = mountWithApp(
        <AlphaPicker {...mockProps} onChange={onChangeSpy} />,
      );
      const yPosition = 7;
      const expectedHue = alphaForDraggerY(yPosition, 0);
      alphaPicker.find(Slidable)!.trigger('onChange', {
        y: yPosition,
      });
      expect(onChangeSpy).toHaveBeenCalledWith(expectedHue);
    });
  });

  describe('<Slidable />', () => {
    it('receives dragger height changes and uses them to calculate draggerY', () => {
      const alpha = 0.7;
      const alphaPicker = mountWithApp(
        <AlphaPicker {...mockProps} alpha={alpha} />,
      );
      const newDraggerHeight = 7;
      const expectedNewHue = calculateDraggerY(alpha, 0, newDraggerHeight);
      alphaPicker.find(Slidable)!.trigger('onDraggerHeight', newDraggerHeight);
      expect(alphaPicker).toContainReactComponent(Slidable, {
        draggerY: expectedNewHue,
      });
    });

    it('passes draggerX to Slidable with value 0', () => {
      const alphaPicker = mountWithApp(<AlphaPicker {...mockProps} />);
      expect(alphaPicker).toContainReactComponent(Slidable, {
        draggerX: 0,
      });
    });
  });
});

function noop() {}
