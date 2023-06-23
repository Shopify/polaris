import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Collapsible} from '../../../../../../Collapsible';
import {Item} from '../../../Item';
import {SecondaryNavigation} from '../SecondaryNavigation';
import type {SecondaryNavigationProps} from '../SecondaryNavigation';

describe('<SecondaryNavigation />', () => {
  const matchedItem = {
    url: '#',
    excludePaths: ['#'],
    label: 'Inventory',
    onClick: jest.fn(),
    matches: true,
  };

  const mockProps: SecondaryNavigationProps = {
    ItemComponent: Item,
    longestMatch: matchedItem,
    subNavigationItems: [
      {
        url: '#',
        excludePaths: ['#'],
        disabled: false,
        label: 'Transfers',
        onClick: jest.fn(),
        matches: false,
      },
      matchedItem,
      {
        url: '#',
        excludePaths: ['#'],
        disabled: false,
        label: 'Collections',
        onClick: jest.fn(),
        matches: false,
      },
    ],
    showExpanded: true,
  };

  describe('<Collapsible />', () => {
    it('passes a default id to Collapsible', () => {
      const component = mountWithApp(<SecondaryNavigation {...mockProps} />);
      expect(component).toContainReactComponent(Collapsible, {
        id: ':r0:',
      });
    });

    it('disables Collapsible transition', () => {
      const component = mountWithApp(<SecondaryNavigation {...mockProps} />);
      expect(component).toContainReactComponent(Collapsible, {
        transition: false,
      });
    });

    it('passes true to Collapsible open prop when showExpanded is true', () => {
      const component = mountWithApp(<SecondaryNavigation {...mockProps} />);
      expect(component).toContainReactComponent(Collapsible, {open: true});
    });

    it('renders an unorders list for its children', () => {
      const component = mountWithApp(<SecondaryNavigation {...mockProps} />);
      expect(component).toContainReactComponent('ul');
    });
  });

  describe('<Item />', () => {
    it('renders an <Item /> for each subNavigationItem', () => {
      const component = mountWithApp(<SecondaryNavigation {...mockProps} />);

      expect(component).toContainReactComponentTimes(
        Item,
        mockProps.subNavigationItems.length,
      );

      component.findAll(Item).forEach((item, index) => {
        expect(item).toHaveReactProps({
          ...mockProps.subNavigationItems[index],
          onClick: expect.any(Function),
        });
      });
    });

    describe('with polarisSummerEditions2023 feature flag enabled', () => {
      it('renders Item with onMouseLeave and onMouseEnter undefined when the item is disabled', () => {
        const mockPropsWithDisabledItem = {
          ...mockProps,
          subNavigationItems: [
            mockProps.subNavigationItems[0],
            mockProps.subNavigationItems[1],
            {
              ...mockProps.subNavigationItems[2],
              disabled: true,
            },
          ],
        };

        const component = mountWithApp(
          <SecondaryNavigation {...mockPropsWithDisabledItem} />,
          {
            features: {polarisSummerEditions2023: true},
          },
        );

        expect(component.findAll(Item)[2]).toHaveReactProps({
          onMouseEnter: undefined,
          onMouseLeave: undefined,
        });
      });

      it('adds addHoverLine prop to all the Item components before the hovered item', () => {
        const component = mountWithApp(<SecondaryNavigation {...mockProps} />, {
          features: {polarisSummerEditions2023: true},
        });

        const hoveredIndex = 2;
        component.findAll(Item)[hoveredIndex].trigger('onMouseEnter');

        component.findAll(Item).forEach((item, index) => {
          const shouldAddHoverLine = index < hoveredIndex;
          expect(item).toHaveReactProps({
            addHoverLine: shouldAddHoverLine,
          });
        });
      });

      it('adds addHoverPointer prop to the hovered item', () => {
        const component = mountWithApp(<SecondaryNavigation {...mockProps} />, {
          features: {polarisSummerEditions2023: true},
        });

        const hoveredIndex = 2;
        component.findAll(Item)[hoveredIndex].trigger('onMouseEnter');

        component.findAll(Item).forEach((item, index) => {
          expect(item).toHaveReactProps({
            addHoverPointer: index === hoveredIndex,
          });
        });
      });

      it('adds addLine prop to all the Item components before the matched item', () => {
        const component = mountWithApp(<SecondaryNavigation {...mockProps} />, {
          features: {polarisSummerEditions2023: true},
        });

        const indexWithMatchedItem = 1;

        component.findAll(Item).forEach((item, index) => {
          const shouldAddLine = index < indexWithMatchedItem;
          expect(item).toHaveReactProps({
            addLine: shouldAddLine,
          });
        });
      });

      it('adds addLine prop to all the Item components before the hovered item when hovered item is before the matched item', () => {
        const component = mountWithApp(<SecondaryNavigation {...mockProps} />, {
          features: {polarisSummerEditions2023: true},
        });

        // Make sure the hovered item is before the matched item
        const hoveredIndex = 0;
        component.findAll(Item)[hoveredIndex].trigger('onMouseEnter');

        const indexWithMatchedItem = 1;

        component.findAll(Item).forEach((item, index) => {
          const shouldAddHoverLineEmphasis = index < hoveredIndex;
          const shouldAddLine =
            !shouldAddHoverLineEmphasis && index < indexWithMatchedItem;

          expect(item).toHaveReactProps({
            addLine: shouldAddLine,
          });
        });
      });
    });
  });
});
