import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../EventListener';
import {Slidable, AlphaPicker} from '../components';
import {ColorPicker} from '../ColorPicker';

const red = {
  hue: 0,
  saturation: 1,
  brightness: 1,
};

describe('<ColorPicker />', () => {
  describe('Color slider (big square/rectangle)', () => {
    describe('onChange', () => {
      it("is called when Slidable's onChange is triggered", () => {
        const spy = jest.fn();
        const colorPicker = mountWithApp(
          <ColorPicker color={red} onChange={spy} />,
        );

        colorPicker.findAll(Slidable)[0].trigger('onChange', {x: 1, y: 1});

        expect(spy).toHaveBeenCalled();
      });

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mountWithApp(<ColorPicker color={red} onChange={spy} />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Hue slider', () => {
    describe('onChange', () => {
      it("is called when Slidable's onChange is triggered", () => {
        const spy = jest.fn();
        const colorPicker = mountWithApp(
          <ColorPicker color={red} onChange={spy} />,
        );

        colorPicker.findAll(Slidable)[1].trigger('onChange', {x: 1, y: 1});

        expect(spy).toHaveBeenCalled();
      });

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mountWithApp(<ColorPicker color={red} onChange={spy} />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('Alpha slider', () => {
    describe('onChange', () => {
      it("is called when Slidable's onChange is triggered", () => {
        const spy = jest.fn();
        const colorPicker = mountWithApp(
          <ColorPicker color={red} onChange={spy} allowAlpha />,
        );

        colorPicker.findAll(Slidable)[2].trigger('onChange', {x: 1, y: 1});

        expect(spy).toHaveBeenCalled();
      });

      it('is not called on mousemove when not dragging', () => {
        const spy = jest.fn();
        mountWithApp(<ColorPicker color={red} onChange={spy} allowAlpha />);

        window.dispatchEvent(new Event('mousemove'));
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('id', () => {
    it('is passed down to the first child', () => {
      const id = 'MyID';
      const colorPicker = mountWithApp(
        <ColorPicker id={id} color={red} onChange={jest.fn()} />,
      );
      expect(colorPicker.children[0]).toHaveReactProps({id});
    });
  });

  describe('color', () => {
    it('is passed down to AlphaPicker if allowAlpha is true', () => {
      const id = 'MyID';
      const colorPicker = mountWithApp(
        <ColorPicker id={id} color={red} onChange={jest.fn()} allowAlpha />,
      );

      expect(colorPicker).toContainReactComponent(AlphaPicker, {color: red});
    });
  });

  describe('EventListener', () => {
    afterEach(() => {
      window.dispatchEvent(new Event('mouseup'));
    });

    it('passes false to passive prop for "mousemove" EventListener when dragging', () => {
      const onChangeSpy = jest.fn();
      const colorPicker = mountWithApp(
        <ColorPicker color={red} onChange={onChangeSpy} />,
      );

      colorPicker.find(Slidable)!.find('div')!.trigger('onMouseDown', {
        type: 'mousedown',
        clientX: 1,
        clientY: 1,
      });
      // eslint-disable-next-line import/no-deprecated
      expect(colorPicker).toContainReactComponent(EventListener, {
        event: 'mousemove',
        passive: false,
      });
    });

    it('passes false to passive prop for "touchmove" EventListener when dragging', () => {
      const onChangeSpy = jest.fn();
      const colorPicker = mountWithApp(
        <ColorPicker color={red} onChange={onChangeSpy} />,
      );

      colorPicker.find(Slidable)!.find('div')!.trigger('onMouseDown', {
        type: 'mousedown',
        clientX: 1,
        clientY: 1,
      });
      // eslint-disable-next-line import/no-deprecated
      expect(colorPicker).toContainReactComponent(EventListener, {
        event: 'touchmove',
        passive: false,
      });
    });

    it('prevents default for touchmove events if dragging the slider', () => {
      const colorPicker = mountWithApp(
        <ColorPicker color={red} onChange={noop} />,
      );

      colorPicker.find(Slidable)!.find('div')!.trigger('onMouseDown', {
        type: 'mousedown',
        clientX: 1,
        clientY: 1,
      });

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
