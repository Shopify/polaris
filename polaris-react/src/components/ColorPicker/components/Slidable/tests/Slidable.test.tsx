/* eslint-disable import/no-deprecated */
import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {EventListener} from '../../../../EventListener';
import styles from '../../../ColorPicker.module.css';
import {Slidable} from '../Slidable';

describe('<Slidable />', () => {
  it('does not invoke onChange when on mouse down is not a mouse down event', () => {
    const spy = jest.fn();
    const slidable = mountWithApp(<Slidable onChange={spy} />);
    slidable.find('div')!.trigger('onMouseDown', {});
    expect(spy).not.toHaveBeenCalled();
  });

  describe('Iframe React portal bug fix', () => {
    it('observes the resize event for the activator', () => {
      const observe = jest.fn();

      // eslint-disable-next-line jest/prefer-spy-on
      global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe,
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      }));

      const slidable = mountWithApp(<Slidable onChange={jest.fn()} />);

      expect(observe).toHaveBeenCalledWith(slidable.find('div')?.domNode);
    });

    it('disconnects the resize observer when component unmounts', () => {
      const disconnect = jest.fn();

      // eslint-disable-next-line jest/prefer-spy-on
      global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect,
      }));

      const slidable = mountWithApp(<Slidable onChange={jest.fn()} />);

      slidable.unmount();

      expect(disconnect).toHaveBeenCalled();
    });

    it('passes the node.ownerDocument.defaultView as the window for all event listeners after resize observer fires', () => {
      let resizeCallback: () => void;

      // eslint-disable-next-line jest/prefer-spy-on
      global.ResizeObserver = jest.fn().mockImplementation((callback) => {
        resizeCallback = callback;
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      const slidable = mountWithApp(<Slidable onChange={jest.fn()} />);
      const node = slidable.find('div')?.domNode;

      slidable.act(() => resizeCallback());

      slidable.forceUpdate();

      slidable.find('div')!.trigger('onMouseDown', {
        type: 'mousedown',
        clientX: 1,
        clientY: 1,
      });

      // We can't assert using `toContainReactComponent` because the matcher blows up trying to assert on window as an argument
      expect(
        slidable
          .find(EventListener, {
            event: 'mousemove',
          })!
          .prop('window'),
      ).toStrictEqual(node!.ownerDocument.defaultView);

      expect(
        slidable
          .find(EventListener, {
            event: 'touchmove',
          })!
          .prop('window'),
      ).toStrictEqual(node!.ownerDocument.defaultView);

      expect(
        slidable
          .find(EventListener, {
            event: 'mouseup',
          })!
          .prop('window'),
      ).toStrictEqual(node!.ownerDocument.defaultView);

      expect(
        slidable
          .find(EventListener, {
            event: 'touchend',
          })!
          .prop('window'),
      ).toStrictEqual(node!.ownerDocument.defaultView);

      expect(
        slidable
          .find(EventListener, {
            event: 'touchcancel',
          })!
          .prop('window'),
      ).toStrictEqual(node!.ownerDocument.defaultView);
    });

    it('calls provided onDraggerHeight after resize observer fires', () => {
      let resizeCallback: () => void;
      const onDraggerHeight = jest.fn();

      // eslint-disable-next-line jest/prefer-spy-on
      global.ResizeObserver = jest.fn().mockImplementation((callback) => {
        resizeCallback = callback;
        return {
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        };
      });

      const slidable = mountWithApp(
        <Slidable onChange={jest.fn()} onDraggerHeight={onDraggerHeight} />,
      );

      slidable.act(() => resizeCallback());

      expect(onDraggerHeight).toHaveBeenCalledWith(
        slidable.find('div', {className: styles.Dragger})?.domNode?.clientWidth,
      );
    });
  });
});
