import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {useHoverCardActivatorWrapperProps} from '../hooks/use-hover-card-activator-wrapper-props';

jest.mock('../../../utilities/breakpoints', () => ({
  ...jest.requireActual('../../../utilities/breakpoints'),
  useBreakpoints: jest.fn(),
}));

describe('useHoverCardActivatorWrapperProps', () => {
  const toggleActive = jest.fn();
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    matchMedia.mock();
    mockUseBreakpoints(true);
    setTimeoutSpy = jest
      .spyOn(window, 'setTimeout')
      .mockImplementation((cb: any) => cb());
  });

  afterEach(() => {
    matchMedia.restore();
    setTimeoutSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('calls toggleActive when mouse enters the activator', () => {
    const component = mountWithApp(
      <ChildActivatorComponent toggleActive={toggleActive} />,
    );

    const activator = component.find('div');
    const activatorNode = activator?.domNode as HTMLElement;
    activator!.trigger('onMouseEnter', {
      bubbles: true,
      target: activatorNode,
    });

    expect(toggleActive).toHaveBeenCalledWith(true);
  });

  it('calls toggleActive when mouse leaves the activator', () => {
    const component = mountWithApp(
      <ChildActivatorComponent toggleActive={toggleActive} />,
    );

    const activator = component.find('div');
    const activatorNode = activator?.domNode as HTMLElement;

    activator!.trigger('onMouseLeave', {
      target: activatorNode,
    });

    expect(toggleActive).toHaveBeenCalledWith(false);
  });

  it('returns null when there is no current activator', () => {
    const component = mountWithApp(<DynamicActivatorParentComponent />);

    expect(component.find('p')).toContainReactText('Not active');
  });

  it('returns the current activator', () => {
    const component = mountWithApp(<DynamicActivatorParentComponent />);
    const activator = component.findAll(DynamicActivatorChildComponent)[0];
    const node = activator.domNode as HTMLElement;
    component.act(() => {
      activator.find('div')!.trigger('onMouseEnter', {
        bubbles: true,
        target: node,
        currentTarget: node,
      });
    });

    const hoverCardState = component.find('p');
    expect(hoverCardState).toContainReactText('Active');
  });
});

function mockUseBreakpoints(mdUp: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdUp,
  });
}

function ChildActivatorComponent({
  snapToParent = false,
  toggleActive,
}: {
  snapToParent?: boolean;
  toggleActive?(active: boolean): void;
}) {
  const ref: React.RefObject<HTMLDivElement> = {current: null};

  const {className, handleMouseLeaveActivator, handleMouseEnterActivator} =
    useHoverCardActivatorWrapperProps({
      snapToParent,
      toggleActive,
      ref,
    });

  return (
    <div
      ref={ref}
      data-hovercard-activator
      onMouseEnter={handleMouseEnterActivator}
      onMouseLeave={handleMouseLeaveActivator}
      className={className}
    >
      Activator
    </div>
  );
}

function DynamicActivatorChildComponent({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  className: string;
  onMouseEnter: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  onMouseLeave: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
}) {
  return (
    <div
      data-hovercard-activator
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

function DynamicActivatorParentComponent() {
  const {
    className,
    activatorElement: currentActivator,
    handleMouseEnterActivator,
    handleMouseLeaveActivator,
  } = useHoverCardActivatorWrapperProps({});

  const activators = Array.from({length: 5}, (_, index) => (
    <DynamicActivatorChildComponent
      key={index}
      className={className}
      onMouseEnter={handleMouseEnterActivator}
      onMouseLeave={handleMouseLeaveActivator}
    >
      {`Activator ${index + 1}`}
    </DynamicActivatorChildComponent>
  ));

  const hoverCardMarkup = (
    <p>{`${currentActivator !== null ? 'Active' : 'Not active'}`}</p>
  );

  return (
    <div>
      {activators}
      {hoverCardMarkup}
    </div>
  );
}
