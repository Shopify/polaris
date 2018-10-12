import * as React from 'react';
import {shallowWithAppProvider} from 'tests/utilities';
import Collapsible from '../Collapsible';

describe('<Collapsible />', () => {
  const ariaHiddenSelector = '[aria-hidden=true]';

  it('does not render its children and indicates hidden with aria-hidden', () => {
    const collapsible = shallowWithAppProvider(
      <Collapsible id="test-collapsible" open={false}>
        content
      </Collapsible>,
    );

    const hidden = collapsible.find(ariaHiddenSelector);
    expect(hidden.exists()).toBe(true);
    expect(collapsible.contains('content')).toBe(false);
  });

  it('renders its children and does not render aria-hidden when open', () => {
    const collapsible = shallowWithAppProvider(
      <Collapsible id="test-collapsible" open>
        content
      </Collapsible>,
    );

    const hidden = collapsible.find(ariaHiddenSelector);
    expect(hidden.exists()).toBe(false);
    expect(collapsible.contains('content')).toBe(true);
  });
});
