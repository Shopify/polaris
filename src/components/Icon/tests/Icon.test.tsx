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

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled', () => {
      const icon = mountWithApp(<Icon source={PlusMinor} />, {
        features: {newDesignLanguage: true},
      });
      expect(icon).toContainReactComponent('span', {
        className: 'Icon newDesignLanguage',
      });
    });

    it('warns when an untrusted SVG is used with a color option from the new design language', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      const svg =
        "<svg><path d='M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2'  fill-rule='evenodd'/></svg>";

      mountWithApp(<Icon source={svg} color="subdued" />, {
        features: {newDesignLanguage: true},
      });

      expect(warningSpy).toHaveBeenCalledWith(
        'Recoloring external SVGs is not supported with colors in the new design language. Set the intended color on your SVG instead.',
      );
      warningSpy.mockRestore();
    });

    it('warns when a new design language color is used and new design language is not enabled', () => {
      const warningSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

      mountWithApp(<Icon source={PlusMinor} color="warning" />, {
        features: {newDesignLanguage: false},
      });

      expect(warningSpy).toHaveBeenCalledWith(
        'You have selected a color meant to be used in the new design language but new design language is not enabled.',
      );
      warningSpy.mockRestore();
    });

    it('uses a specified color when newDesignLanguage is enabled', () => {
      const icon = mountWithApp(<Icon source={PlusMinor} color="subdued" />, {
        features: {newDesignLanguage: true},
      });
      expect(icon).toContainReactComponent('span', {
        className: 'Icon colorSubdued isColored newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is disabled, and does not set a default color', () => {
      const icon = mountWithApp(<Icon source={PlusMinor} />, {
        features: {newDesignLanguage: false},
      });
      expect(icon).toContainReactComponent('span', {
        className: 'Icon',
      });
    });
  });
});
