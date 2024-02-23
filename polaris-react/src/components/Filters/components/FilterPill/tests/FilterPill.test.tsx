import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {ChevronDownIcon} from '@shopify/polaris-icons';

import {FilterPill} from '../FilterPill';
import type {FilterPillProps} from '../FilterPill';
import {Popover} from '../../../../Popover';
import {Text} from '../../../../Text';
import {Icon} from '../../../../Icon';
import {Button} from '../../../../Button';
import {UnstyledButton} from '../../../../UnstyledButton';

jest.mock('../../../../../utilities/breakpoints', () => ({
  ...(jest.requireActual('../../../../../utilities/breakpoints') as any),
  useBreakpoints: jest.fn(),
}));

describe('<Filters />', () => {
  let originalScroll: any;

  beforeEach(() => {
    originalScroll = HTMLElement.prototype.scroll;
    mockUseBreakpoints(false);
  });

  afterEach(() => {
    HTMLElement.prototype.scroll = originalScroll;
    jest.clearAllMocks();
  });

  const defaultProps: FilterPillProps = {
    filterKey: 'foo',
    key: 'foo',
    label: 'Shipping country',
    filter: <div />,
    disabled: false,
    hideClearButton: false,
    selected: false,
    initialActive: false,
    closeOnChildOverlayClick: false,
    onRemove: jest.fn(),
    onClick: jest.fn(),
  };

  describe('activator', () => {
    it('renders the label inside the Popover activator', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} />);
      expect(wrapper).toContainReactText(defaultProps.label);
    });

    it('renders with bodyLg variant when on a small screen', () => {
      mockUseBreakpoints(true);
      const wrapper = mountWithApp(<FilterPill {...defaultProps} />, {});
      expect(wrapper).toContainReactComponent(Text, {
        variant: 'bodyLg',
        children: defaultProps.label,
      });
    });

    it('renders with bodySm variant when on a larger screen', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} />);
      expect(wrapper).toContainReactComponent(Text, {
        variant: 'bodySm',
        children: defaultProps.label,
      });
    });

    it('will return null if disabled', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} disabled />);
      expect(wrapper!.domNode).toBeNull();
    });

    it('will invoked the onClick prop when clicked, if present', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} onClick={spy} />,
      );
      wrapper.find(UnstyledButton)!.trigger('onClick');
      expect(spy).toHaveBeenCalledWith(defaultProps.filterKey);
    });

    it('when not selected, renders a chevron icon', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} />, {});
      expect(wrapper.findAll(UnstyledButton)[0]).toContainReactComponent(Icon, {
        source: ChevronDownIcon,
      });
    });

    it('when selected, does not render a chevron icon', () => {
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} selected />,
        {},
      );
      expect(wrapper.findAll(UnstyledButton)[0]).not.toContainReactComponent(
        Icon,
        {
          source: ChevronDownIcon,
        },
      );
    });

    it('when not selected, does not a clear button', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} />);
      expect(wrapper).not.toContainReactComponent(UnstyledButton, {
        'aria-label': 'Clear',
      });
    });

    it('when selected, renders a clear button', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} selected />);
      expect(wrapper).toContainReactComponent(UnstyledButton, {
        'aria-label': 'Clear',
      });
    });

    it('when selected, invoked the onRemove callback when clicking the clear button', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} selected onRemove={spy} />,
      );
      wrapper.find(UnstyledButton, {'aria-label': 'Clear'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledWith(defaultProps.filterKey);
    });
  });

  describe('popover', () => {
    it('renders the filter inside the Popover', () => {
      const filter = <div data-test-id="filter" />;
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} filter={filter} />,
      );
      const activator = wrapper.find(UnstyledButton);
      activator?.trigger('onClick');
      expect(wrapper.find(Popover)).toContainReactComponent('div', {
        'data-test-id': 'filter',
      } as any);
    });

    it('renders the clear button inside the Popover', () => {
      const wrapper = mountWithApp(<FilterPill {...defaultProps} />);
      const activator = wrapper.find(UnstyledButton);
      activator?.trigger('onClick');
      expect(wrapper.find(Popover)).toContainReactComponent(Button, {
        children: 'Clear',
      });
    });

    it('does not render the clear button inside the Popover if hideClearButton is true', () => {
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} hideClearButton />,
      );
      const activator = wrapper.find(UnstyledButton);
      activator?.trigger('onClick');
      expect(wrapper.find(Popover)).not.toContainReactComponent(Button, {
        children: 'Clear',
      });
    });

    it('invokes the onRemove callback when clicking the clear button inside the Popover', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} onRemove={spy} />,
      );
      const activator = wrapper.find(UnstyledButton);
      activator?.trigger('onClick');
      wrapper.find(Button, {children: 'Clear'})!.trigger('onClick');
      expect(spy).toHaveBeenCalledWith(defaultProps.filterKey);
    });

    it('invokes the onRemove callback when closing the Popover when not selected', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} onRemove={spy} />,
      );
      const activator = wrapper.find(UnstyledButton);
      activator?.trigger('onClick');
      wrapper.find(Popover)?.trigger('onClose');
      expect(spy).toHaveBeenCalledWith(defaultProps.filterKey);
    });

    it('does not invoke the onRemove callback when closing the Popover when selected', () => {
      const spy = jest.fn();
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} onRemove={spy} selected />,
      );
      const activator = wrapper.find(UnstyledButton);
      activator?.trigger('onClick');
      wrapper.find(Popover)?.trigger('onClose');
      expect(spy).not.toHaveBeenCalledWith(defaultProps.filterKey);
    });

    it('renders the popover initially open if initialActive is true', () => {
      const wrapper = mountWithApp(
        <FilterPill {...defaultProps} initialActive />,
      );
      expect(wrapper.find(Popover)).toContainReactComponent('div');
    });
  });

  describe('scrolling', () => {
    it('invokes the scroll method on the activator when the popover is opened', () => {
      const scrollSpy = jest.fn();
      HTMLElement.prototype.scroll = scrollSpy;
      const wrapper = mountWithApp(
        <div id="scroller">
          <div>
            <FilterPill {...defaultProps} />
          </div>
        </div>,
      );

      wrapper.find(UnstyledButton)!.trigger('onClick');

      expect(scrollSpy).toHaveBeenCalledWith({
        left: 0,
      });
    });
  });
});

function mockUseBreakpoints(mdDown: boolean) {
  const useBreakpoints: jest.Mock = jest.requireMock(
    '../../../../../utilities/breakpoints',
  ).useBreakpoints;

  useBreakpoints.mockReturnValue({
    mdDown,
  });
}
