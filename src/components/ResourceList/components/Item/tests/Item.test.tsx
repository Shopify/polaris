import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  findByTestID,
  shallowWithProvider,
  mountWithProvider,
} from '../../../../../../tests/utilities';
import {
  UnstyledLink,
  Avatar,
  Thumbnail,
  ButtonGroup,
  Checkbox,
} from '../../../../';
import Item from '../Item';

describe('<Item />', () => {
  const mockDefaultContext = {
    selectMode: false,
    selectable: false,
    selectedItems: [],
    persistActions: false,
    onSelectionChange: noop,
    subscribe: noop,
    unsubscribe: noop,
  };

  const itemId = 'itemId';
  const selectedItemId = 'selectedId';

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

  const mockPersistActionsContext = {
    ...mockDefaultContext,
    persistActions: true,
  };

  const url = 'http://test-link.com';

  describe('url', () => {
    it('does not renders a UnstyledLink by default', () => {
      const element = shallowWithProvider(<Item id="itemId" onClick={noop} />, {
        context: mockDefaultContext,
      });

      expect(element.find(UnstyledLink).exists()).toBe(false);
    });

    it('renders a UnstyledLink', () => {
      const element = shallowWithProvider(<Item id="itemId" url={url} />, {
        context: mockDefaultContext,
      });

      expect(element.find(UnstyledLink).exists()).toBe(true);
    });

    it('renders a UnstyledLink with url', () => {
      const element = shallowWithProvider(<Item id="itemId" url={url} />, {
        context: mockDefaultContext,
      });

      expect(element.find(UnstyledLink).prop('url')).toBe(url);
    });
  });

  describe('id', () => {
    it('is used on the content node and for the description of a link', () => {
      const item = mountWithProvider(
        <Item id={itemId} url="https://shopify.com" />,
        {context: mockDefaultContext},
      );

      expect(findByTestID(item, 'Item-Content').prop('id')).toBe(itemId);
      expect(item.find(UnstyledLink).prop('aria-describedby')).toBe(itemId);
    });
  });

  describe('onClick()', () => {
    it('calls onClick when clicking on the item when onClick exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(
        <Item id={itemId} onClick={onClick} />,
        {
          context: mockDefaultContext,
        },
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(itemId);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(
        <Item id={itemId} onClick={onClick} url={url} />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(itemId);
    });
  });

  describe('Selectable', () => {
    it("it should not call the Item 'onClick' when clicking the 'LargerSelectionArea'", () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(
        <Item id={itemId} onClick={onClick} />,
        {
          context: mockSelectableContext,
        },
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');
      expect(onClick).not.toBeCalled();
    });

    it("it should call 'onSelectionChange' with the id of the item when clicking the 'LargerSelectionArea'", () => {
      const wrapper = mountWithProvider(<Item id={itemId} url={url} />, {
        context: mockSelectableContext,
      });

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');
      expect(mockSelectableContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
      );
    });
  });

  describe('SelectMode', () => {
    it("it should not call 'onClick' when clicking the item", () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(
        <Item id={itemId} onClick={onClick} />,
        {context: mockSelectModeContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).not.toBeCalledWith(itemId);
    });

    it("it should call 'onSelectionChange' with the id of the item even if url or onClick is present", () => {
      const onClick = jest.fn();
      const wrapper = mountWithProvider(
        <Item id={itemId} url={url} onClick={onClick} />,
        {context: mockSelectableContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(mockSelectableContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
      );
    });

    it("should render a checked Checkbox if the item is in the 'selectedItems' context", () => {
      const wrapper = mountWithProvider(
        <Item id={selectedItemId} url={url} />,
        {context: mockSelectModeContext},
      );
      expect(wrapper.find(Checkbox).props().checked).toBe(true);
    });
  });

  describe('media', () => {
    it('should not include media if not is provided', () => {
      const wrapper = mountWithProvider(<Item id={itemId} url={url} />, {
        context: mockDefaultContext,
      });
      expect(findByTestID(wrapper, 'Media').exists()).toBe(false);
    });

    it("should include and 'Avatar' if one is provided", () => {
      const wrapper = mountWithProvider(
        <Item id={itemId} url={url} media={<Avatar customer />} />,
        {context: mockDefaultContext},
      );
      expect(
        findByTestID(wrapper, 'Media')
          .find(Avatar)
          .exists(),
      ).toBe(true);
    });

    it("should include and 'Thumbnail' if one is provided", () => {
      const wrapper = mountWithProvider(
        <Item
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
    it("shouldn't render shortcut actions if none are provided", () => {
      const wrapper = mountWithProvider(<Item id={itemId} url={url} />, {
        context: mockDefaultContext,
      });
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(false);
    });

    it('should render shortcut actions when some are provided', () => {
      const wrapper = mountWithProvider(
        <Item id={itemId} url={url} shortcutActions={[{content: 'action'}]} />,
        {context: mockDefaultContext},
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(true);
    });

    it("should render persistent shortcut actions if 'persistActions' is true in context", () => {
      const wrapper = mountWithProvider(
        <Item id={itemId} url={url} shortcutActions={[{content: 'action'}]} />,
        {context: mockPersistActionsContext},
      );
      expect(wrapper.find(ButtonGroup).exists()).toBe(true);
    });
  });
});
