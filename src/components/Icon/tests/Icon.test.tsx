import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';

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
