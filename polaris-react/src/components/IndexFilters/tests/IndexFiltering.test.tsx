import React from 'react';
import type {ComponentProps} from 'react';
import {mountWithApp} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';

import {Tabs} from '../../Tabs';
import {Filters} from '../../Filters';
import {IndexFilters, IndexFiltersUpdateAction, IndexFiltersMode} from '..';
import type {IndexFiltersProps} from '../IndexFilters';
import {SearchFilterButton, SortButton, UpdateButtons} from '../components';
import styles from '../IndexFilters.scss';

describe('IndexFilters', () => {
  const defaultProps: IndexFiltersProps = {
    onQueryChange: jest.fn(),
    onQueryClear: jest.fn(),
    queryValue: 'foo',
    onSortChange: jest.fn(),
    queryPlaceholder: 'Bar',
    sortOptions: [
      {
        label: 'Order number',
        value: 'order-number asc',
        directionLabel: 'Ascending',
      },
      {
        label: 'Order number',
        value: 'order-number desc',
        directionLabel: 'Descending',
      },
      {
        label: 'Customer name',
        value: 'customer-name asc',
        directionLabel: 'A-Z',
      },
      {
        label: 'Customer name',
        value: 'customer-name desc',
        directionLabel: 'Z-A',
      },
      {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
      {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
      {
        label: 'Payment status',
        value: 'payment-status asc',
        directionLabel: 'Ascending',
      },
      {
        label: 'Payment status',
        value: 'payment-status desc',
        directionLabel: 'Descending',
      },
      {
        label: 'Fulfillment status',
        value: 'fulfillment-status asc',
        directionLabel: 'A-Z',
      },
      {
        label: 'Fulfillment status',
        value: 'fulfillment-status desc',
        directionLabel: 'Z-A',
      },
      {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
      {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
    ],
    sortSelected: ['order-number asc'],
    onUpdateIndexFilters: jest.fn(),
    onCancelIndexFilters: jest.fn(),
    onSaveAsIndexFilters: jest.fn(),
    tabs: [
      {
        id: 'foo',
        content: 'Foo',
      },
    ],
    selected: 0,
    onSelect: jest.fn(),
    updateButtonState: IndexFiltersUpdateAction.Update,
    updateButtonDisabled: false,
    updateButtonLoading: false,
    filters: [],
    appliedFilters: [],
    onClearAll: jest.fn(),
    viewNames: [],
    mode: IndexFiltersMode.Default,
    setMode: jest.fn(),
  };

  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    jest.resetAllMocks();
    matchMedia.restore();
  });

  it('reacts correctly to pressing the search button and invokes setMode with the filtering argument', () => {
    const setMode = jest.fn();
    const wrapper = mountWithApp(
      <IndexFilters {...defaultProps} setMode={setMode} />,
    );
    wrapper.act(() => {
      wrapper.find(SearchFilterButton)!.trigger('onClick');
    });

    expect(setMode).toHaveBeenCalledWith(IndexFiltersMode.Filtering);
  });

  it('renders non-disabled tabs if the current mode is Default', () => {
    const wrapper = mountWithApp(<IndexFilters {...defaultProps} />);

    expect(wrapper).toContainReactComponent(Tabs, {
      disabled: false,
    });
  });

  it('overrides and disables tabs even if the current mode is Default', () => {
    const wrapper = mountWithApp(
      <IndexFilters {...defaultProps} disableTabs />,
    );

    expect(wrapper).toContainReactComponent(Tabs, {
      disabled: true,
    });
  });

  it('onQueryChange gets called correctly', () => {
    const wrapper = mountWithApp(
      <IndexFilters {...defaultProps} mode={IndexFiltersMode.Filtering} />,
    );

    wrapper.act(() => {
      wrapper.find(Filters)!.trigger('onQueryChange', 'bar');
    });

    expect(defaultProps.onQueryChange).toHaveBeenCalledWith('bar');
  });

  it('onSortChange gets called correctly', () => {
    const wrapper = mountWithApp(<IndexFilters {...defaultProps} />);
    wrapper.act(() => {
      wrapper.find(SortButton)!.trigger('onChange', ['customer-name asc']);
    });

    expect(defaultProps.onSortChange).toHaveBeenCalledWith([
      'customer-name asc',
    ]);
  });

  describe('filters', () => {
    it('passes the filters down correctly', () => {
      const filters: ComponentProps<typeof IndexFilters>['filters'] = [
        {
          key: 'foo',
          label: 'Foo',
          filter: <div>Filter</div>,
          pinned: false,
          onAction: jest.fn(),
        },
      ];

      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          filters={filters}
          mode={IndexFiltersMode.Filtering}
        />,
      );

      expect(wrapper).toContainReactComponent(Filters, {
        filters,
      });
    });
  });

  describe('in EditingColumns mode', () => {
    it('renders the UpdateButtons component', () => {
      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          mode={IndexFiltersMode.EditingColumns}
        />,
      );

      expect(wrapper).toContainReactComponent(UpdateButtons);
    });

    it('does not render the Filters component', () => {
      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          mode={IndexFiltersMode.EditingColumns}
        />,
      );

      expect(wrapper).not.toContainReactComponent(Filters);
    });

    it('does not render the SortButton or SearchFilterButton component', () => {
      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          mode={IndexFiltersMode.EditingColumns}
        />,
      );

      expect(wrapper).not.toContainReactComponent(SortButton);
      expect(wrapper).not.toContainReactComponent(SearchFilterButton);
    });
  });

  describe('pressing escape', () => {
    it('does not call the onCancelIndexFilters mode when in Default mode', () => {
      const onCancelIndexFilters = jest.fn();
      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          onCancelIndexFilters={onCancelIndexFilters}
          mode={IndexFiltersMode.Default}
        />,
      );

      wrapper.act(() => {
        wrapper
          .find('div', {
            className: styles.IndexFiltersWrapper,
          })!
          .trigger('onKeyDown', {key: 'Escape'});
      });

      expect(onCancelIndexFilters).not.toHaveBeenCalled();
    });

    it('does call the onCancelIndexFilters mode when in Filtering mode', () => {
      const onCancelIndexFilters = jest.fn();
      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          onCancelIndexFilters={onCancelIndexFilters}
          mode={IndexFiltersMode.Filtering}
        />,
      );

      wrapper.act(() => {
        wrapper
          .find('div', {
            className: styles.IndexFiltersWrapper,
          })!
          .trigger('onKeyDown', {key: 'Escape'});
      });

      expect(onCancelIndexFilters).toHaveBeenCalled();
    });

    it('does call the onCancelIndexFilters mode when in EditingColumns mode', () => {
      const onCancelIndexFilters = jest.fn();
      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          onCancelIndexFilters={onCancelIndexFilters}
          mode={IndexFiltersMode.EditingColumns}
        />,
      );

      wrapper.act(() => {
        wrapper
          .find('div', {
            className: styles.IndexFiltersWrapper,
          })!
          .trigger('onKeyDown', {key: 'Escape'});
      });

      expect(onCancelIndexFilters).toHaveBeenCalled();
    });
  });

  describe('disabled', () => {
    it('renders Filters with the disabled props', () => {
      const filters: ComponentProps<typeof IndexFilters>['filters'] = [
        {
          key: 'foo',
          label: 'Foo',
          filter: <div>Filter</div>,
          pinned: false,
          onAction: jest.fn(),
        },
      ];

      const disableFiltering = {
        isDisabled: true,
        tooltipMessage: 'Disabled tooltip message',
      };

      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          filters={filters}
          mode={IndexFiltersMode.Filtering}
          disableFiltering={disableFiltering}
        />,
      );

      expect(wrapper).toContainReactComponent(Filters, {
        filters,
        disableFiltering,
      });
    });

    it('renders UpdateButtons with the disabled props when filtering', () => {
      const disableFiltering = {
        isDisabled: true,
        tooltipMessage: 'Disabled tooltip message',
      };

      const wrapper = mountWithApp(
        <IndexFilters
          {...defaultProps}
          mode={IndexFiltersMode.Filtering}
          updateButtonDisabled
          disableFiltering={disableFiltering}
        />,
      );

      expect(wrapper).toContainReactComponent(UpdateButtons, {
        updateButtonDisabled: true,
        disabled: disableFiltering,
      });
    });
  });
});
