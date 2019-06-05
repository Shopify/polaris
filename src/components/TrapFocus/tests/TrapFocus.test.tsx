import React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {
  EventListener,
  Focus,
  TextContainer,
  TextField,
  Button,
} from 'components';
import TrapFocus from '../TrapFocus';

describe('<TrapFocus />', () => {
  let requestAnimationFrameSpy: jest.SpyInstance;

  beforeEach(() => {
    requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame');
    requestAnimationFrameSpy.mockImplementation((cb) => cb());
  });

  afterEach(() => {
    (document.activeElement as HTMLElement).blur();
    requestAnimationFrameSpy.mockRestore();
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
    expect(trapFocus.find(EventListener).prop('event')).toBe('focusout');
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

  describe('handleBlur', () => {
    const externalDomNode = mountWithAppProvider(<Button />)
      .find('button')
      .getDOMNode();

    it('prevents default when focus moves to an external node', () => {
      const trapFocus = mountWithAppProvider(
        <TrapFocus>
          <TextField label="" value="" onChange={noop} autoFocus />
        </TrapFocus>,
      );

      const event: FocusEvent = new FocusEvent('focusout', {
        relatedTarget: externalDomNode,
      });
      Object.assign(event, {preventDefault: jest.fn()});

      trigger(trapFocus.find(EventListener), 'handler', event);

      expect(event.preventDefault).toHaveBeenCalled();
    });

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
  });
});

function noop() {}
