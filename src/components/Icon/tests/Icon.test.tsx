import * as React from 'react';
import {shallowWithAppProvider} from '../../../../tests/utilities';
import Icon from '..';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const element = shallowWithAppProvider(
        <Icon source="placeholder" accessibilityLabel="This is an icon" />,
      );
      expect(element.prop('aria-label')).toBe('This is an icon');
    });
  });
});
