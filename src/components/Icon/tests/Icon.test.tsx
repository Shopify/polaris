import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'test-utilities';

import {Icon} from '../Icon';
import {VisuallyHidden} from '../../VisuallyHidden';

describe('<Icon />', () => {
  describe('accessibilityLabel', () => {
    it('uses the label as the aria-label for the icon', () => {
      const label = 'This is an icon';
      const element = mountWithApp(
        <Icon source="placeholder" accessibilityLabel={label} />,
      ).find('span');

      expect(element).toContainReactComponent(VisuallyHidden, {
        children: label,
      });
    });
  });

  describe('source', () => {
    it("renders a placeholder div when source is set to 'placeholder'", () => {
      const element = mountWithApp(<Icon source="placeholder" />);
      expect(element).toContainReactComponentTimes('div', 1);
    });

    it('renders a React Element when source is given a React Stateless Functional Component', () => {
      const element = mountWithApp(<Icon source={PlusMinor} />);
      expect(element).toContainReactComponentTimes(PlusMinor, 1);
    });

    it('renders an img when source is given an untrusted SVG', () => {
      const svg =
        "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";
      const element = mountWithApp(<Icon source={svg} />);
      expect(element).toContainReactComponentTimes('img', 1);
    });
  });

  describe('color', () => {
    it('renders a color class when color prop is provided', () => {
      const element = mountWithApp(<Icon source="placeholder" color="base" />);

      expect(element).toContainReactComponent('span', {
        className: 'Icon colorBase applyColor',
      });
    });
  });

  describe('console warnings', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('warns when a backdrop color is not available for `subdued`', () => {
      mountWithApp(<Icon source="placeholder" color="subdued" backdrop />);
      expect(warnSpy).toHaveBeenCalledWith(
        'The subdued variant does not have a supported backdrop color',
      );
    });

    it('warns when a backdrop color is not available for `interactive`', () => {
      mountWithApp(<Icon source="placeholder" color="interactive" backdrop />);
      expect(warnSpy).toHaveBeenCalledWith(
        'The interactive variant does not have a supported backdrop color',
      );
    });

    it('warns when a backdrop color is not available for `primary`', () => {
      mountWithApp(<Icon source="placeholder" color="primary" backdrop />);
      expect(warnSpy).toHaveBeenCalledWith(
        'The primary variant does not have a supported backdrop color',
      );
    });
  });
});
