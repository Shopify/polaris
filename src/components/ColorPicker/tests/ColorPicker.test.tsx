import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {EventListener} from '../../EventListener';
import {
  Slidable,
  TextPicker,
  AlphaPicker,
  RecentlySelected,
} from '../components';
import {ColorPicker} from '../ColorPicker';

const red = {
  alpha: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
};

const white = {
  alpha: 1,
  hue: 0,
  saturation: 0,
  brightness: 1,
};

enum SlidableType {
  BrightnessSaturation,
  Hue,
  Alpha,
}

describe('<ColorPicker />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

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

  describe('Recently selected', () => {
    describe('colors', () => {
      it('color is added to recently selected when it is entered into TextPicker', () => {
        const colorPicker = mountWithAppProvider(
          <ColorPicker color={red} onChange={noop} />,
        );

        const textPicker = colorPicker.find(TextPicker);

        textPicker.find('input').getDOMNode().value = 'white';
        textPicker
          .find('input')
          .simulate('change')
          .simulate('blur');

        const recentlySelected = colorPicker.find(RecentlySelected);

        expect(recentlySelected.prop('colors')[0]).toStrictEqual(white);
      });

      it('color is added to recently selected when Slidable onDraggingEnd is called', () => {
        const colorPicker = mountWithAppProvider(
          <ColorPicker color={red} onChange={noop} />,
        );

        const slidable = colorPicker
          .find(Slidable)
          .at(SlidableType.BrightnessSaturation);

        trigger(slidable, 'onDraggingEnd');

        const recentlySelected = colorPicker.find(RecentlySelected);

        expect(recentlySelected.prop('colors')[0]).toStrictEqual(red);
      });

      it('color is added to recently selected when HuePicker onDraggingEnd is called', () => {
        const colorPicker = mountWithAppProvider(
          <ColorPicker color={red} onChange={noop} />,
        );

        const slidable = colorPicker.find(Slidable).at(SlidableType.Hue);

        trigger(slidable, 'onDraggingEnd');

        const recentlySelected = colorPicker.find(RecentlySelected);

        expect(recentlySelected.prop('colors')[0]).toStrictEqual(red);
      });

      it('color is added to recently selected when AlphaPicker onDraggingEnd is called', () => {
        const colorPicker = mountWithAppProvider(
          <ColorPicker color={red} onChange={noop} allowAlpha />,
        );

        const slidable = colorPicker.find(Slidable).at(SlidableType.Alpha);

        trigger(slidable, 'onDraggingEnd');

        const recentlySelected = colorPicker.find(RecentlySelected);

        expect(recentlySelected.prop('colors')[0]).toStrictEqual(red);
      });
    });

    describe('onChange()', () => {
      it('onChange is called with color when RecentlySelected swatch is clicked', () => {
        const spy = jest.fn();
        const colorPicker = mountWithAppProvider(
          <ColorPicker color={red} onChange={spy} />,
        );

        const textPicker = colorPicker.find(TextPicker);

        textPicker.find('input').getDOMNode().value = 'white';
        textPicker
          .find('input')
          .simulate('change')
          .simulate('blur');

        const recentlySelected = colorPicker.find(RecentlySelected);

        recentlySelected
          .find('button')
          .at(0)
          .simulate('click');

        expect(spy).toHaveBeenCalledWith(white);
      });
    });

    it('no recently selected component exists before a color has been selected', () => {
      const colorPicker = mountWithAppProvider(
        <ColorPicker color={red} onChange={noop} />,
      );

      const recentlySelected = colorPicker.find(RecentlySelected);

      expect(recentlySelected).toHaveLength(0);
    });
  });

  describe('id', () => {
    it("is passed down to the first child's first child", () => {
      const id = 'MyID';
      const colorPicker = mountWithAppProvider(
        <ColorPicker id={id} color={red} onChange={jest.fn()} />,
      );

      expect(
        colorPicker
          .childAt(0)
          .childAt(0)
          .prop('id'),
      ).toBe(id);
    });
  });

  describe('color', () => {
    it('is passed down to AlphaPicker if allowAlpha is true', () => {
      const id = 'MyID';
      const colorPicker = mountWithAppProvider(
        <ColorPicker id={id} color={red} onChange={jest.fn()} allowAlpha />,
      );

      expect(colorPicker.find(AlphaPicker).prop('color')).toStrictEqual(red);
    });
  });

  describe('EventListener', () => {
    afterEach(() => {
      window.dispatchEvent(new Event('mouseup'));
    });

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

    it('prevents default for touchmove events if dragging the slider', () => {
      const colorPicker = mountWithAppProvider(
        <ColorPicker color={red} onChange={noop} />,
      );

      colorPicker
        .find(Slidable)
        .first()
        .simulate('mousedown');

      const touch = {clientX: 0, clientY: 0};
      const event = new TouchEvent('touchmove', {
        touches: [touch],
        cancelable: true,
      } as TouchEventInit);
      Object.assign(event, {preventDefault: jest.fn()});

      window.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(2);
    });

    it('allows default for touchmove events if not dragging the slider', () => {
      const touch = {clientX: 0, clientY: 0};
      const event = new TouchEvent('touchmove', {
        touches: [touch],
      } as TouchEventInit);
      Object.assign(event, {preventDefault: jest.fn()});

      window.dispatchEvent(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });
  });
});

function noop() {}
