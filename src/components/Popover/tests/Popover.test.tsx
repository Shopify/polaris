import React, {useState, useCallback} from 'react';
import {mountWithApp} from 'test-utilities';
import {PositionedOverlay} from 'components/PositionedOverlay';
import {Portal} from 'components';

import {Popover} from '../Popover';
import {PopoverOverlay} from '../components';
import * as setActivatorAttributes from '../set-activator-attributes';

describe('<Popover />', () => {
  const spy = jest.fn();
  let setActivatorAttributesSpy: jest.SpyInstance;

  beforeEach(() => {
    setActivatorAttributesSpy = jest.spyOn(
      setActivatorAttributes,
      'setActivatorAttributes',
    );
  });

  afterEach(() => {
    setActivatorAttributesSpy.mockRestore();
  });

  it('invokes setActivatorAttributes with active, ariaHasPopup, activatorDisabled, and id', () => {
    mountWithApp(
      <Popover active={false} activator={<div>Activator</div>} onClose={spy} />,
    );

    expect(setActivatorAttributesSpy).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        active: false,
        ariaHaspopup: undefined,
        id: 'Polarispopover1',
        activatorDisabled: false,
      },
    );
  });

  it('invokes setActivatorAttributes activatorDisabled true when the activator is disabled', () => {
    mountWithApp(
      <Popover
        active={false}
        activator={<button disabled>Activator</button>}
        onClose={spy}
      />,
    );

    expect(setActivatorAttributesSpy).toHaveBeenLastCalledWith(
      expect.any(Object),
      {
        active: false,
        ariaHaspopup: undefined,
        id: 'Polarispopover1',
        activatorDisabled: true,
      },
    );
  });

  it('renders a portal', () => {
    const popover = mountWithApp(
      <Popover active={false} activator={<div>Activator</div>} onClose={spy} />,
    );
    expect(popover).toContainReactComponent(Portal);
  });

  it('renders an activator', () => {
    const popover = mountWithApp(
      <Popover
        active
        activator={<div testID="activator">Activator</div>}
        onClose={spy}
      />,
    );
    expect(popover).toContainReactComponent('div', {testID: 'activator'});
  });

  it('renders a positionedOverlay when active is true', () => {
    const popover = mountWithApp(
      <Popover active activator={<div>Activator</div>} onClose={spy} />,
    );
    expect(popover).toContainReactComponent(PositionedOverlay);
  });

  it('doesn’t render a popover when active is false', () => {
    const popover = mountWithApp(
      <Popover active={false} activator={<div>Activator</div>} onClose={spy} />,
    );
    expect(popover).not.toContainReactComponent(PositionedOverlay);
  });

  it("passes 'preferredPosition' to PopoverOverlay", () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );

    expect(popover).toContainReactComponent(PopoverOverlay, {
      preferredPosition: 'above',
    });
  });

  it("passes 'preferredAlignment' to PopoverOverlay", () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
        preferredAlignment="left"
      />,
    );

    expect(popover).toContainReactComponent(PopoverOverlay, {
      preferredAlignment: 'left',
    });
  });

  it("passes 'preferInputActivator' to PopoverOverlay", () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
        preferInputActivator={false}
      />,
    );

    expect(popover).toContainReactComponent(PopoverOverlay, {
      preferInputActivator: false,
    });
  });

  it('has a div as activatorWrapper by default', () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    expect(popover.children[0].type).toBe('div');
  });

  it('has a span as activatorWrapper when activatorWrapper prop is set to span', () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        activatorWrapper="span"
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    expect(popover.children[0].type).toBe('span');
  });

  it('passes preventAutofocus to PopoverOverlay', () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        preventAutofocus
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );

    expect(popover).toContainReactComponent(PopoverOverlay, {
      preventAutofocus: true,
    });
  });

  it('passes sectioned to PopoverOverlay', () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        sectioned
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );

    expect(popover).toContainReactComponent(PopoverOverlay, {
      sectioned: true,
    });
  });

  it('passes fullWidth to PopoverOverlay', () => {
    const popover = mountWithApp(
      <Popover
        active={false}
        fullWidth
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );

    expect(popover).toContainReactComponent(PopoverOverlay, {
      fullWidth: true,
    });
  });

  it('passes fluidContent to PopoverOverlay', () => {
    const popover = mountWithApp(
      <Popover
        active
        fluidContent
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    expect(popover).toContainReactComponent(PopoverOverlay, {
      fluidContent: true,
    });
  });

  it('calls onClose when you click outside the Popover', () => {
    mountWithApp(
      <Popover
        active
        fullWidth
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    const evt = new CustomEvent('click');
    window.dispatchEvent(evt);
    expect(spy).toHaveBeenCalled();
  });

  it('does not call onClose when Popover is opening and trigger was not the activator', () => {
    function PopoverWithDisconnectedActivator() {
      const [active, setActive] = useState(false);
      const handleActivatorClick = useCallback(() => setActive(true), []);

      return (
        <React.Fragment>
          <button onClick={handleActivatorClick}>Activator</button>
          <Popover active={active} activator={<div />} onClose={onCloseSpy} />
        </React.Fragment>
      );
    }

    const onCloseSpy = jest.fn();

    const popoverWithDisconnectedActivator = mountWithApp(
      <PopoverWithDisconnectedActivator />,
    );

    popoverWithDisconnectedActivator.find('button')!.trigger('onClick');
    const evt = new CustomEvent('click');
    window.dispatchEvent(evt);

    expect(onCloseSpy).not.toHaveBeenCalled();
  });

  it('focuses the next available element when the popover is closed', () => {
    const id = 'focus-target';
    function PopoverTest() {
      return (
        <React.Fragment>
          <div>
            <Popover active activator={<div />} onClose={noop} />
          </div>
          <button id={id} />
        </React.Fragment>
      );
    }

    const popover = mountWithApp(<PopoverTest />);

    popover.find(PopoverOverlay)!.trigger('onClose', 1);
    const focusTarget = popover.find('button', {id})!.domNode;

    expect(document.activeElement).toBe(focusTarget);
  });

  it('focuses the activator when another focusable element is not available when the popover is closed', () => {
    const id = 'activator';
    function PopoverTest() {
      return (
        <React.Fragment>
          <Popover active activator={<button id={id} />} onClose={noop} />
        </React.Fragment>
      );
    }

    const popover = mountWithApp(<PopoverTest />);

    popover.find(PopoverOverlay)!.trigger('onClose', 1);
    const focusTarget = popover.find('button', {id})!.domNode;

    expect(document.activeElement).toBe(focusTarget);
  });
});

function noop() {}
