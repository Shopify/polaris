/* eslint-disable import/no-deprecated */
import React, {useRef} from 'react';
import {mountWithApp} from 'tests/utilities';

import {Key} from '../../../../../types';
import {TextContainer} from '../../../../TextContainer';
import {EventListener} from '../../../../EventListener';
import {TextField} from '../../../../TextField';
import {PositionedOverlay} from '../../../../PositionedOverlay';
import {PopoverOverlay} from '../PopoverOverlay';
import {Popover} from '../../../Popover';
import {KeypressListener} from '../../../../KeypressListener';

describe('<PopoverOverlay />', () => {
  let rafSpy: jest.SpyInstance;

  beforeEach(() => {
    rafSpy = jest.spyOn(window, 'requestAnimationFrame');
    rafSpy.mockImplementation((callback) => callback());
  });

  afterEach(() => {
    if (document.activeElement) {
      (document.activeElement as HTMLElement).blur();
    }

    rafSpy.mockRestore();
  });

  const activator = document.createElement('button');
  const activatorContent = document.createTextNode('Activator text');
  activator.appendChild(activatorContent);
  const children = (
    <TextContainer>
      <p>Text</p>
    </TextContainer>
  );

  it('passes activator to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fullWidth
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      activator,
    });
  });

  it('passes fullWidth to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fullWidth
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      fullWidth: true,
    });
  });

  it('passes fixed to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fixed
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      fixed: true,
    });
  });

  it('passes preferredPosition and preferredAlignment to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        preferredPosition="above"
        preferredAlignment="right"
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      preferredPosition: 'above',
      preferredAlignment: 'right',
    });
  });

  it('passes default preferredPosition and preferredAlignment to PositionedOverlay when active', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      preferredPosition: 'below',
      preferredAlignment: 'center',
    });
  });

  it('passes preferInputActivator to PositionedOverlay when false', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fixed
        preferInputActivator={false}
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      preferInputActivator: false,
    });
  });

  it('passes zIndexOverride to PositionedOverlay', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        zIndexOverride={100}
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      zIndexOverride: 100,
    });
  });

  it("doesn't include a tabindex prop when autofocusTarget is 'none'", () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fixed
        autofocusTarget="none"
        preferInputActivator={false}
      >
        {children}
      </PopoverOverlay>,
    );

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      preferInputActivator: false,
    });
  });

  it('does not call the onClose callback when a descendent HTMLElement is clicked', () => {
    const spy = jest.fn();

    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={spy}
      >
        (
        <TextField
          label="Store name"
          value="Click me"
          onChange={() => {}}
          autoComplete="off"
        />
        )
      </PopoverOverlay>,
    );

    const target = popoverOverlay.find(TextField)!.find('input')!.domNode!;
    const clickEvent = new MouseEvent('click', {bubbles: true});

    target.dispatchEvent(clickEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not call the onClose callback when a descendent SVGElement is clicked', () => {
    const spy = jest.fn();

    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={spy}
      >
        (
        <TextField
          type="number"
          label="Store name"
          value="Click me"
          onChange={() => {}}
          autoComplete="off"
        />
        )
      </PopoverOverlay>,
    );

    const target = popoverOverlay.find(TextField)!.find('svg')!.domNode!;
    const clickEvent = new MouseEvent('click', {bubbles: true});

    target.dispatchEvent(clickEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  it('does not call the onClose callback when another overlay is clicked if preventCloseOnChildOverlayClick is true', () => {
    const spy = jest.fn();

    const popoverOverlayAndPopover = mountWithApp(
      <div>
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={spy}
          preventCloseOnChildOverlayClick
        >
          <button id="popover 1 button" />
        </PopoverOverlay>
        <Popover
          active
          fullWidth
          activator={<div>Activator</div>}
          onClose={jest.fn()}
        >
          <button id="popover 2 button" />
        </Popover>
      </div>,
    );

    const popover2Button = popoverOverlayAndPopover.find('button', {
      id: 'popover 2 button',
    })!.domNode!;
    const clickEvent = new MouseEvent('click', {bubbles: true});

    popover2Button.dispatchEvent(clickEvent);

    expect(spy).not.toHaveBeenCalled();
  });

  describe('when the Escape key is pressed', () => {
    it('calls the onClose callback if event target is descendant', () => {
      const spy = jest.fn();

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={spy}
        >
          <TextField
            label="Store name"
            value="Click me"
            onChange={() => {}}
            autoComplete="off"
          />
        </PopoverOverlay>,
      );

      const target = popoverOverlay.find(TextField)!.find('input')!.domNode!;
      triggerEscape(target);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('calls the onClose callback if event target is activator descendant', () => {
      const spy = jest.fn();

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={spy}
        >
          <TextField
            label="Store name"
            value="Click me"
            onChange={() => {}}
            autoComplete="off"
          />
        </PopoverOverlay>,
      );

      const target = popoverOverlay.find(TextField)!.find('input')!.domNode!;
      triggerEscape(target);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('does not call the onClose callback if event target is not descendant or activator descendant', () => {
      const spy = jest.fn();

      mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={spy}
        >
          {children}
        </PopoverOverlay>,
      );

      triggerEscape();

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });

  describe('deleting descendant elements', () => {
    const DeleteButton = () => {
      const [show, setShow] = React.useState(true);

      return show ? (
        <button onClick={() => setShow((prev) => !prev)}>Delete</button>
      ) : null;
    };

    it('does not call the onClose callback when a descendant that has been removed from the DOM is clicked', () => {
      const spy = jest.fn();

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={spy}
        >
          <DeleteButton />
        </PopoverOverlay>,
      );

      const deleteButton = popoverOverlay.find('button')!.domNode!;
      const clickEvent = new MouseEvent('click', {bubbles: true});

      deleteButton.dispatchEvent(clickEvent);

      expect(spy).not.toHaveBeenCalled();
    });

    it('does not call the onClose callback when a deleted element inside another overlay is clicked if preventCloseOnChildOverlayClick is true', () => {
      const spy = jest.fn();

      const popoverOverlayAndPopover = mountWithApp(
        <div>
          <PopoverOverlay
            active
            id="PopoverOverlay-1"
            activator={activator}
            onClose={spy}
            preventCloseOnChildOverlayClick
          >
            <button id="popover 1 button" />
          </PopoverOverlay>
          <Popover
            active
            fullWidth
            activator={<div>Activator</div>}
            onClose={jest.fn()}
          >
            <DeleteButton />
          </Popover>
        </div>,
      );

      const deleteButton = popoverOverlayAndPopover
        .find(Popover)!
        .find('button')!.domNode!;
      const clickEvent = new MouseEvent('click', {bubbles: true});

      deleteButton.dispatchEvent(clickEvent);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('starts animating in immediately', () => {
    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active={false}
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
        fullWidth
      >
        {children}
      </PopoverOverlay>,
    );

    popoverOverlay.setProps({active: true});
    popoverOverlay.forceUpdate();

    expect(popoverOverlay).toContainReactComponent(PositionedOverlay, {
      classNames: expect.stringContaining('PopoverOverlay-entering'),
    });
  });

  it('does not render after exiting when the component is updated during exit', () => {
    jest.useFakeTimers();

    const popoverOverlay = mountWithApp(
      <PopoverOverlay
        active
        id="PopoverOverlay-1"
        activator={activator}
        onClose={noop}
      >
        {children}
      </PopoverOverlay>,
    );

    // Start exiting
    popoverOverlay.setProps({active: false});
    // Run any timers and a final update for changed state
    jest.runOnlyPendingTimers();

    popoverOverlay.forceUpdate();
    expect(popoverOverlay).not.toContainReactComponent(PositionedOverlay);
  });

  describe('focus', () => {
    const oldEnv = process.env;

    beforeEach(() => {
      process.env = {...oldEnv};
      delete process.env.NODE_ENV;
    });

    afterEach(() => {
      process.env = oldEnv;
      jest.clearAllMocks();
    });

    it('focuses the content on mount', () => {
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
      mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
        >
          {children}
        </PopoverOverlay>,
      );

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(focusSpy).toHaveBeenCalledWith({preventScroll: false});
    });

    it('focuses the content on mount and prevents scroll in development', () => {
      process.env.NODE_ENV = 'development';
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');
      mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
        >
          {children}
        </PopoverOverlay>,
      );

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(focusSpy).toHaveBeenCalledWith({preventScroll: true});
    });

    it('focuses the container when autofocusTarget is not set', () => {
      const id = 'PopoverOverlay-1';
      const popoverOverlay = mountWithApp(
        <PopoverOverlay active id={id} activator={activator} onClose={noop} />,
      );

      const focusTarget = popoverOverlay.find('div', {id})!.domNode;
      expect(document.activeElement).toBe(focusTarget);
    });

    it('focuses the container when autofocusTarget is set to Container', () => {
      const id = 'PopoverOverlay-1';
      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id={id}
          activator={activator}
          onClose={noop}
          autofocusTarget="container"
        />,
      );

      const focusTarget = popoverOverlay.find('div', {id})!.domNode;
      expect(document.activeElement).toBe(focusTarget);
    });

    it('focuses the first focusbale node when autofocusTarget is set to FirstNode', () => {
      mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
          autofocusTarget="first-node"
        >
          <p>Hello world</p>
        </PopoverOverlay>,
      );

      expect(document.activeElement?.className).toContain('Content');
    });

    it('does not focus when autofocusTarget is set to None', () => {
      const id = 'PopoverOverlay-1';
      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id={id}
          activator={activator}
          onClose={noop}
          autofocusTarget="none"
        >
          <input type="text" />
        </PopoverOverlay>,
      );

      const focusTargetContainer = popoverOverlay.find('div', {id})!.domNode;
      const focusTargetFirstNode = popoverOverlay.find('input', {})!.domNode;

      expect(document.activeElement).not.toBe(focusTargetContainer);
      expect(document.activeElement).not.toBe(focusTargetFirstNode);
    });
  });

  describe('forceUpdatePosition', () => {
    it('exposes a function that allows the Overlay to be programmatically re-rendered', () => {
      let overlayRef = null;

      function Test() {
        overlayRef = useRef(null);

        return (
          <PopoverOverlay
            active
            id="MockId"
            ref={overlayRef}
            activator={activator}
            onClose={noop}
          >
            <input type="text" />
          </PopoverOverlay>
        );
      }

      mountWithApp(<Test />);

      expect(overlayRef).toHaveProperty('current.forceUpdatePosition');
    });
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

      mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
          fullWidth
        >
          {children}
        </PopoverOverlay>,
      );

      expect(observe).toHaveBeenCalledWith(activator);
    });

    it('disconnects the resize observer when component unmounts', () => {
      const disconnect = jest.fn();

      // eslint-disable-next-line jest/prefer-spy-on
      global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect,
      }));

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
          fullWidth
        >
          {children}
        </PopoverOverlay>,
      );

      popoverOverlay.unmount();

      expect(disconnect).toHaveBeenCalled();
    });

    it('updates the observer when activator updates', () => {
      const observe = jest.fn();
      const unobserve = jest.fn();

      // eslint-disable-next-line jest/prefer-spy-on
      global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe,
        unobserve,
        disconnect: jest.fn(),
      }));

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
          fullWidth
        >
          {children}
        </PopoverOverlay>,
      );

      const newActivator = document.createElement('button');

      popoverOverlay.act(() => {
        popoverOverlay.setProps({activator: newActivator});
      });

      expect(unobserve).toHaveBeenCalledWith(activator);
      expect(observe).toHaveBeenCalledWith(newActivator);
    });

    it('passes the activator.ownerDocument.defaultView as the window for the click and touchstart event listeners after resize observer fires', () => {
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

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
          fullWidth
        >
          {children}
        </PopoverOverlay>,
      );

      popoverOverlay.act(() => resizeCallback());

      popoverOverlay.forceUpdate();

      // We can't assert using `toContainReactComponent` because the matcher blows up trying to assert on window as an argument
      expect(
        popoverOverlay
          .find(EventListener, {
            event: 'click',
          })!
          .prop('window'),
      ).toStrictEqual(activator.ownerDocument.defaultView);

      expect(
        popoverOverlay
          .find(EventListener, {
            event: 'touchstart',
          })!
          .prop('window'),
      ).toStrictEqual(activator.ownerDocument.defaultView);
    });

    it('passes the activator.ownerDocument as the document for the escape key press listener after ResizeObserver fires', () => {
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

      const popoverOverlay = mountWithApp(
        <PopoverOverlay
          active
          id="PopoverOverlay-1"
          activator={activator}
          onClose={noop}
          fullWidth
        >
          {children}
        </PopoverOverlay>,
      );

      popoverOverlay.act(() => resizeCallback());

      popoverOverlay.forceUpdate();

      // We can't assert using `toContainReactComponent` because the matcher blows up trying to assert on window as an argument
      expect(
        popoverOverlay
          .find(KeypressListener, {
            keyCode: Key.Escape,
          })!
          .prop('document'),
      ).toStrictEqual(activator.ownerDocument);

      expect(
        popoverOverlay
          .find(EventListener, {
            event: 'touchstart',
          })!
          .prop('window'),
      ).toStrictEqual(activator.ownerDocument.defaultView);
    });
  });
});

function noop() {}

function triggerEscape(target?: Element) {
  const keyupEvent = new KeyboardEvent('keyup', {
    keyCode: Key.Escape,
    bubbles: true,
  });

  (target || document).dispatchEvent(keyupEvent);
}
