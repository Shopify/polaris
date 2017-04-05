import * as React from 'react';
import {shallow} from 'enzyme';
import Collapsible from './Collapsible';

describe('<Collapsible />', () => {
  describe('aria', () => {
    const ariaHiddenSelector = '[aria-hidden=true]';
    const ariaExpandedSelector = '[aria-expanded=true]';

    it('indicates expansion with aria-expanded', () => {
      const component = shallow(
        <Collapsible open>
          content
        </Collapsible>,
      );
      const expanded = component.find(ariaExpandedSelector);
      expect(expanded.exists()).toBe(true);
    });

    it('does not render aria-expanded when closed', () => {
      const component = shallow(
        <Collapsible open={false}>
          content
        </Collapsible>,
      );
      const expanded = component.find(ariaExpandedSelector);
      expect(expanded.exists()).toBe(false);
    });

    it('indicates hidden with aria-hidden', () => {
      const component = shallow(
        <Collapsible open={false}>
          content
        </Collapsible>,
      );
      const hidden = component.find(ariaHiddenSelector);
      expect(hidden.exists()).toBe(true);
    });

    it('does not render aria-hidden when open', () => {
      const component = shallow(
        <Collapsible open>
          content
        </Collapsible>,
      );
      const hidden = component.find(ariaHiddenSelector);
      expect(hidden.exists()).toBe(false);
    });
  });
});
