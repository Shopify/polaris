import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../../ActionList';
import {Filters} from '../Filters';
import type {FiltersProps} from '../Filters';
import {FilterPill} from '../components';

describe('<Filters />', () => {
  let originalScroll: any;

  beforeEach(() => {
    originalScroll = HTMLElement.prototype.scroll;
    matchMedia.mock();
  });

  afterEach(() => {
    HTMLElement.prototype.scroll = originalScroll;
    matchMedia.restore();
  });

  const defaultProps: FiltersProps = {
    filters: [
      {
        key: 'foo',
        label: 'Foo',
        pinned: false,
        filter: <div>Filter</div>,
      },
      {
        key: 'bar',
        label: 'Bar',
        pinned: true,
        filter: <div>Filter</div>,
      },
      {
        key: 'baz',
        label: 'Baz',
        pinned: false,
        filter: <div>Filter</div>,
      },
    ],
    appliedFilters: [],
    onQueryChange: jest.fn(),
    onQueryClear: jest.fn(),
    onClearAll: jest.fn(),
  };

  it('renders a list of pinned filters', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} />);

    expect(wrapper).toContainReactComponentTimes(FilterPill, 1);
    expect(wrapper).toContainReactComponent(FilterPill, {
      label: defaultProps.filters[1].label,
    });
  });

  it('renders the unpinned filters inside a Popover', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} />);

    wrapper.act(() => {
      wrapper
        .find('button', {
          'aria-label': 'Add filter',
        })!
        .trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(ActionList, {
      items: [
        expect.objectContaining({content: defaultProps.filters[0].label}),
        expect.objectContaining({content: defaultProps.filters[2].label}),
      ],
    });
  });

  it('renders the unpinned disabled filters inside a Popover', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const filters = [
      ...defaultProps.filters,
      {
        key: 'disabled',
        label: 'Disabled',
        pinned: false,
        disabled: true,
        filter: <div>Filter</div>,
      },
    ];

    const wrapper = mountWithApp(
      <Filters {...defaultProps} filters={filters} />,
    );

    wrapper.act(() => {
      wrapper
        .find('button', {
          'aria-label': 'Add filter',
        })!
        .trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(ActionList, {
      items: [
        expect.objectContaining({
          content: filters[0].label,
        }),
        expect.objectContaining({
          content: filters[2].label,
        }),
        expect.objectContaining({
          content: filters[3].label,
          disabled: true,
        }),
      ],
    });
  });

  it('renders an applied filter', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const appliedFilters = [
      {
        ...defaultProps.filters[2],
        label: 'Bux',
        value: ['Bux'],
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <Filters {...defaultProps} appliedFilters={appliedFilters} />,
    );

    expect(wrapper).toContainReactComponentTimes(FilterPill, 2);
    expect(wrapper.findAll(FilterPill)[1]).toHaveReactProps({
      label: 'Bux',
      selected: true,
    });
  });

  it('will not open the popover for an applied filter by default', () => {
    const appliedFilters = [
      {
        ...defaultProps.filters[2],
        label: 'Bux',
        value: ['Bux'],
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <Filters {...defaultProps} appliedFilters={appliedFilters} />,
    );

    expect(wrapper).toContainReactComponentTimes(FilterPill, 2);
    expect(wrapper.findAll(FilterPill)[1]).toHaveReactProps({
      label: 'Bux',
      initialActive: false,
    });
  });

  it('triggers the onAddFilterClick callback when the add filter button is clicked', () => {
    const callbackFunction = jest.fn();
    const wrapper = mountWithApp(
      <Filters {...defaultProps} onAddFilterClick={callbackFunction} />,
    );
    wrapper.act(() => {
      wrapper
        .find('button', {
          'aria-label': 'Add filter',
        })!
        .trigger('onClick');
    });

    expect(callbackFunction).toHaveBeenCalled();
    expect(wrapper).toContainReactComponent(ActionList);
  });

  it('correctly invokes the onRemove callback when clicking on an applied filter', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const appliedFilters = [
      {
        ...defaultProps.filters[2],
        label: 'Bux',
        value: ['Bux'],
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <Filters {...defaultProps} appliedFilters={appliedFilters} />,
    );

    wrapper.act(() => {
      wrapper.findAll(FilterPill)[1].findAll('button')[1].trigger('onClick');
    });

    expect(appliedFilters[0].onRemove).toHaveBeenCalled();
  });

  it('will not render the add badge if all filters are pinned by default', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const filters = defaultProps.filters.map((filter) => ({
      ...filter,
      pinned: true,
    }));

    const wrapper = mountWithApp(
      <Filters {...defaultProps} filters={filters} />,
    );

    expect(wrapper).not.toContainReactComponent('div', {
      className: 'AddFilterActivator',
    });
  });

  it('will not render a disabled filter if pinned', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const filters = [
      ...defaultProps.filters,
      {
        key: 'disabled',
        label: 'Disabled',
        pinned: true,
        disabled: true,
        filter: <div>Filter</div>,
      },
    ];

    const wrapper = mountWithApp(
      <Filters {...defaultProps} filters={filters} />,
    );

    expect(wrapper).toContainReactComponentTimes(FilterPill, 2);

    wrapper.act(() => {
      wrapper
        .find('button', {
          'aria-label': 'Add filter',
        })!
        .trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(ActionList, {
      items: [
        expect.objectContaining({content: defaultProps.filters[0].label}),
        expect.objectContaining({content: defaultProps.filters[2].label}),
      ],
    });

    expect(wrapper.findAll(FilterPill)[1].domNode).toBeNull();
  });

  it('renders filters with sections', () => {
    const filtersWithSections = [
      {
        key: 'sectionfilter1',
        label: 'SF1',
        pinned: false,
        filter: <div>SF1</div>,
        section: 'Section One',
      },
      {
        key: 'sectionfilter2',
        label: 'SF2',
        pinned: false,
        filter: <div>SF1</div>,
        section: 'Section Two',
      },
      {
        key: 'sectionfilter3',
        label: 'SF3',
        pinned: false,
        filter: <div>SF3</div>,
        section: 'Section One',
      },
    ];

    const wrapper = mountWithApp(
      <Filters
        {...defaultProps}
        filters={[...defaultProps.filters, ...filtersWithSections]}
      />,
    );

    wrapper.act(() => {
      wrapper
        .find('button', {
          'aria-label': 'Add filter',
        })!
        .trigger('onClick');
    });

    expect(wrapper).toContainReactComponent(ActionList, {
      sections: [
        expect.objectContaining({
          title: 'Section One',
          items: [
            expect.objectContaining({
              content: filtersWithSections[0].label,
            }),
            expect.objectContaining({
              content: filtersWithSections[2].label,
            }),
          ],
        }),
        expect.objectContaining({
          title: 'Section Two',
          items: [
            expect.objectContaining({
              content: filtersWithSections[1].label,
            }),
          ],
        }),
      ],
    });
  });
});
