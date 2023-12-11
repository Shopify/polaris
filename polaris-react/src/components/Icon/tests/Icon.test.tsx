import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {Icon} from '../Icon';
import {Text} from '../../Text';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const label = 'This is an icon';
      const element = mountWithApp(
        <Icon source={PlusMinor} accessibilityLabel={label} />,
      ).find('span');

      expect(element).toContainReactComponent(Text, {
        children: label,
        visuallyHidden: true,
      });
    });

    it('does not render the label when not provided', () => {
      const element = mountWithApp(<Icon source={PlusMinor} />).find('span');

      expect(element).not.toContainReactComponent(Text, {
        visuallyHidden: true,
      });
    });
  });

  describe('source', () => {
    it('renders a React Element when source is given a React Stateless Functional Component', () => {
      const element = mountWithApp(<Icon source={PlusMinor} />);
      expect(element).toContainReactComponentTimes(PlusMinor, 1);
    });
  });

  describe('color', () => {
    it('renders a color class when color prop is provided', () => {
      const element = mountWithApp(<Icon source={PlusMinor} tone="base" />);

      expect(element).toContainReactComponent('span', {
        className: 'Icon toneBase',
      });
    });
  });
});
