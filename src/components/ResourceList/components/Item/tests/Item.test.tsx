import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  UnstyledLink,
  Avatar,
  Thumbnail,
  ButtonGroup,
  Checkbox,
} from '@shopify/polaris';
import {findByTestID, mountWithPolarisContext, trigger} from 'tests/utilities';
import Item from '../Item';
import {MouseButton} from '../../../types';

jest.mock('react', () => ({
  ...require.requireActual('react'),
  memo: function memo<P>(x: React.StatelessComponent<P>) {
    return x;
  },
}));

describe('<Item />', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest.spyOn(window, 'open');
  });

  afterEach(() => {
    spy.mockRestore();
  });

  const mockDefaultContext = {
    selectMode: false,
    selectable: false,
    selectedItems: [],
    onSelectionChange: noop,
    subscribe: noop,
    unsubscribe: noop,
  };

  const itemId = 'itemId';
  const itemIndex = 1;
  const selectedItemId = 'selectedId';
  const accessibilityLabel = 'link anchor aria-label';

  const mockSelectableContext = {
    ...mockDefaultContext,
    selectedItems: [selectedItemId],
    selectMode: false,
    selectable: true,
    onSelectionChange: jest.fn(),
  };

  const mockSelectModeContext = {
    ...mockDefaultContext,
    selectedItems: [selectedItemId],
    selectMode: true,
    selectable: true,
    onSelectionChange: jest.fn(),
  };

  const mockLoadingContext = {
    ...mockDefaultContext,
    selectedItems: [selectedItemId],
    selectMode: true,
    selectable: true,
    loading: true,
    onSelectionChange: jest.fn(),
  };

  const url = 'http://test-link.com';
  const ariaLabel = 'View Item';

  describe('accessibilityLabel', () => {
    it('is used on the UnstyledLink for the aria-label attribute', () => {
      const item = mountWithPolarisContext(
        <Item
          index={itemIndex}
          accessibilityLabel={accessibilityLabel}
          id={itemId}
          url="https://shopify.com"
        />,
        {
          context: mockDefaultContext,
        },
      );

      expect(item.find(UnstyledLink).prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });
  });

  describe('url', () => {
    it('does not renders a UnstyledLink by default', () => {
      const element = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id="itemId"
          onClick={noop}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).exists()).toBe(false);
    });

    it('renders a UnstyledLink', () => {
      const element = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id="itemId"
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).exists()).toBe(true);
    });

    it('renders a UnstyledLink with url', () => {
      const element = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id="itemId"
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).prop('url')).toBe(url);
    });

    it(`renders a UnstyledLink with an aria-label of ${ariaLabel}`, () => {
      const element = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id="itemId"
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).prop('aria-label')).toBe(ariaLabel);
    });
  });

  describe('id', () => {
    it('is used on the content node and for the description of a link', () => {
      const item = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url="https://shopify.com"
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      expect(findByTestID(item, 'Item-Content').prop('id')).toBe(itemId);
      expect(item.find(UnstyledLink).prop('aria-describedby')).toBe(itemId);
    });
  });

  describe('onClick()', () => {
    it('calls onClick when clicking on the item when onClick exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={onClick}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(itemId);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={onClick}
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(itemId);
    });

    it('calls window.open on metaKey + click', () => {
      const spy = jest.spyOn(window, 'open');
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );
      const item = findByTestID(wrapper, 'Item-Wrapper');
      trigger(item, 'onClick', {nativeEvent: {metaKey: true}});
      expect(spy).toBeCalledWith(url, '_blank');
    });

    it('calls window.open on ctrlKey + click', () => {
      const spy = jest.spyOn(window, 'open');
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );
      const item = findByTestID(wrapper, 'Item-Wrapper');
      trigger(item, 'onClick', {nativeEvent: {ctrlKey: true}});
      expect(spy).toBeCalledWith(url, '_blank');
    });
  });

  describe('onFocus()', () => {
    it('is triggered when Item is focused', () => {
      const spy = jest.fn();
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={noop}
          onFocus={spy}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('focus');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onMouseUp', () => {
    it('opens a new window when clicked with the auxiliary button', () => {
      const url = '/admin/order/60';
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id="itemId"
          onClick={noop}
          url={url}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('mouseup', {
        button: MouseButton.Auxiliary,
      });
      expect(spy).toBeCalledWith(url, '_blank');
    });
  });

  describe('onBlur()', () => {
    it('is triggered when focus leaves the Item', () => {
      const spy = jest.fn();
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={noop}
          onBlur={spy}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('focus');
      findByTestID(wrapper, 'Item-Wrapper').simulate('blur');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Selectable', () => {
    it("it should not call onSelectionChange when clicking the 'LargerSelectionArea'", () => {
      const wrapper = mountWithPolarisContext(
        <Item index={itemIndex} id={itemId} onClick={() => {}} />,
        {
          context: mockSelectableContext,
        },
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');
      expect(mockSelectableContext.onSelectionChange).not.toBeCalled();
    });

    it("it should call 'onSelectionChange' with the id of the item when clicking the 'LargerSelectionArea'", () => {
      const wrapper = mountWithPolarisContext(
        <Item index={itemIndex} id={itemId} url={url} />,
        {
          context: mockSelectModeContext,
        },
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');

      expect(mockSelectModeContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
        itemIndex,
        undefined,
      );
    });
  });

  describe('SelectMode', () => {
    it("it should not call 'onClick' when clicking the item", () => {
      const onClick = jest.fn();
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={onClick}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockSelectModeContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).not.toBeCalledWith(itemId);
    });

    it('it should not call window.open when clicking the item with metaKey', () => {
      const spy = jest.spyOn(window, 'open');
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={jest.fn()}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockSelectModeContext},
      );
      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {metaKey: true},
      });
      expect(spy).not.toBeCalled();
    });

    it('it should not call window.open when clicking the item with ctrlKey', () => {
      const spy = jest.spyOn(window, 'open');
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          onClick={jest.fn()}
          accessibilityLabel={ariaLabel}
        />,
        {context: mockSelectModeContext},
      );
      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).not.toBeCalled();
    });

    it("it should call 'onSelectionChange' with the id of the item even if url or onClick is present", () => {
      const onClick = jest.fn();
      const onSelectionChange = jest.fn();
      const context = {...mockSelectModeContext, onSelectionChange};
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          onClick={onClick}
          accessibilityLabel={ariaLabel}
        />,
        {context},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
        itemIndex,
        undefined,
      );
    });

    it("should render a checked Checkbox if the item is in the 'selectedItems' context", () => {
      const wrapper = mountWithPolarisContext(
        <Item index={itemIndex} id={selectedItemId} url={url} />,
        {context: mockSelectModeContext},
      );
      expect(wrapper.find(Checkbox).props().checked).toBe(true);
    });

    it("renders a disabled checked Checkbox if 'loading' context is true", () => {
      const wrapper = mountWithPolarisContext(
        <Item index={itemIndex} id={selectedItemId} url={url} />,
        {context: mockLoadingContext},
      );
      expect(wrapper.find(Checkbox).prop('disabled')).toBe(true);
    });
  });

  describe('media', () => {
    it('should not include media if not is provided', () => {
      const wrapper = mountWithPolarisContext(
        <Item index={itemIndex} id={itemId} url={url} />,
        {
          context: mockDefaultContext,
        },
      );
      expect(findByTestID(wrapper, 'Media').exists()).toBe(false);
    });

    it("should include and 'Avatar' if one is provided", () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          media={<Avatar customer />}
        />,
        {
          context: mockDefaultContext,
        },
      );
      expect(
        findByTestID(wrapper, 'Media')
          .find(Avatar)
          .exists(),
      ).toBe(true);
    });

    it("should include and 'Thumbnail' if one is provided", () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          media={<Thumbnail source="source" alt="alt" />}
        />,
        {context: mockDefaultContext},
      );
      expect(
        findByTestID(wrapper, 'Media')
          .find(Thumbnail)
          .exists(),
      ).toBe(true);
    });
  });

  describe('shortcutActions', () => {
    it('shouldn’t render shortcut actions if none are provided', () => {
      const wrapper = mountWithPolarisContext(
        <Item index={itemIndex} id={itemId} url={url} />,
        {
          context: mockDefaultContext,
        },
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(false);
    });

    it('should render shortcut actions when some are provided', () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          shortcutActions={[{content: 'action'}]}
        />,
        {context: mockDefaultContext},
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(true);
    });

    it("should render persistent shortcut actions if 'persistActions' is true", () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          shortcutActions={[{content: 'action'}]}
          persistActions
        />,
        {context: mockDefaultContext},
      );
      expect(wrapper.find(ButtonGroup).exists()).toBe(true);
    });

    it('does not render while loading', () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          shortcutActions={[{content: 'action'}]}
          persistActions
        />,
        {context: mockLoadingContext},
      );
      expect(wrapper.find(ButtonGroup)).toHaveLength(0);
    });
  });

  describe('accessibleMarkup', () => {
    it('renders with a tab index of -1 when loading is true', () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          shortcutActions={[{content: 'action'}]}
          persistActions
        />,
        {context: mockLoadingContext},
      );
      expect(wrapper.find(UnstyledLink).prop('tabIndex')).toBe(-1);
    });

    it('renders with a tab index of 0 when loading is false', () => {
      const wrapper = mountWithPolarisContext(
        <Item
          index={itemIndex}
          id={itemId}
          url={url}
          shortcutActions={[{content: 'action'}]}
          persistActions
        />,
        {context: mockDefaultContext},
      );
      expect(wrapper.find(UnstyledLink).prop('tabIndex')).toBe(0);
    });
  });
});
