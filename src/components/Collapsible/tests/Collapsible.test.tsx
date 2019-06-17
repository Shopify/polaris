import React from 'react';
import {mountWithAppProvider} from 'test-utilities/legacy';
import Collapsible from '../Collapsible';

describe('<Collapsible />', () => {
  const ariaHiddenSelector = '[aria-hidden=true]';

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
