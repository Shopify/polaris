import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {
  mountWithAppProvider,
  trigger,
  ReactWrapper,
} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {
  EventListener,
  Focus,
  TextContainer,
  TextField,
  Button,
} from 'components';
import * as focusUtilities from '@shopify/javascript-utilities/focus';

import * as focusUtils from '../../../utilities/focus';
import {TrapFocus} from '../TrapFocus';
import {Key} from '../../../types';

jest.mock('@shopify/javascript-utilities/fastdom', () => ({
  ...jest.requireActual('@shopify/javascript-utilities/fastdom'),
  write: (cb: () => void) => cb(),
}));

describe('<TrapFocus />', () => {
  let focusFirstFocusableNodeSpy: jest.SpyInstance;
  let focusFirstKeyboardFocusableNodeSpy: jest.SpyInstance;
  let focusLastKeyboardFocusableNodeSpy: jest.SpyInstance;

  beforeEach(() => {
    focusFirstFocusableNodeSpy = jest.spyOn(
      focusUtilities,
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
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <TextContainer>Test</TextContainer>
      </TrapFocus>,
    );

    expect(trapFocus.exists()).toBe(true);

    // Render children
    expect(trapFocus.find(TextContainer)).toHaveLength(1);

    // Renders Focus
    expect(trapFocus.find(Focus)).toHaveLength(1);

    // Renders an event listener
    expect(trapFocus.find(EventListener)).toHaveLength(1);
    expect(trapFocus.find(EventListener).prop('event')).toBe('focusin');
  });

  it('renders a Focus component with a `disabled` prop set to false by default', () => {
    const focus = mountWithAppProvider(
      <TrapFocus>
        <div />
      </TrapFocus>,
    ).find(Focus);
    expect(focus.prop('disabled')).toBe(false);
  });

  it('renders a Focus component with a `disabled` prop set to true when `trapping` is false', () => {
    const focus = mountWithAppProvider(
      <TrapFocus trapping={false}>
        <div />
      </TrapFocus>,
    ).find(Focus);

    expect(focus.prop('disabled')).toBe(true);
  });

  it('renders a Focus component with a `disabled` prop set to false when `trapping` is true', () => {
    const focus = mountWithAppProvider(
      <TrapFocus trapping>
        <div />
      </TrapFocus>,
    ).find(Focus);

    expect(focus.prop('disabled')).toBe(false);
  });

  it('keeps focus on nodes contained inside trap focus during mount', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <TextField label="" value="" onChange={noop} autoFocus />
      </TrapFocus>,
    );
    const input = trapFocus.find('input').getDOMNode();
    expect(document.activeElement).toBe(input);
  });

  it('focuses the first focused node when nodes contained in trap focus are not in focus', () => {
    const trapFocus = mountWithAppProvider(
      <TrapFocus>
        <a href="/">
          <TextField label="" value="" onChange={noop} />
        </a>
      </TrapFocus>,
    );
    const focusedElement = trapFocus.find('a').getDOMNode();

    expect(document.activeElement).toBe(focusedElement);
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

    expect(trapFocus.find('input', {id})!.domNode).toBe(document.activeElement);
  });

  describe('handleBlur', () => {
    const externalDomNode = mountWithAppProvider(<Button />)
      .find('button')
      .getDOMNode();

    const event: FocusEvent = new FocusEvent('focusout', {
      relatedTarget: externalDomNode,
    });
    Object.assign(event, {preventDefault: jest.fn()});

    it('allows default when trapping is false', () => {
      const trapFocus = mountWithAppProvider(
        <TrapFocus trapping={false}>
          <TextField label="" value="" onChange={noop} autoFocus />
        </TrapFocus>,
      );

      const event: FocusEvent = new FocusEvent('focusout', {
        relatedTarget: externalDomNode,
      });
      Object.assign(event, {preventDefault: jest.fn()});

      trigger(trapFocus.find(EventListener), 'handler', event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('allows default when the related target is a child', () => {
      const trapFocus = mountWithAppProvider(
        <TrapFocus>
          <TextField label="" value="" onChange={noop} autoFocus />
        </TrapFocus>,
      );

      const internalDomNode = trapFocus.find('input').getDOMNode();

      const event: FocusEvent = new FocusEvent('focusout', {
        relatedTarget: internalDomNode,
      });
      Object.assign(event, {preventDefault: jest.fn()});

      trigger(trapFocus.find(EventListener), 'handler', event);

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('focuses focusTrapWrapper when focusTrapWrapper does not contain a focusable element and the event target is not the firstFocusableNode', () => {
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
      const trapFocus = mountWithAppProvider(<TrapFocus trapping={false} />);
      const activeElement = document.activeElement;

      listenerMap.keydown({keyCode: Key.Tab, element: trapFocus});

      expect(activeElement).toBe(document.activeElement);
      expect(focusUtils.focusFirstKeyboardFocusableNode).not.toHaveBeenCalled();
      expect(focusUtils.focusLastKeyboardFocusableNode).not.toHaveBeenCalled();
    });

    it('prevents default if the target is the last element and the shift key is not pressed', () => {
      const preventDefaultSpy = jest.fn();

      const trapFocus = mountWithAppProvider(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        target: lastNode(trapFocus),
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('focuses the first keyboard focusable node', () => {
      const trapFocus = mountWithAppProvider(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        target: lastNode(trapFocus),
        preventDefault: noop,
      });

      expect(document.activeElement).toBe(firstNode(trapFocus));
      expect(focusUtils.focusFirstKeyboardFocusableNode).toHaveBeenCalled();
    });

    it('prevents default if the target is the first element and the shift key is pressed', () => {
      const preventDefaultSpy = jest.fn();

      const trapFocus = mountWithAppProvider(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        shiftKey: Key.Shift,
        target: firstNode(trapFocus),
        preventDefault: preventDefaultSpy,
      });

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('focuses the last keyboard focusable node', () => {
      const trapFocus = mountWithAppProvider(
        <TrapFocus>
          <button />
          <input />
        </TrapFocus>,
      );

      listenerMap.keydown({
        keyCode: Key.Tab,
        shiftKey: Key.Shift,
        target: firstNode(trapFocus),
        preventDefault: noop,
      });

      expect(document.activeElement).toBe(lastNode(trapFocus));
      expect(focusUtils.focusLastKeyboardFocusableNode).toHaveBeenCalled();
    });
  });
});

function noop() {}

function firstNode(element: ReactWrapper) {
  const elementNode = element.getDOMNode();

  if (Array.isArray(elementNode))
    return focusUtils.findFirstKeyboardFocusableNode(elementNode[0]);
  return focusUtils.findFirstKeyboardFocusableNode(elementNode as HTMLElement);
}

function lastNode(element: ReactWrapper) {
  const elementNode = element.getDOMNode();

  if (Array.isArray(elementNode))
    return focusUtils.findLastKeyboardFocusableNode(elementNode[0]);
  return focusUtils.findLastKeyboardFocusableNode(elementNode as HTMLElement);
}
