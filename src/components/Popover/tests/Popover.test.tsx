import React, {useState, useCallback} from 'react';
import {mountWithAppProvider, findByTestID} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Popover} from '../Popover';
import {PopoverOverlay} from '../components';
import * as SetActivatorAttributes from '../set-activator-attributes';

describe('<Popover />', () => {
  const spy = jest.fn();
  let setActivatorAttributesSpy: jest.SpyInstance;

  beforeEach(() => {
    setActivatorAttributesSpy = jest.spyOn(
      SetActivatorAttributes,
      'setActivatorAttributes',
    );
  });

  afterEach(() => {
    setActivatorAttributesSpy.mockRestore();
  });

  it('invokes setActivatorAttributes with active, ariaHasPopup and id', () => {
    mountWithAppProvider(
      <Popover active={false} activator={<div>Activator</div>} onClose={spy} />,
    );

    expect(setActivatorAttributesSpy).toHaveBeenLastCalledWith(
      expect.any(Object),
      {active: false, ariaHaspopup: undefined, id: 'Popover1'},
    );
  });

  it('renders a portal', () => {
    const popover = mountWithAppProvider(
      <Popover active={false} activator={<div>Activator</div>} onClose={spy} />,
    );
    const portal = findByTestID(popover, 'portal');
    expect(portal.exists()).toBeTruthy();
  });

  it('renders an activator', () => {
    const popover = mountWithAppProvider(
      <Popover
        active
        activator={<div testID="activator">Activator</div>}
        onClose={spy}
      />,
    );
    const activator = findByTestID(popover, 'activator');
    expect(activator.exists()).toBeTruthy();
  });

  it('renders a positionedOverlay when active is true', () => {
    const popover = mountWithAppProvider(
      <Popover active activator={<div>Activator</div>} onClose={spy} />,
    );
    const positionedOverlay = findByTestID(popover, 'positionedOverlay');
    expect(positionedOverlay.exists()).toBeTruthy();
  });

  it('doesn’t render a popover when active is false', () => {
    const popover = mountWithAppProvider(
      <Popover active={false} activator={<div>Activator</div>} onClose={spy} />,
    );
    const positionedOverlay = findByTestID(popover, 'positionedOverlay');
    expect(positionedOverlay.exists()).toBeFalsy();
  });

  it("passes 'preferredPosition' to PopoverOverlay", () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    const popoverOverlay = findByTestID(popover, 'popoverOverlay');
    expect(popoverOverlay.prop('preferredPosition')).toBe('above');
  });

  it("passes 'preferredAlignment' to PopoverOverlay", () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
        preferredAlignment="left"
      />,
    );
    const popoverOverlay = findByTestID(popover, 'popoverOverlay');
    expect(popoverOverlay.prop('preferredAlignment')).toBe('left');
  });

  it('has a div as activatorWrapper by default', () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    expect(popover.childAt(0).type()).toBe('div');
  });

  it('has a span as activatorWrapper when activatorWrapper prop is set to span', () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        activatorWrapper="span"
        preferredPosition="above"
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    expect(popover.childAt(0).type()).toBe('span');
  });

  it('passes preventAutofocus to PopoverOverlay', () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        preventAutofocus
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    const popoverOverlay = findByTestID(popover, 'popoverOverlay');
    expect(popoverOverlay.prop('preventAutofocus')).toBe(true);
  });

  it('passes sectioned to PopoverOverlay', () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        sectioned
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    const popoverOverlay = findByTestID(popover, 'popoverOverlay');
    expect(popoverOverlay.prop('sectioned')).toBe(true);
  });

  it('passes fullWidth to PopoverOverlay', () => {
    const popover = mountWithAppProvider(
      <Popover
        active={false}
        fullWidth
        activator={<div>Activator</div>}
        onClose={spy}
      />,
    );
    const popoverOverlay = findByTestID(popover, 'popoverOverlay');
    expect(popoverOverlay.prop('fullWidth')).toBe(true);
  });

  it('calls onClose when you click outside the Popover', () => {
    mountWithAppProvider(
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

    const popoverWithDisconnectedActivator = mountWithAppProvider(
      <PopoverWithDisconnectedActivator />,
    );

    popoverWithDisconnectedActivator.find('button').simulate('click');
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
