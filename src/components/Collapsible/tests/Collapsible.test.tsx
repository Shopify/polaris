import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Collapsible} from '../Collapsible';

describe('<Collapsible />', () => {
  const ariaHiddenSelector = '[aria-hidden=true]';

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

    const collapsible = mountWithAppProvider(
      <Collapsible id="test-collapsible" open>
        <Child />
      </Collapsible>,
    );

    expect(collapsible.find(Child)).toHaveLength(1);
    collapsible.setProps({open: false});
    collapsible.simulate('transitionEnd');
    expect(collapsible.find(Child)).toHaveLength(0);
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
