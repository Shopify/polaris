import React from 'react';
// eslint-disable-next-line no-restricted-imports
import {
  findByTestID,
  mountWithAppProvider,
  trigger,
} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {
  Avatar,
  ButtonGroup,
  Checkbox,
  Thumbnail,
  UnstyledLink,
  Button,
} from 'components';

import {ResourceListContext} from '../../../utilities/resource-list';
import {ResourceItem} from '../ResourceItem';

describe('<ResourceItem />', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(window, 'open');
    spy.mockImplementation(() => {});
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
  const name = 'item name';

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
  const external = false;
  const ariaLabel = 'View Item';

  describe('accessibilityLabel', () => {
    it('is used on the <UnstyledLink /> for the aria-label attribute', () => {
      const item = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
          />
        </ResourceListContext.Provider>,
      );

      expect(item.find(UnstyledLink).prop('aria-label')).toBe(
        accessibilityLabel,
      );
    });
  });

  describe('name', () => {
    it('is used as the Checkbox label', () => {
      const item = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
            name={name}
          />
        </ResourceListContext.Provider>,
      );

      const expectedLabel = name;

      expect(item.find(Checkbox).prop('label')).toBe(expectedLabel);
    });

    it('is used on <UnstyledLink /> for the aria-label attribute if an `accessibilityLabel` is not provided', () => {
      const item = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={itemId} url="https://shopify.com" name={name} />
        </ResourceListContext.Provider>,
      );

      const expectedLabel = `View details for ${name}`;

      expect(item.find(UnstyledLink).prop('aria-label')).toBe(expectedLabel);
    });

    it('is used on the disclosure action menu when there are persistent actions', () => {
      const item = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem
            accessibilityLabel={accessibilityLabel}
            id={selectedItemId}
            url="https://shopify.com"
            name={name}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );

      const expectedLabel = `Actions for ${name}`;

      expect(
        item
          .find(Button)
          .findWhere(
            (node) =>
              node.prop('plain') &&
              node.prop('accessibilityLabel') === expectedLabel,
          ),
      ).toHaveLength(1);
    });
  });

  describe('ResourceName.singular', () => {
    it('is used on <UnstyledLink /> for the aria-label attribute if a `name` and `accessibilityLabel` is not provided', () => {
      const item = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url="https://shopify.com" />
        </ResourceListContext.Provider>,
      );

      const expectedLabel = `View details for ${mockDefaultContext.resourceName.singular}`;

      expect(item.find(UnstyledLink).prop('aria-label')).toBe(expectedLabel);
    });
  });

  describe('url', () => {
    it('does not render an <UnstyledLink /> by default', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            onClick={noop}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).exists()).toBe(false);
    });

    it('renders an <UnstyledLink />', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).exists()).toBe(true);
    });

    it('renders an <UnstyledLink /> with url', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).prop('url')).toBe(url);
    });

    it('renders an <UnstyledLink /> with an aria-label of ariaLabel', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).prop('aria-label')).toBe(ariaLabel);
    });

    it('adds a data-href to the wrapper element', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} />
        </ResourceListContext.Provider>,
      );

      expect(findByTestID(element, 'Item-Wrapper').prop('data-href')).toBe(url);
    });
  });

  describe('external', () => {
    it('renders an <UnstyledLink /> with undefined external prop', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).prop('external')).toBeUndefined();
    });

    it('renders an <UnstyledLink /> with external set to true', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            url={url}
            accessibilityLabel={ariaLabel}
            external
          />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).prop('external')).toBe(true);
    });

    it('renders an <UnstyledLink /> with external set to false', () => {
      const element = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            url={url}
            accessibilityLabel={ariaLabel}
            external={external}
          />
        </ResourceListContext.Provider>,
      );

      expect(element.find(UnstyledLink).prop('external')).toBe(false);
    });
  });

  describe('id', () => {
    it('is used on the content node and for the description of a link', () => {
      const item = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url="https://shopify.com"
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      expect(findByTestID(item, 'Item-Content').prop('id')).toBe(itemId);
      expect(item.find(UnstyledLink).prop('aria-describedby')).toBe(itemId);
    });
  });

  describe('onClick()', () => {
    it('calls onClick when clicking on the item when onClick exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toHaveBeenCalledWith(itemId);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            url={url}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toHaveBeenCalledWith(itemId);
    });

    it('calls window.open on metaKey + click', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );
      const item = findByTestID(wrapper, 'Item-Wrapper');
      trigger(item, 'onClick', {
        stopPropagation: () => {},
        nativeEvent: {metaKey: true},
      });
      expect(spy).toHaveBeenCalledWith(url, '_blank');
    });

    it('calls onClick when hitting keyUp on the item when onClick and URL exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url="#" onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('keyup', {
        key: 'Enter',
      });

      expect(onClick).toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on non Enter key', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url="#" onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('keyup', {
        key: 'Tab',
      });

      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on the item when no URL exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={itemId} onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('keyup', {
        key: 'Enter',
      });

      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls window.open on ctrlKey + click', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );
      const item = findByTestID(wrapper, 'Item-Wrapper');
      trigger(item, 'onClick', {
        stopPropagation: () => {},
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).toHaveBeenCalledWith(url, '_blank');
    });
  });

  describe('Selectable', () => {
    it('does not call the Item onClick when clicking the LargerSelectionArea', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={itemId} onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click');
      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls onSelectionChange with the id of the item when clicking the LargerSelectionArea', () => {
      const sortOrder = 0;
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={itemId} url={url} sortOrder={sortOrder} />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'LargerSelectionArea').simulate('click', {
        nativeEvent: {shiftKey: false},
      });
      expect(mockSelectableContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
        sortOrder,
        false,
      );
    });
  });

  describe('SelectMode', () => {
    it('calls onClick when item is clicked', () => {
      const onClick = jest.fn();
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).not.toHaveBeenCalledWith(itemId);
    });

    it('calls onSelectionChange with the id of the item even if url or onClick is present', () => {
      const onClick = jest.fn();
      const sortOrder = 0;
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem
            id={itemId}
            url={url}
            onClick={onClick}
            sortOrder={sortOrder}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {shiftKey: false},
      });
      expect(mockSelectModeContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
        sortOrder,
        false,
      );
    });

    it('renders a checked Checkbox if the item is in the selectedItems context', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper.find(Checkbox).props().checked).toBe(true);
    });

    it('does not call window.open when clicking the item with metaKey', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );
      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {metaKey: true},
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not call window.open when clicking the item with ctrlKey', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );
      findByTestID(wrapper, 'Item-Wrapper').simulate('click', {
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('media', () => {
    it('does not include media if not provided', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(findByTestID(wrapper, 'Media').exists()).toBe(false);
    });

    it('renders a disabled checked Checkbox if loading context is true', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockLoadingContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper.find(Checkbox).prop('disabled')).toBe(true);
    });

    it('includes an <Avatar /> if one is provided', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} media={<Avatar customer />} />
        </ResourceListContext.Provider>,
      );
      expect(findByTestID(wrapper, 'Media').find(Avatar).exists()).toBe(true);
    });

    it('includes a <Thumbnail /> if one is provided', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            media={<Thumbnail source="source" alt="alt" />}
          />
        </ResourceListContext.Provider>,
      );
      expect(findByTestID(wrapper, 'Media').find(Thumbnail).exists()).toBe(
        true,
      );
    });
  });

  describe('shortcutActions', () => {
    it('does not render shortcut actions if none are provided', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(false);
    });

    it('renders shortcut actions when some are provided', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
          />
        </ResourceListContext.Provider>,
      );
      expect(findByTestID(wrapper, 'ShortcutActions').exists()).toBe(true);
    });

    it('renders persistent shortcut actions if persistActions is true', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper.find(ButtonGroup).exists()).toBe(true);
    });

    it('does not render while loading', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={{...mockLoadingContext}}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper.find(ButtonGroup)).toHaveLength(0);
    });
  });

  describe('accessibleMarkup', () => {
    it('renders with a tab index of -1 when loading is true', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockLoadingContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper.find(UnstyledLink).prop('tabIndex')).toBe(-1);
    });

    it('renders with a tab index of 0 when loading is false', () => {
      const wrapper = mountWithAppProvider(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper.find(UnstyledLink).prop('tabIndex')).toBe(0);
    });
  });

  describe('newDesignLanguage', () => {
    it('adds a newDesignLanguage class when newDesignLanguage is enabled', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} />,
        {
          features: {newDesignLanguage: true},
        },
      );
      expect(resourceItem).toContainReactComponent('div', {
        className: 'ResourceItem newDesignLanguage',
      });
    });

    it('does not add a newDesignLanguage class when newDesignLanguage is disabled', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} />,
        {
          features: {newDesignLanguage: false},
        },
      );
      expect(resourceItem).not.toContainReactComponent('div', {
        className: 'ResourceItem newDesignLanguage',
      });
    });
  });

  describe('focused', () => {
    it('removes the focus state when mousing out a focused item', () => {
      const resourceItem = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={itemId} url={url} />
        </ResourceListContext.Provider>,
      );
      const wrapperDiv = resourceItem.find('div', {'data-href': url} as any);

      wrapperDiv!.trigger('onFocus', {
        target: wrapperDiv!.domNode as HTMLDivElement,
      });

      expect(resourceItem).toContainReactComponent('div', {
        className: 'ResourceItem focused selectable selectMode focusedInner',
      });

      wrapperDiv!.trigger('onMouseOut');

      expect(resourceItem).toContainReactComponent('div', {
        className: 'ResourceItem selectable selectMode',
      });
    });
  });

  describe('verticalAlignment', () => {
    it('renders with default flex-start alignment if not provided', () => {
      const resourceItem = mountWithApp(<ResourceItem id={itemId} url={url} />);

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container',
      });
    });

    it('renders with leading vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="leading" />,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentLeading',
      });
    });

    it('renders with center vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="center" />,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentCenter',
      });
    });

    it('renders with trailing vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="trailing" />,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentTrailing',
      });
    });

    it('renders with stretch vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="fill" />,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentFill',
      });
    });

    it('renders with baseline vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="baseline" />,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentBaseline',
      });
    });
  });
});

function noop() {}
