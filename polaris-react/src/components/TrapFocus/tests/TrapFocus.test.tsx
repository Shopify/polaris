import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Button} from '../../Button';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../EventListener';
import {Focus} from '../../Focus';
// eslint-disable-next-line import/no-deprecated
import {TextContainer} from '../../TextContainer';
import {TextField} from '../../TextField';
import {Portal} from '../../Portal';
import * as focusUtils from '../../../utilities/focus';
import {TrapFocus} from '../TrapFocus';
import {Key} from '../../../types';

describe('<TrapFocus />', () => {
  let focusFirstFocusableNodeSpy: jest.SpyInstance;
  let focusFirstKeyboardFocusableNodeSpy: jest.SpyInstance;
  let focusLastKeyboardFocusableNodeSpy: jest.SpyInstance;

  beforeEach(() => {
    focusFirstFocusableNodeSpy = jest.spyOn(
      focusUtils,
      'focusFirstFocusableNode',
    );

    focusFirstKeyboardFocusableNodeSpy = jest.spyOn(
      focusUtils,
      'focusFirstKeyboardFocusableNode',
    );

    focusLastKeyboardFocusableNodeSpy = jest.spyOn(
      focusUtils,
      'focusLastKeyboardFocusableNode',
    );
  });

  afterEach(() => {
    focusFirstFocusableNodeSpy.mockRestore();
    focusFirstKeyboardFocusableNodeSpy.mockRestore();
    focusLastKeyboardFocusableNodeSpy.mockRestore();
    (document.activeElement as HTMLElement).blur();
  });

  it('mounts', () => {
    const trapFocus = mountWithApp(
      <TrapFocus>
        <TextContainer>Test</TextContainer>
      </TrapFocus>,
    );

    // Render children
    // eslint-disable-next-line import/no-deprecated
    expect(trapFocus).toContainReactComponent(TextContainer);

    // Renders Focus
    expect(trapFocus).toContainReactComponent(Focus);

    // Renders an event listener
    // eslint-disable-next-line import/no-deprecated
    expect(trapFocus).toContainReactComponent(EventListener, {
      event: 'focusin',
    });
  });

  it('renders a Focus component with a `disabled` prop set to false by default', () => {
    const trapFocus = mountWithApp(
      <TrapFocus>
        <div />
      </TrapFocus>,
    );
    expect(trapFocus).toContainReactComponent(Focus, {disabled: false});
  });

  it('renders a Focus component with a `disabled` prop set to true when `trapping` is false', () => {
    const trapFocus = mountWithApp(
      <TrapFocus trapping={false}>
        <div />
      </TrapFocus>,
    );

    expect(trapFocus).toContainReactComponent(Focus, {disabled: true});
  });

  it('renders a Focus component with a `disabled` prop set to false when `trapping` is true', () => {
    const trapFocus = mountWithApp(
      <TrapFocus trapping>
        <div />
      </TrapFocus>,
    );

    expect(trapFocus).toContainReactComponent(Focus, {disabled: false});
  });

  it(`does not trap focus while navigating inside a portal`, () => {
    const id = 'focusable';
    const trapFocus = mountWithApp(
      <TrapFocus>
        <Portal>
          <button id={id} />
        </Portal>
        <button />
      </TrapFocus>,
    );
    const focusableButton = trapFocus.find('button', {id})?.domNode;
    focusableButton?.focus();
    trapFocus
      // eslint-disable-next-line import/no-deprecated
      .find(EventListener, {event: 'focusin'})
      ?.trigger('handler', {target: focusableButton});

    expect(document.activeElement).toBe(focusableButton);
  });

  it('keeps focus on nodes contained inside trap focus during mount', () => {
    const trapFocus = mountWithApp(
      <TrapFocus>
        <button>First node</button>
        <TextField
          label=""
          value=""
          autoComplete="off"
          onChange={noop}
          autoFocus
        />
      </TrapFocus>,
    );

    expect(document.activeElement).toBe(trapFocus.find('input')!.domNode);
  });

  it('focuses the first focused node when nodes contained in trap focus are not in focus', () => {
    const trapFocus = mountWithApp(
      <TrapFocus>
        <a href="/">
          <TextField label="" value="" autoComplete="off" onChange={noop} />
        </a>
      </TrapFocus>,
    );

    expect(document.activeElement).toBe(trapFocus.find('a')!.domNode);
  });

  it(`doesn't trade steal focus from another TrapFocus when multiple are rendered`, () => {
    const id = 'input';
    const trapFocus = mountWithApp(
      <div>
        <TrapFocus>
          <input autoFocus id={id} />
        </TrapFocus>
        <TrapFocus>
          <input autoFocus />
        </TrapFocus>
      </div>,
    );

    expect(document.activeElement).toBe(trapFocus.find('input', {id})!.domNode);
  });

  describe('handleBlur', () => {
    it('allows default when trapping is false', () => {
      const externalDomNode = mountWithApp(<Button />).find('button')!.domNode;
      const trapFocus = mountWithApp(
        <TrapFocus trapping={false}>
          <TextField
            label=""
            value=""
            autoComplete="off"
            onChange={noop}
            autoFocus
          />
        </TrapFocus>,
      );

      const event: FocusEvent = new FocusEvent('focusout', {
        relatedTarget: externalDomNode,
      });
      Object.assign(event, {preventDefault: jest.fn()});
      // eslint-disable-next-line import/no-deprecated
      trapFocus.find(EventListener)!.trigger('handler', event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('allows default when the related target is a child', () => {
      const trapFocus = mountWithApp(
        <TrapFocus>
          <TextField
            label=""
            value=""
            autoComplete="off"
            onChange={noop}
            autoFocus
          />
        </TrapFocus>,
      );

      const internalDomNode = trapFocus.find('input')!.domNode;

      const event: FocusEvent = new FocusEvent('focusout', {
        relatedTarget: internalDomNode,
      });
      Object.assign(event, {preventDefault: jest.fn()});
      // eslint-disable-next-line import/no-deprecated
      trapFocus.find(EventListener)!.trigger('handler', event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('focuses focusTrapWrapper when focusTrapWrapper does not contain a focusable element and the event target is not the firstFocusableNode', () => {
      const externalDomNode = mountWithApp(<Button />).find('button')!.domNode;
      const trapFocus = mountWithApp(
        <TrapFocus>
          <div id="other" />
        </TrapFocus>,
      );

      const event: Partial<FocusEvent> = {
        relatedTarget: externalDomNode,
        srcElement: externalDomNode,
        target: document.createElement('div'),
        preventDefault: () => {},
      };
      // eslint-disable-next-line import/no-deprecated
      trapFocus.find(EventListener)!.trigger('handler', event);

      expect(focusFirstFocusableNodeSpy).toHaveBeenCalledWith(
        trapFocus.find('div')!.domNode,
      );
    });
  });

  describe('handleTab', () => {
    beforeEach(() => {
      jest
        .spyOn(document, 'addEventListener')
        .mockImplementation((event, cb) => {
          listenerMap[event] = cb;
        });

      jest
        .spyOn(document, 'removeEventListener')
        .mockImplementation((event) => {
          listenerMap[event] = noop;
        });
    });

    afterEach(() => {
      (document.addEventListener as jest.Mock).mockRestore();
      (document.removeEventListener as jest.Mock).mockRestore();
    });

    interface HandlerMap {
      [eventName: string]: any;
    }

    const listenerMap: HandlerMap = {};

    it('does nothing if trapping is false', () => {
      const trapFocus = mountWithApp(<TrapFocus trapping={false} />);
      const activeElement = document.activeElement;

      listenerMap.keydown({keyCode: Key.Tab, element: trapFocus});

      expect(document.activeElement).toBe(activeElement);
      expect(focusUtils.focusFirstKeyboardFocusableNode).not.toHaveBeenCalled();
      expect(focusUtils.focusLastKeyboardFocusableNode).not.toHaveBeenCalled();
    });

    it('prevents default if the target is the last element and the shift key is not pressed', () => {
      const preventDefaultSpy = jest.fn();

      const trapFocus = mountWithApp(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        target: trapFocus.find('input')!.domNode,
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('focuses the first keyboard focusable node', () => {
      const trapFocus = mountWithApp(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        target: trapFocus.find('input')!.domNode,
        preventDefault: noop,
      });

      expect(document.activeElement).toBe(trapFocus.find('button')!.domNode);
      expect(focusUtils.focusFirstKeyboardFocusableNode).toHaveBeenCalled();
    });

    it('prevents default if the target is the first element and the shift key is pressed', () => {
      const preventDefaultSpy = jest.fn();

      const trapFocus = mountWithApp(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        shiftKey: Key.Shift,
        target: trapFocus.find('button')!.domNode,
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('focuses the last keyboard focusable node', () => {
      const trapFocus = mountWithApp(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        shiftKey: Key.Shift,
        target: trapFocus.find('button')!.domNode,
        preventDefault: noop,
      });

      expect(document.activeElement).toBe(trapFocus.find('input')!.domNode);
      expect(focusUtils.focusLastKeyboardFocusableNode).toHaveBeenCalled();
    });
  });
});

function noop() {}
