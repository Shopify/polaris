import React, {useRef} from 'react';
import {mountWithApp} from 'tests/utilities';

// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../EventListener';
import {PositionedOverlay} from '../PositionedOverlay';
import * as mathModule from '../utilities/math';
import * as geometry from '../../../utilities/geometry';
import styles from '../PositionedOverlay.scss';

describe('<PositionedOverlay />', () => {
  const mockProps = {
    active: true,
    activator: document.createElement('div'),
    render: mockRender,
  };

  describe('render', () => {
    it('renders the provided children', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );
      expect(positionedOverlay).toContainReactText('overlay content');
    });
  });

  describe('mutation observer', () => {
    let mutationObserverObserveSpy: jest.SpyInstance;
    let mutationObserverDisconnectSpy: jest.SpyInstance;

    beforeEach(() => {
      mutationObserverObserveSpy = jest.spyOn(
        MutationObserver.prototype,
        'observe',
      );
      mutationObserverDisconnectSpy = jest.spyOn(
        MutationObserver.prototype,
        'disconnect',
      );
    });

    afterEach(() => {
      mutationObserverObserveSpy.mockRestore();
      mutationObserverDisconnectSpy.mockRestore();
    });

    it('observes the activator', () => {
      const activator = document.createElement('button');
      mountWithApp(
        <PositionedOverlay
          {...mockProps}
          activator={activator}
          preferredPosition="above"
        />,
      );

      expect(mutationObserverObserveSpy).toHaveBeenCalledWith(activator, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    });

    it('disconnects the observer when componentWillUnMount', () => {
      const activator = document.createElement('button');
      const overlay = mountWithApp(
        <PositionedOverlay
          {...mockProps}
          activator={activator}
          preferredPosition="above"
        />,
      );

      overlay.unmount();

      expect(mutationObserverDisconnectSpy).toHaveBeenCalled();
    });
  });

  describe('preferredPosition', () => {
    let calculateVerticalPositionMock: jest.SpyInstance;

    beforeEach(() => {
      calculateVerticalPositionMock = jest.spyOn(
        mathModule,
        'calculateVerticalPosition',
      );
      calculateVerticalPositionMock.mockReturnValue({
        height: 0,
        top: 0,
        positioning: 'above',
      });
    });

    afterEach(() => {
      calculateVerticalPositionMock.mockRestore();
    });

    it('positions above if preferredPosition is given', () => {
      const spy = jest.fn();
      mountWithApp(
        <PositionedOverlay
          {...mockProps}
          preferredPosition="above"
          render={spy}
        />,
      );

      expect(spy).toHaveBeenCalledWith({
        activatorRect: {height: 0, left: 0, top: 0, width: 0},
        desiredHeight: 0,
        left: 0,
        measuring: false,
        positioning: 'above',
        chevronOffset: 0,
      });
    });

    it('positions below if no preferredPosition is given', () => {
      const spy = jest.fn();
      mountWithApp(<PositionedOverlay {...mockProps} render={spy} />);

      expect(spy).toHaveBeenCalledWith({
        activatorRect: {height: 0, left: 0, top: 0, width: 0},
        desiredHeight: 0,
        left: undefined,
        measuring: true,
        positioning: 'below',
        chevronOffset: 0,
      });
    });
  });

  describe('chevronOffset', () => {
    let calculateHorizontalPositionMock: jest.SpyInstance;
    let getRectForNodeMock: jest.SpyInstance;

    beforeEach(() => {
      calculateHorizontalPositionMock = jest.spyOn(
        mathModule,
        'calculateHorizontalPosition',
      );
      calculateHorizontalPositionMock.mockReturnValue(250);
      getRectForNodeMock = jest.spyOn(geometry, 'getRectForNode');
      getRectForNodeMock.mockReturnValue({
        x: 100,
        y: 50,
        width: 200,
        height: 100,
        center: {x: 435, y: 25},
      });
    });

    afterEach(() => {
      calculateHorizontalPositionMock.mockRestore();
      getRectForNodeMock.mockRestore();
    });

    it('calculates the chevron offset correctly', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );
      expect(positionedOverlay.instance.state.chevronOffset).toBe(185);
    });
  });

  describe('preferredAlignment', () => {
    it('aligns left if preferredAlignment is given', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} preferredAlignment="left" />,
      );

      expect(positionedOverlay).toContainReactComponent('div', {
        style: expect.objectContaining({left: 0, right: undefined}),
      });
    });

    it('aligns right if preferredAlignment is given', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} preferredAlignment="right" />,
      );

      expect(positionedOverlay).toContainReactComponent('div', {
        style: expect.objectContaining({left: undefined, right: 0}),
      });
    });
  });

  describe('fullWidth', () => {
    it('is set to full width if fullWidth is true', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} fullWidth />,
      );

      expect(positionedOverlay).toContainReactComponent('div', {
        style: expect.objectContaining({width: 0}),
      });
    });
  });

  describe('zIndex', () => {
    it('is undefined if no state or prop override exist', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );

      expect(positionedOverlay).toContainReactComponent('div', {
        style: expect.objectContaining({zIndex: undefined}),
      });
    });

    it('is set to state calculated value if no override prop is given', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );
      positionedOverlay.instance.setState({zIndex: 200});

      positionedOverlay.forceUpdate();
      expect(positionedOverlay).toContainReactComponent('div', {
        style: expect.objectContaining({zIndex: 200}),
      });
    });

    it('is set to value of zIndexOverride prop if given', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} zIndexOverride={100} />,
      );
      positionedOverlay.instance.setState({zIndex: 200});

      positionedOverlay.forceUpdate();
      expect(positionedOverlay).toContainReactComponent('div', {
        style: expect.objectContaining({zIndex: 100}),
      });
    });
  });

  describe('preventInteraction', () => {
    it('passes preventInteraction to PositionedOverlay when preventInteraction is true', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} preventInteraction />,
      );
      expect(positionedOverlay).toContainReactComponent('div', {
        className: expect.stringContaining(styles.preventInteraction),
      });
    });

    it('does not pass preventInteraction to PositionedOverlay by default', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );

      expect(positionedOverlay).not.toContainReactComponent('div', {
        className: expect.stringContaining(styles.preventInteraction),
      });
    });
  });

  describe('lifecycle', () => {
    it('updates safely', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} fixed />,
      );

      expect(() => {
        positionedOverlay.setProps({fixed: false});
      }).not.toThrow();
    });

    it('unmounts safely', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );

      expect(() => {
        positionedOverlay.unmount();
      }).not.toThrow();
    });
  });

  describe('<EventListener />', () => {
    it('sets an event listener for resize', () => {
      const positionedOverlay = mountWithApp(
        <PositionedOverlay {...mockProps} />,
      );
      // eslint-disable-next-line import/no-deprecated
      expect(positionedOverlay).toContainReactComponent(EventListener, {
        event: 'resize',
      });
    });
  });

  describe('preferInputActivator', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('uses the input to calculate its dimensions when true', () => {
      const getRectForNodeSpy = jest.spyOn(geometry, 'getRectForNode');

      const activator = document.createElement('div');
      const input = document.createElement('input');
      activator.appendChild(input);

      mountWithApp(
        <PositionedOverlay
          {...mockProps}
          preferInputActivator
          activator={activator}
        />,
      );

      expect(
        getRectForNodeSpy.mock.calls.some(([node]) => node === input),
      ).toBe(true);
    });

    it('does not use the input to calculate its dimensions when false', () => {
      const getRectForNodeSpy = jest.spyOn(geometry, 'getRectForNode');
      const activator = document.createElement('div');
      const input = document.createElement('input');
      activator.appendChild(input);

      mountWithApp(
        <PositionedOverlay
          {...mockProps}
          preferInputActivator={false}
          activator={activator}
        />,
      );

      expect(
        getRectForNodeSpy.mock.calls.some(([node]) => node === input),
      ).toBe(false);
    });
  });

  describe('forceUpdatePosition', () => {
    it('exposes a function that allows the Overlay to be programmatically re-rendered', () => {
      let overlayRef = null;

      function Test() {
        overlayRef = useRef(null);

        return <PositionedOverlay ref={overlayRef} {...mockProps} />;
      }

      mountWithApp(<Test />);

      expect(overlayRef).toHaveProperty('current.forceUpdatePosition');
    });
  });
});

function mockRender() {
  return <span>overlay content</span>;
}
