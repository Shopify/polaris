import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';

import {Icon} from '../Icon';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const element = mountWithAppProvider(
        <Icon source="placeholder" accessibilityLabel="This is an icon" />,
      ).find('span');

      expect(element.prop('aria-label')).toBe('This is an icon');
    });
  });
  describe('source', () => {
    it("renders a placeholder div when source is set to 'placeholder'", () => {
      const element = mountWithAppProvider(<Icon source="placeholder" />);
      expect(element.find('div')).toHaveLength(1);
    });

    it('renders a React Element when source is given a React Stateless Functional Component', () => {
      const element = mountWithAppProvider(<Icon source={PlusMinor} />);
      expect(element.find(PlusMinor)).toHaveLength(1);
    });

    it('renders an img when source is given an untrusted SVG', () => {
      const svg =
        "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";
      const element = mountWithAppProvider(<Icon source={svg} />);
      expect(element.find('img')).toHaveLength(1);
    });
  });
});
