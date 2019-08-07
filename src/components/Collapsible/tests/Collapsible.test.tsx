import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import Collapsible from '../Collapsible';

describe('<Collapsible />', () => {
  const ariaHiddenSelector = '[aria-hidden=true]';
  let setTimeoutMock: jest.SpyInstance;

  beforeEach(() => {
    setTimeoutMock = jest
      .spyOn(window, 'setTimeout')
      .mockImplementation((cb: Function) => cb());
  });

  afterEach(() => {
    setTimeoutMock.mockRestore();
  });

  it('does not render its children and indicates hidden with aria-hidden', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    const hidden = collapsible.find(ariaHiddenSelector);
    expect(hidden.exists()).toBe(true);
    expect(collapsible.contains('content')).toBe(false);
  });

  it('does not render its children when going from open to closed', () => {
    const Child = () => null;

    const collapsible = mountWithApp(
      <Collapsible id="test-collapsible" open>
        <Child />
      </Collapsible>,
    );

    expect(collapsible).toContainReactComponent(Child);
    collapsible.setProps({open: false});
    expect(collapsible).not.toContainReactComponent(Child);
  });

  it('renders its children and does not render aria-hidden when open', () => {
    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    const hidden = collapsible.find(ariaHiddenSelector);
    expect(hidden.exists()).toBe(false);
    expect(collapsible.contains('content')).toBe(true);
  });
});
