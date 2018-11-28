import * as React from 'react';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import {noop} from 'utilities/other';
import Popover from '../Popover';
import {PopoverOverlay} from '../components';

describe('<Popover />', () => {
  const mockProps = {
    active: false,
    activator: <div />,
    onClose: noop,
  };

  const spy = jest.fn();

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
    const activatorWrapper = findByTestID(popover, 'wrapper-component');
    expect(activatorWrapper.type()).toBe('div');
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
    const activatorWrapper = findByTestID(popover, 'wrapper-component');
    expect(activatorWrapper.type()).toBe('span');
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

  it('passes the header into the overlay', () => {
    const header = <div />;
    const popover = mountWithAppProvider(
      <Popover {...mockProps} header={header} />,
    );
    expect(popover.find(PopoverOverlay).prop('header')).toBe(header);
  });
});
