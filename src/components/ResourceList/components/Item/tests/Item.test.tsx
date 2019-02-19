import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {findByTestID, mountWithAppProvider, trigger} from 'test-utilities';
import {
  Avatar,
  ButtonGroup,
  Checkbox,
  Thumbnail,
  UnstyledLink,
} from 'components';
import {Provider} from '../../Context';
import Item from '../Item';

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
    resourceName: {
      singular: 'item',
      plural: 'items,',
    },
  };

  const itemId = 'itemId';
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
    it('is used on the <UnstyledLink /> for the aria-label attribute', () => {
      const item = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
          />
        </Provider>,
      );

      expect(item.find(UnstyledLink).prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });
  });

  describe('url', () => {
    it('does not render an <UnstyledLink /> by default', () => {
      const element = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id="itemId" onClick={noop} accessibilityLabel={ariaLabel} />
        </Provider>,
      );

      expect(element.find(UnstyledLink).exists()).toBe(false);
    });

    it('renders an <UnstyledLink />', () => {
      const element = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </Provider>,
      );

      expect(element.find(UnstyledLink).exists()).toBe(true);
    });

    it('renders an <UnstyledLink /> with url', () => {
      const element = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </Provider>,
      );

      expect(element.find(UnstyledLink).prop('url')).toBe(url);
    });

    it('renders an <UnstyledLink /> with an aria-label of ariaLabel', () => {
      const element = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </Provider>,
      );

      expect(element.find(UnstyledLink).prop('aria-label')).toBe(ariaLabel);
    });

    it('adds a data-href to the wrapper element', () => {
      const element = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id="itemId" url={url} />
        </Provider>,
      );

      expect(element.prop('data-href')).toBe(url);
    });
  });

  describe('id', () => {
    it('is used on the content node and for the description of a link', () => {
      const item = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item
            id={itemId}
            url="https://shopify.com"
            accessibilityLabel={ariaLabel}
          />
        </Provider>,
      );

      expect(findByTestID(item, 'Item-Content').prop('id')).toBe(itemId);
      expect(item.find(UnstyledLink).prop('aria-describedby')).toBe(itemId);
    });
  });

  describe('onClick()', () => {
    it('calls onClick when clicking on the item when onClick exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} onClick={onClick} accessibilityLabel={ariaLabel} />
        </Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(itemId);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item
            id={itemId}
            onClick={onClick}
            url={url}
            accessibilityLabel={ariaLabel}
          />
        </Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(itemId);
    });

    it('calls window.open on metaKey + click', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </Provider>,
      );
      const item = findByTestID(wrapper, 'Item-Wrapper');
      trigger(item, 'onClick', {nativeEvent: {metaKey: true}});
      expect(spy).toBeCalledWith(url, '_blank');
    });

    it('calls window.open on ctrlKey + click', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </Provider>,
      );
      const item = findByTestID(wrapper, 'Item-Wrapper');
      trigger(item, 'onClick', {nativeEvent: {ctrlKey: true}});
      expect(spy).toBeCalledWith(url, '_blank');
    });
  });

  describe('Selectable', () => {
    it('does not call the Item onClick when clicking the LargerSelectionArea', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectableContext}>
          <Item id={itemId} onClick={onClick} />
        </Provider>,
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');
      expect(onClick).not.toBeCalled();
    });

    it('calls onSelectionChange with the id of the item when clicking the LargerSelectionArea', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectableContext}>
          <Item id={itemId} url={url} />
        </Provider>,
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');
      expect(mockSelectableContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
      );
    });
  });

  describe('SelectMode', () => {
    it('calls onClick when item is clicked', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectModeContext}>
          <Item id={itemId} onClick={onClick} accessibilityLabel={ariaLabel} />
        </Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).not.toBeCalledWith(itemId);
    });

    it('calls onSelectionChange with the id of the item even if url or onClick is present', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectableContext}>
          <Item
            id={itemId}
            url={url}
            onClick={onClick}
            accessibilityLabel={ariaLabel}
          />
        </Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(mockSelectModeContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
      );
    });

    it('renders a checked Checkbox if the item is in the selectedItems context', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectableContext}>
          <Item id={selectedItemId} url={url} />
        </Provider>,
      );
      expect(wrapper.find(Checkbox).props().checked).toBe(true);
    });

    it('does not call window.open when clicking the item with metaKey', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectModeContext}>
          <Item id={selectedItemId} url={url} />
        </Provider>,
      );
      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {metaKey: true},
      });
      expect(spy).not.toBeCalled();
    });

    it('does not call window.open when clicking the item with ctrlKey', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockSelectModeContext}>
          <Item id={selectedItemId} url={url} />
        </Provider>,
      );
      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).not.toBeCalled();
    });
  });

  describe('media', () => {
    it('does not include media if not provided', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} url={url} />
        </Provider>,
      );
      expect(findByTestID(wrapper, 'Media').exists()).toBe(false);
    });

    it('renders a disabled checked Checkbox if loading context is true', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockLoadingContext}>
          <Item id={selectedItemId} url={url} />
        </Provider>,
      );
      expect(wrapper.find(Checkbox).prop('disabled')).toBe(true);
    });

    it('includes an <Avatar /> if one is provided', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} url={url} media={<Avatar customer />} />
        </Provider>,
      );
      expect(
        findByTestID(wrapper, 'Media')
          .find(Avatar)
          .exists(),
      ).toBe(true);
    });

    it('includes a <Thumbnail /> if one is provided', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item
            id={itemId}
            url={url}
            media={<Thumbnail source="source" alt="alt" />}
          />
        </Provider>,
      );
      expect(
        findByTestID(wrapper, 'Media')
          .find(Thumbnail)
          .exists(),
      ).toBe(true);
    });
  });

  describe('shortcutActions', () => {
    it('does not render shortcut actions if none are provided', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} url={url} />
        </Provider>,
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(false);
    });

    it('renders shortcut actions when some are provided', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item id={itemId} url={url} shortcutActions={[{content: 'action'}]} />
        </Provider>,
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(true);
    });

    it('renders persistent shortcut actions if persistActions is true', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </Provider>,
      );
      expect(wrapper.find(ButtonGroup).exists()).toBe(true);
    });

    it('does not render while loading', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={{...mockLoadingContext}}>
          <Item
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </Provider>,
      );
      expect(wrapper.find(ButtonGroup)).toHaveLength(0);
    });
  });

  describe('accessibleMarkup', () => {
    it('renders with a tab index of -1 when loading is true', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockLoadingContext}>
          <Item
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </Provider>,
      );
      expect(wrapper.find(UnstyledLink).prop('tabIndex')).toBe(-1);
    });

    it('renders with a tab index of 0 when loading is false', () => {
      const wrapper = mountWithAppProvider(
        <Provider value={mockDefaultContext}>
          <Item
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </Provider>,
      );
      expect(wrapper.find(UnstyledLink).prop('tabIndex')).toBe(0);
    });
  });
});
