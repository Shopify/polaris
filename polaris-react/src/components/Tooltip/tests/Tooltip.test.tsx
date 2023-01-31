import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Link} from '../../Link';
import {Tooltip} from '../Tooltip';
import {TooltipOverlay} from '../components';

describe('<Tooltip />', () => {
  it('renders its children', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    expect(tooltip).toContainReactComponent('button');
  });

  it('does not render initially', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');
  });

  it('renders initially when active is true', () => {
    const tooltipActive = mountWithApp(
      <Tooltip content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );

    expect(tooltipActive.find(TooltipOverlay)).toContainReactComponent('div');
  });

  it('passes preventInteraction to TooltipOverlay when dismissOnMouseOut is true', () => {
    const tooltip = mountWithApp(
      <Tooltip dismissOnMouseOut content="Inner content" active>
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      preventInteraction: true,
    });
  });

  it('renders on mouseOver', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onMouseOver');
    expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div');
  });

  it('renders on focus', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onFocus');
    expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div');
  });

  it('unrenders its children on blur', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onBlur');
    expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');
  });

  it('unrenders its children on mouseLeave', () => {
    const tooltip = mountWithApp(
      <Tooltip content="Inner content">
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onMouseLeave');
    expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');
  });

  it('closes itself when escape is pressed on keyup', () => {
    const tooltip = mountWithApp(
      <Tooltip active content="This order has shipping labels.">
        <div>Order #1001</div>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onKeyUp', {
      key: 'Escape',
    });

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: false,
    });
  });

  it('does not call onOpen when initially activated', () => {
    const openSpy = jest.fn();
    const tooltip = mountWithApp(
      <Tooltip
        active
        content="This order has shipping labels."
        onOpen={openSpy}
      >
        <div>Order #1001</div>
      </Tooltip>,
    );

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: true,
    });

    expect(openSpy).not.toHaveBeenCalled();
  });

  it('calls onClose when initially activated and then closed', () => {
    const closeSpy = jest.fn();
    const tooltip = mountWithApp(
      <Tooltip
        active
        content="This order has shipping labels."
        onClose={closeSpy}
      >
        <div>Order #1001</div>
      </Tooltip>,
    );

    tooltip.act(() =>
      findWrapperComponent(tooltip)!.trigger('onKeyUp', {
        key: 'Escape',
      }),
    );

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: false,
    });

    expect(closeSpy).toHaveBeenCalled();
  });

  it('calls onOpen on mouseOver', () => {
    const openSpy = jest.fn();

    const tooltip = mountWithApp(
      <Tooltip content="Inner content" onOpen={openSpy}>
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onMouseOver');

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: true,
    });

    expect(openSpy).toHaveBeenCalled();
  });

  it('calls onOpen on focus', () => {
    const openSpy = jest.fn();

    const tooltip = mountWithApp(
      <Tooltip content="Inner content" onOpen={openSpy}>
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onFocus');

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: true,
    });

    expect(openSpy).toHaveBeenCalled();
  });

  it('calls onClose on blur', () => {
    const closeSpy = jest.fn();

    const tooltip = mountWithApp(
      <Tooltip active content="Inner content" onClose={closeSpy}>
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onBlur');

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: false,
    });

    expect(closeSpy).toHaveBeenCalled();
  });

  it('calls onClose on mouseLeave', () => {
    const closeSpy = jest.fn();

    const tooltip = mountWithApp(
      <Tooltip active content="Inner content" onClose={closeSpy}>
        <Link>link content</Link>
      </Tooltip>,
    );

    findWrapperComponent(tooltip)!.trigger('onMouseLeave');

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      active: false,
    });

    expect(closeSpy).toHaveBeenCalled();
  });

  it('passes accessibility label to TooltipOverlay', () => {
    const accessibilityLabel = 'accessibility label';

    const tooltip = mountWithApp(
      <Tooltip
        accessibilityLabel={accessibilityLabel}
        content="Inner content"
        active
      >
        <Link>link content</Link>
      </Tooltip>,
    );
    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      accessibilityLabel,
    });
  });

  it("passes 'zIndexOverride' to TooltipOverlay", () => {
    const tooltip = mountWithApp(
      <Tooltip active content="Inner content" zIndexOverride={100}>
        <Link>link content</Link>
      </Tooltip>,
    );

    expect(tooltip).toContainReactComponent(TooltipOverlay, {
      zIndexOverride: 100,
    });
  });

  describe('width', () => {
    it('renders content with the default width', () => {
      const tooltip = mountWithApp(
        <Tooltip content="Inner content">
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div', {
        className: expect.stringContaining('default'),
      });
      expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div', {
        className: expect.stringContaining('wide'),
      });
    });

    it('renders content with wide width when declared', () => {
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" width="wide">
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div', {
        className: expect.stringContaining('default'),
      });
      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div', {
        className: expect.stringContaining('wide'),
      });
    });
  });

  describe('padding', () => {
    it('renders content with default padding', () => {
      const tooltip = mountWithApp(
        <Tooltip content="Inner content">
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-tooltip-padding': 'var(--p-space-1) var(--p-space-2)',
        }) as React.CSSProperties,
      });
    });

    it('renders content with a padding of 4 when declared', () => {
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" padding="4">
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-tooltip-padding': 'var(--p-space-1) var(--p-space-2)',
        }) as React.CSSProperties,
      });

      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-tooltip-padding': 'var(--p-space-4)',
        }) as React.CSSProperties,
      });
    });
  });

  describe('borderRadius', () => {
    it('renders content with the default border radius', () => {
      const tooltip = mountWithApp(
        <Tooltip content="Inner content">
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-tooltip-border-radius': 'var(--p-border-radius-1)',
        }) as React.CSSProperties,
      });
    });

    it('renders content with a border radius of 2 when declared', () => {
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" borderRadius="2">
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div', {
        style: expect.objectContaining({
          '--pc-tooltip-border-radius': 'var(--p-border-radius-2)',
        }) as React.CSSProperties,
      });
    });
  });

  describe('with hoverDelay', () => {
    it('renders on mouseOver after specified hoverDelay', () => {
      jest.useFakeTimers();

      const tooltip = mountWithApp(
        <Tooltip hoverDelay={2000} content="Inner content">
          <Link>link content</Link>
        </Tooltip>,
      );
      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');

      tooltip.act(() => jest.advanceTimersByTime(1999));

      expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');

      tooltip.act(() => jest.advanceTimersByTime(1));

      expect(tooltip.find(TooltipOverlay)).toContainReactComponent('div');

      jest.useRealTimers();
    });

    it('does not render on mouseOver if mouseLeave occurs before hoverDelay ellapses', () => {
      jest.useFakeTimers();

      const tooltip = mountWithApp(
        <Tooltip hoverDelay={2000} content="Inner content">
          <Link>link content</Link>
        </Tooltip>,
      );
      findWrapperComponent(tooltip)!.trigger('onMouseOver');

      tooltip.act(() => jest.advanceTimersByTime(500));

      findWrapperComponent(tooltip)!.trigger('onMouseLeave');

      tooltip.act(() => jest.advanceTimersByTime(2000));

      expect(tooltip.find(TooltipOverlay)).not.toContainReactComponent('div');

      jest.useRealTimers();
    });
  });

  describe('keyboard shortcut"', () => {
    it('passes the keyboard shortcut prop down to the TooltipOverlay', () => {
      const keyboardShortcut = '#B';
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" keyboardShortcut={keyboardShortcut}>
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      expect(tooltip).toContainReactComponent(TooltipOverlay, {
        keyboardShortcut,
      });
    });
  });

  describe('with mode="icon"', () => {
    it('passes the mode prop down to the TooltipOverlay', () => {
      const mode = 'icon';
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" mode={mode}>
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      expect(tooltip).toContainReactComponent(TooltipOverlay, {
        mode,
      });
    });

    it('will not pass the instant prop when no tooltip is currently present', () => {
      const mode = 'icon';
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" mode={mode}>
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      expect(tooltip).toContainReactComponent(TooltipOverlay, {
        instant: false,
      });
    });

    it('will pass the instant prop when immediately re-entering the activator', () => {
      jest.useFakeTimers();

      const mode = 'icon';
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" mode={mode}>
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      tooltip.act(() => jest.advanceTimersByTime(5));

      findWrapperComponent(tooltip)!.trigger('onMouseLeave');

      tooltip.act(() => jest.advanceTimersByTime(5));
      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      expect(tooltip).toContainReactComponent(TooltipOverlay, {
        instant: true,
      });
    });

    it('will remove the instant prop when re-entering the activator after a delay', () => {
      jest.useFakeTimers();

      const mode = 'icon';
      const tooltip = mountWithApp(
        <Tooltip content="Inner content" mode={mode}>
          <Link>link content</Link>
        </Tooltip>,
      );

      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      tooltip.act(() => jest.advanceTimersByTime(5));

      findWrapperComponent(tooltip)!.trigger('onMouseLeave');

      tooltip.act(() => jest.advanceTimersByTime(150));
      findWrapperComponent(tooltip)!.trigger('onMouseOver');
      expect(tooltip).toContainReactComponent(TooltipOverlay, {
        instant: false,
      });
    });

    describe('overriding hover delay', () => {
      it('will pass the instant prop when immediately re-entering the activator', () => {
        jest.useFakeTimers();

        const mode = 'icon';
        const tooltip = mountWithApp(
          <Tooltip content="Inner content" hoverDelay={1000} mode={mode}>
            <Link>link content</Link>
          </Tooltip>,
        );

        findWrapperComponent(tooltip)!.trigger('onMouseOver');
        tooltip.act(() => jest.advanceTimersByTime(1010));

        findWrapperComponent(tooltip)!.trigger('onMouseLeave');

        tooltip.act(() => jest.advanceTimersByTime(5));
        findWrapperComponent(tooltip)!.trigger('onMouseOver');
        expect(tooltip).toContainReactComponent(TooltipOverlay, {
          instant: true,
        });
      });
    });

    // mockEphemeralPresenceManager({
    //   presenceList: {
    //     tooltip: false
    //   },
    //   presenceCounter: {
    //     tooltip: 0
    //   },
    //   addPresence: jest.fn(),
    //   removePresence: jest.fn()
    // });
  });
});

function findWrapperComponent(tooltip: any) {
  return tooltip.find('span');
}
