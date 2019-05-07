import * as React from 'react';
import {mountWithAppProvider} from 'test-utilities';
import EventListener from '../../EventListener';
import {Slidable, AlphaPicker} from '../components';
import ColorPicker from '../ColorPicker';

const red = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

enum SlidableType {
  BrightnessSaturation,
  Hue,
}

describe('<ColorPicker />', () => {
  describe('Saturation/ Brightness pane', () => {
    describe('onChange', () => {
      it('is called when the user mouse downs', () => {
        const spy = jest.fn();
        mountWithAppProvider(<ColorPicker color={red} onChange={spy} />)
          .find(Slidable)
          .at(SlidableType.BrightnessSaturation)
          .simulate('mousedown');

        expect(spy).toHaveBeenCalled();
      });

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mountWithAppProvider(<ColorPicker color={red} onChange={spy} />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Hue slider', () => {
    describe('onChange', () => {
      it('is called when the user mouse downs', () => {
        const spy = jest.fn();
        mountWithAppProvider(<ColorPicker color={red} onChange={spy} />)
          .find(Slidable)
          .at(SlidableType.Hue)
          .simulate('mousedown');

        expect(spy).toHaveBeenCalled();
      });

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mountWithAppProvider(<ColorPicker color={red} onChange={spy} />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('id', () => {
    it('is passed down to the first child', () => {
      const id = 'MyID';
      const colorPicker = mountWithAppProvider(
        <ColorPicker id={id} color={red} onChange={jest.fn()} />,
      );

      expect(colorPicker.childAt(0).prop('id')).toBe(id);
    });
  });

  describe('color', () => {
    it('is passed down to AlphaPicker if allowAlpha is true', () => {
      const id = 'MyID';
      const colorPicker = mountWithAppProvider(
        <ColorPicker id={id} color={red} onChange={jest.fn()} allowAlpha />,
      );

      expect(colorPicker.find(AlphaPicker).prop('color')).toEqual(red);
    });
  });

  describe('EventListener', () => {
    it('passes false to passive prop for "mousemove" EventListener when dragging', () => {
      const onChangeSpy = jest.fn();
      const colorPicker = mountWithAppProvider(
        <ColorPicker color={red} onChange={onChangeSpy} />,
      );

      colorPicker
        .find(Slidable)
        .at(SlidableType.BrightnessSaturation)
        .simulate('mousedown');

      const mouseMoveListener = colorPicker
        .find(EventListener)
        .filterWhere((listener) => listener.prop('event') === 'mousemove');

      expect(mouseMoveListener.prop('passive')).toBe(false);
    });

    it('passes false to passive prop for "touchmove" EventListener when dragging', () => {
      const onChangeSpy = jest.fn();
      const colorPicker = mountWithAppProvider(
        <ColorPicker color={red} onChange={onChangeSpy} />,
      );

      colorPicker
        .find(Slidable)
        .at(SlidableType.BrightnessSaturation)
        .simulate('mousedown');

      const touchMoveListener = colorPicker
        .find(EventListener)
        .filterWhere((listener) => listener.prop('event') === 'touchmove');

      expect(touchMoveListener.prop('passive')).toBe(false);
    });
  });
});
