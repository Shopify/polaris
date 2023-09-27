import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {Filters} from '../Filters';
import type {FiltersProps} from '../Filters';
import {FiltersBar, SearchField} from '../components';

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

  it('renders the SearchField by default', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} />);
    expect(wrapper).toContainReactComponent(SearchField);
  });

  it('does not render the SearchField if hideQueryField is true', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} hideQueryField />);
    expect(wrapper).not.toContainReactComponent(SearchField);
  });

  it('renders the FiltersBar by default', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} />);
    expect(wrapper).toContainReactComponent(FiltersBar);
  });

  it('does not render the FiltersBar if hideFilters is true', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} hideFilters />);
    expect(wrapper).not.toContainReactComponent(FiltersBar);
  });

  it('does not render the FiltersBar if hideFilters is falsy but there are no filters', () => {
    const scrollSpy = jest.fn();
    HTMLElement.prototype.scroll = scrollSpy;
    const wrapper = mountWithApp(<Filters {...defaultProps} filters={[]} />);
    expect(wrapper).not.toContainReactComponent(FiltersBar);
  });
});
