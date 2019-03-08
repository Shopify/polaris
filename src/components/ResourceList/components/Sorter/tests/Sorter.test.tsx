import * as React from 'react';
import {trigger, mountWithPolarisContext} from 'tests/utilities';
import {Select} from '@shopify/polaris';
import Sorter from '..';

const sortOptions = [
  'Product title (A-Z)',
  {
    value: 'PRODUCT_TITLE_DESC',
    label: 'Product title (Z-A)',
  },
  {
    value: 'EXTRA',
    label: 'Disabled Option',
    disabled: true,
  },
];

const defaultContext = {
  sortOptions,
};

describe('<Sorter />', () => {
  describe('Sorting', () => {
    it("it should not render a sort select if 'sortOptions' aren’t in context", () => {
      const sorter = mountWithPolarisContext(<Sorter />);
      expect(sorter.find(Select).exists()).toBe(false);
    });

    it("it should render a sort select if 'sortOptions' are in context", () => {
      const resourceList = mountWithPolarisContext(<Sorter />, {
        context: defaultContext,
      });
      expect(resourceList.find(Select).exists()).toBe(true);
    });

    describe('sortOptions', () => {
      it("should pass a 'sortOptions' to the Select options", () => {
        const resourceList = mountWithPolarisContext(<Sorter />, {
          context: defaultContext,
        });
        expect(resourceList.find(Select).props()).toHaveProperty(
          'options',
          sortOptions,
        );
      });
    });

    describe('sortValue', () => {
      it("should pass a 'sortValue' to the Select value", () => {
        const sortValue = 'sortValue';
        const onSortChange = jest.fn();
        const resourceList = mountWithPolarisContext(<Sorter />, {
          context: {...defaultContext, sortValue, onSortChange},
        });
        expect(resourceList.find(Select).props()).toHaveProperty(
          'value',
          sortValue,
        );
      });
    });

    describe('onSortChange', () => {
      it('should call onSortChange when the Sort Select changes', () => {
        const onSortChange = jest.fn();
        const resourceList = mountWithPolarisContext(<Sorter />, {
          context: {...defaultContext, sortValue: '', onSortChange},
        });
        trigger(resourceList.find(Select), 'onChange', 'PRODUCT_TITLE_DESC');
        expect(onSortChange).toHaveBeenCalledWith('PRODUCT_TITLE_DESC');
      });
    });
  });
});
