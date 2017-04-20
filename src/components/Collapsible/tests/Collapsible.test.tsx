import * as React from 'react';
import {shallow} from 'enzyme';
import Collapsible from '../Collapsible';

describe('<Collapsible />', () => {
  const ariaHiddenSelector = '[aria-hidden=true]';

    it('indicates hidden with aria-hidden', () => {
      const collapsible = shallow(
        <Collapsible open={false}>
          content
        </Collapsible>,
      );

      const hidden = collapsible.find(ariaHiddenSelector);
      expect(hidden.exists()).toBe(true);
    });

    it('does not render aria-hidden when open', () => {
      const collapsible = shallow(
        <Collapsible open>
          content
        </Collapsible>,
      );

      const hidden = collapsible.find(ariaHiddenSelector);
      expect(hidden.exists()).toBe(false);
    });
});
