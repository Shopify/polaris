import React from 'react';
import type {AllHTMLAttributes} from 'react';
import {mountWithApp} from 'tests/utilities';
import {setMediaWidth} from 'tests/utilities/breakpoints';

import {Avatar} from '../../Avatar';
import {Button} from '../../Button';
import {ButtonGroup} from '../../ButtonGroup';
import {Checkbox} from '../../Checkbox';
import {InlineStack} from '../../InlineStack';
import {Thumbnail} from '../../Thumbnail';
import {UnstyledLink} from '../../UnstyledLink';
import {ResourceItem} from '../ResourceItem';
import {ResourceListContext} from '../../../utilities/resource-list';
import styles from '../ResourceItem.module.css';

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

  function findResourceItem(wrapper: ReturnType<typeof mountWithApp>) {
    return wrapper!.findWhere<'div'>(
      (node) =>
        node.is('div') && node.domNode!.classList.contains(styles.ResourceItem),
    );
  }

  describe('accessibilityLabel', () => {
    it('is used on the <UnstyledLink /> for the aria-label attribute', () => {
      const item = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
          />
        </ResourceListContext.Provider>,
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': accessibilityLabel,
      });
    });
  });

  describe('name', () => {
    it('is used as the Checkbox label', () => {
      const item = mountWithApp(
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

      expect(item).toContainReactComponent(Checkbox, {label: expectedLabel});
    });

    it('is used on <UnstyledLink /> for the aria-label attribute if an `accessibilityLabel` is not provided', () => {
      const item = mountWithApp(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={itemId} url="https://shopify.com" name={name} />
        </ResourceListContext.Provider>,
      );

      const expectedLabel = `View details for ${name}`;

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': expectedLabel,
      });
    });

    it('is used on the disclosure action menu when there are persistent actions', () => {
      setMediaWidth('breakpoints-lg');
      const item = mountWithApp(
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

      expect(item).toContainReactComponentTimes(Button, 1, {
        variant: 'tertiary',
        accessibilityLabel: expectedLabel,
      });
    });
  });

  describe('ResourceName.singular', () => {
    it('is used on <UnstyledLink /> for the aria-label attribute if a `name` and `accessibilityLabel` is not provided', () => {
      const item = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url="https://shopify.com" />
        </ResourceListContext.Provider>,
      );

      const expectedLabel = `View details for ${mockDefaultContext.resourceName.singular}`;

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': expectedLabel,
      });
    });
  });

  describe('url', () => {
    it('does not render an <UnstyledLink /> by default', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            onClick={noop}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      expect(element).not.toContainReactComponent(UnstyledLink);
    });

    it('renders an <UnstyledLink />', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent(UnstyledLink);
    });

    it('renders an <UnstyledLink /> with url', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {url});
    });

    it('renders an <UnstyledLink /> with an aria-label of ariaLabel', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        'aria-label': ariaLabel,
      });
    });

    it('adds a data-href to the wrapper element', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent('div', {'data-href': url} as any);
    });

    it('does not render an <UnstyledLink /> when disabled prop is true', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            url={url}
            onClick={noop}
            accessibilityLabel={ariaLabel}
            disabled
          />
        </ResourceListContext.Provider>,
      );

      expect(element).not.toContainReactComponent(UnstyledLink);
    });
  });

  describe('external', () => {
    it('renders an <UnstyledLink /> with undefined external prop', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id="itemId" url={url} />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        external: undefined,
      });
    });

    it('renders an <UnstyledLink /> with external set to true', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            url={url}
            accessibilityLabel={ariaLabel}
            external
          />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        external: true,
      });
    });

    it('renders an <UnstyledLink /> with external set to false', () => {
      const element = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id="itemId"
            url={url}
            accessibilityLabel={ariaLabel}
            external={external}
          />
        </ResourceListContext.Provider>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        external: false,
      });
    });
  });

  describe('id', () => {
    it('is used on the content node and for the description of a link', () => {
      const item = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url="https://shopify.com"
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      expect(item).toContainReactComponent('div', {id: itemId});
      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-describedby': itemId,
      });
    });
  });

  describe('onClick()', () => {
    it('calls onClick when clicking on the item when onClick exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(onClick).toHaveBeenCalledWith(itemId);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            url={url}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(onClick).toHaveBeenCalledWith(itemId);
    });

    it('calls window.open on metaKey + click', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {metaKey: true},
      });
      expect(spy).toHaveBeenCalledWith(url, '_blank');
    });

    it('calls onClick when hitting keyUp on the item when onClick and URL exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url="#" onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onKeyUp', {key: 'Enter'});

      expect(onClick).toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on non Enter key', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url="#" onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onKeyUp', {key: 'Tab'});

      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on the item when no URL exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={itemId} onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onKeyUp', {key: 'Enter'});
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on the item when onClick exists, url exists and is disabled', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={itemId} url="#" onClick={onClick} disabled />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onKeyUp', {key: 'Enter'});
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when clicking on the item when onClick exists and is disabled', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            accessibilityLabel={ariaLabel}
            disabled
          />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(onClick).not.toHaveBeenCalledWith(itemId);
    });

    it('calls window.open on ctrlKey + click', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).toHaveBeenCalledWith(url, '_blank');
    });
  });

  describe('Selectable', () => {
    it('does not call the Item onClick when clicking the LargerSelectionArea', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={itemId} onClick={onClick} />
        </ResourceListContext.Provider>,
      );

      const checkboxWrapperEl = wrapper.findWhere<'div'>(
        (node) =>
          node.is('div') && node.prop('className')!.includes('CheckboxWrapper'),
      );

      checkboxWrapperEl!.trigger('onChange', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls onSelectionChange with the id of the item when clicking the LargerSelectionArea', () => {
      const sortOrder = 0;
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={itemId} url={url} sortOrder={sortOrder} />
        </ResourceListContext.Provider>,
      );

      const checkboxWrapperEl = wrapper.findWhere<'div'>(
        (node) =>
          node.is('div') && node.prop('className')!.includes('CheckboxWrapper'),
      );

      checkboxWrapperEl!.trigger('onChange', {
        stopPropagation: () => {},
        nativeEvent: {shiftKey: false},
      });
      expect(mockSelectableContext.onSelectionChange).toHaveBeenCalledWith(
        true,
        itemId,
        sortOrder,
        false,
      );
    });

    it('renders a disabled Checkbox if the item is disabled', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={selectedItemId} url={url} disabled />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(Checkbox, {disabled: true});
    });
  });

  describe('SelectMode', () => {
    it('calls onClick when item is clicked', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem
            id={itemId}
            onClick={onClick}
            accessibilityLabel={ariaLabel}
          />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(onClick).not.toHaveBeenCalledWith(itemId);
    });

    it('calls onSelectionChange with the id of the item even if url or onClick is present', () => {
      const onClick = jest.fn();
      const sortOrder = 0;
      const wrapper = mountWithApp(
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

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
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
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectableContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(Checkbox, {checked: true});
    });

    it('does not call window.open when clicking the item with metaKey', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {metaKey: true},
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not call window.open when clicking the item with ctrlKey', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );

      findResourceItem(wrapper)!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('media', () => {
    it('does not include media if not provided', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).not.toContainReactComponent('div', {
        className: styles.Media,
      });
    });

    it('renders a disabled checked Checkbox if loading context is true', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockLoadingContext}>
          <ResourceItem id={selectedItemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(Checkbox, {disabled: true});
    });

    it('includes an <Avatar /> if one is provided', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} media={<Avatar customer />} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(Avatar);
    });

    it('includes a <Thumbnail /> if one is provided', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            media={<Thumbnail source="source" alt="alt" />}
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(Thumbnail);
    });
  });

  describe('shortcutActions', () => {
    it('does not render shortcut actions if none are provided', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem id={itemId} url={url} />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).not.toContainReactComponent('div', {
        className: styles.Actions,
      });
    });

    it('renders shortcut actions when some are provided and viewport is lgUp', () => {
      setMediaWidth('breakpoints-lg');
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent('div', {
        className: styles.Actions,
      });
    });

    it('renders persistent shortcut actions if persistActions is true and viewport is lgUp', () => {
      setMediaWidth('breakpoints-lg');
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(ButtonGroup);
    });

    it('does not render while loading', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={{...mockLoadingContext}}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).not.toContainReactComponent(ButtonGroup);
    });
  });

  describe('accessibleMarkup', () => {
    it('renders with a tab index of -1 when loading is true', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockLoadingContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(UnstyledLink, {tabIndex: -1});
    });

    it('renders with a tab index of 0 when loading is false', () => {
      const wrapper = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </ResourceListContext.Provider>,
      );
      expect(wrapper).toContainReactComponent(UnstyledLink, {tabIndex: 0});
    });
  });

  describe('mouse events', () => {
    it('triggers onMouseOver callback when mouse over event is triggered on container', () => {
      const onMouseOverSpy = jest.fn();
      const resourceItem = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={itemId} url={url} onMouseOver={onMouseOverSpy} />
        </ResourceListContext.Provider>,
      );

      expect(onMouseOverSpy).not.toHaveBeenCalled();

      const wrapperDiv = resourceItem.find('div', {'data-href': url} as any);

      wrapperDiv!.trigger('onMouseOver');

      expect(onMouseOverSpy).toHaveBeenCalled();
      onMouseOverSpy.mockRestore();
    });

    it('triggers onMouseOut callback when mouse out event is triggered on container', () => {
      const onMouseOutSpy = jest.fn();
      const resourceItem = mountWithApp(
        <ResourceListContext.Provider value={mockSelectModeContext}>
          <ResourceItem id={itemId} url={url} onMouseOut={onMouseOutSpy} />
        </ResourceListContext.Provider>,
      );

      expect(onMouseOutSpy).not.toHaveBeenCalled();

      const wrapperDiv = resourceItem.find('div', {'data-href': url} as any);

      wrapperDiv!.trigger('onMouseOut');

      expect(onMouseOutSpy).toHaveBeenCalled();
      onMouseOutSpy.mockRestore();
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

      expect(resourceItem).toContainReactComponent(InlineStack);
    });

    it('renders with leading vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="leading" />,
      );

      expect(resourceItem).toContainReactComponent(InlineStack, {
        blockAlign: 'start',
      });
    });

    it('renders with center vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="center" />,
      );

      expect(resourceItem).toContainReactComponent(InlineStack, {
        blockAlign: 'center',
      });
    });

    it('renders with trailing vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="trailing" />,
      );

      expect(resourceItem).toContainReactComponent(InlineStack, {
        blockAlign: 'end',
      });
    });

    it('renders with stretch vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="fill" />,
      );

      expect(resourceItem).toContainReactComponent(InlineStack, {
        blockAlign: 'stretch',
      });
    });

    it('renders with baseline vertical alignment', () => {
      const resourceItem = mountWithApp(
        <ResourceItem id={itemId} url={url} verticalAlignment="baseline" />,
      );

      expect(resourceItem).toContainReactComponent(InlineStack, {
        blockAlign: 'baseline',
      });
    });
  });

  describe('dataHref', () => {
    it('renders a data-href tag on the li when the dataHref prop is specified', () => {
      const item = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
            dataHref="google.com"
          />
        </ResourceListContext.Provider>,
      );

      expect(item).toContainReactComponent('li', {
        'data-href': 'google.com',
      } as AllHTMLAttributes<HTMLElement>);
    });

    it('renders a data-href tag on the li when the dataHref prop is not specified', () => {
      const item = mountWithApp(
        <ResourceListContext.Provider value={mockDefaultContext}>
          <ResourceItem
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
          />
        </ResourceListContext.Provider>,
      );

      expect(item).toContainReactComponent('li', {
        'data-href': undefined,
      } as any);
    });
  });
});

function noop() {}
