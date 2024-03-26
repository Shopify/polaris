import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {ActionList} from '../../../../ActionList';
import {FiltersBar} from '../FiltersBar';
import type {FiltersBarProps} from '../FiltersBar';
import {FilterPill} from '../../FilterPill';
import {Button} from '../../../../Button';

describe('<FiltersBar />', () => {
  let originalScroll: any;

  beforeEach(() => {
    originalScroll = HTMLElement.prototype.scroll;
  });

  afterEach(() => {
    HTMLElement.prototype.scroll = originalScroll;
  });

  const defaultProps: FiltersBarProps = {
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
    onClearAll: jest.fn(),
  };

  it('renders a list of pinned filters', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<FiltersBar {...defaultProps} />);

    expect(wrapper).toContainReactComponentTimes(FilterPill, 1);
    expect(wrapper).toContainReactComponent(FilterPill, {
      label: defaultProps.filters[1].label,
    });
  });

  it('renders the unpinned filters inside a Popover', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<FiltersBar {...defaultProps} />);

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

  it('does not render hidden filters in the ActionList', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const props: FiltersBarProps = {
      ...defaultProps,
      filters: [
        ...defaultProps.filters,
        {
          key: 'hiddenField',
          label: 'Hidden field',
          filter: null,
          hidden: true,
        },
      ],
    };
    const wrapper = mountWithApp(<FiltersBar {...props} />);

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
    expect(wrapper.find(ActionList)).not.toHaveReactProps({
      items: expect.arrayContaining([
        {
          key: 'hiddenField',
          label: 'Hidden field',
          filter: null,
          content: 'Hidden field',
          onAction: expect.any(Function),
        },
      ]),
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
      <FiltersBar {...defaultProps} filters={filters} />,
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
        key: defaultProps.filters[2].key,
        label: 'Bux',
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <FiltersBar {...defaultProps} appliedFilters={appliedFilters} />,
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
        key: defaultProps.filters[2].key,
        label: 'Bux',
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <FiltersBar {...defaultProps} appliedFilters={appliedFilters} />,
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
      <FiltersBar {...defaultProps} onAddFilterClick={callbackFunction} />,
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

  it('will not remove a pinned filter when it is removed from the applied filters array', () => {
    const appliedFilters = [
      {
        key: defaultProps.filters[2].key,
        label: 'Value is Baz',
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <FiltersBar {...defaultProps} appliedFilters={appliedFilters} />,
    );

    expect(wrapper.findAll(FilterPill)[1]).toHaveReactProps({
      label: 'Value is Baz',
      selected: true,
    });
    wrapper.setProps({appliedFilters: []});

    expect(wrapper.findAll(FilterPill)[1]).toHaveReactProps({
      label: 'Baz',
      selected: false,
    });
  });

  it('correctly invokes the onRemove callback when clicking on an applied filter', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const appliedFilters = [
      {
        key: defaultProps.filters[2].key,
        label: 'Bux',
        onRemove: jest.fn(),
      },
    ];
    const wrapper = mountWithApp(
      <FiltersBar {...defaultProps} appliedFilters={appliedFilters} />,
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
      <FiltersBar {...defaultProps} filters={filters} />,
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
      <FiltersBar {...defaultProps} filters={filters} />,
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
      <FiltersBar
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

  it('will keep a pinned filter from props pinned when clearing', () => {
    const appliedFilters = [
      {
        key: defaultProps.filters[1].key,
        label: 'Bar 2',
        onRemove: jest.fn(),
      },
    ];
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(
      <FiltersBar {...defaultProps} appliedFilters={appliedFilters} />,
    );

    wrapper
      .find(FilterPill, {
        label: 'Bar 2',
      })!
      .trigger('onRemove');

    expect(wrapper).toContainReactComponentTimes(FilterPill, 1);
  });

  it('will keep a pinned filter from props pinned when clearing all', () => {
    const appliedFilters = [
      {
        key: defaultProps.filters[0].key,
        label: 'Bar 2',
        onRemove: jest.fn(),
      },
      {
        key: defaultProps.filters[2].key,
        label: 'Bar 2',
        onRemove: jest.fn(),
      },
    ];
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(
      <FiltersBar {...defaultProps} appliedFilters={appliedFilters} />,
    );

    wrapper
      .find(Button, {
        children: 'Clear all',
      })!
      .trigger('onClick');

    expect(wrapper).toContainReactComponentTimes(FilterPill, 1);
  });
});
