import React from 'react';
import {mountWithApp} from 'test-utilities';
import {
  Avatar,
  ButtonGroup,
  Checkbox,
  Thumbnail,
  UnstyledLink,
  Button,
} from 'components';

import {Manager} from '../../Manager';
import {Item} from '../Item';

describe('<Item />', () => {
  let spy: jest.SpyInstance;

  beforeEach(() => {
    spy = jest.spyOn(window, 'open');
    spy.mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  const itemId = 'itemId';
  const selectedItemId = 'selectedId';
  const accessibilityLabel = 'link anchor aria-label';
  const name = 'item name';

  const url = 'http://test-link.com';
  const external = false;
  const ariaLabel = 'View Item';

  const defaultProps = {
    hasItemsSelected: false,
  };

  describe('accessibilityLabel', () => {
    it('is used on the <UnstyledLink /> for the aria-label attribute', () => {
      const item = mountWithApp(
        <Manager {...defaultProps}>
          <Item
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
          />
        </Manager>,
      );

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': accessibilityLabel,
      });
    });
  });

  describe('name', () => {
    it('is used as the Checkbox label', () => {
      const item = mountWithApp(
        <Manager {...defaultProps} selectable>
          <Item
            accessibilityLabel={accessibilityLabel}
            id={itemId}
            url="https://shopify.com"
            name={name}
          />
        </Manager>,
      );

      const expectedLabel = name;

      expect(item).toContainReactComponent(Checkbox, {
        label: expectedLabel,
      });
    });

    it('is used on <UnstyledLink /> for the aria-label attribute if an `accessibilityLabel` is not provided', () => {
      const item = mountWithApp(
        <Manager {...defaultProps} selectable>
          <Item id={itemId} url="https://shopify.com" name={name} />
        </Manager>,
      );

      const expectedLabel = `View details for ${name}`;

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': expectedLabel,
      });
    });

    it('is used on the disclosure action menu when there are persistent actions', () => {
      const item = mountWithApp(
        <Manager {...defaultProps} selectable>
          <Item
            accessibilityLabel={accessibilityLabel}
            id={selectedItemId}
            url="https://shopify.com"
            name={name}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </Manager>,
      );

      const expectedLabel = `Actions for ${name}`;

      expect(item).toContainReactComponentTimes(Button, 1, {
        accessibilityLabel: expectedLabel,
      });
    });
  });

  describe('ResourceName.singular', () => {
    it('is used on <UnstyledLink /> for the aria-label attribute if a `name` and `accessibilityLabel` is not provided', () => {
      const item = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url="https://shopify.com" />
        </Manager>,
      );

      const expectedLabel = `View details for item`;

      expect(item).toContainReactComponent(UnstyledLink, {
        'aria-label': expectedLabel,
      });
    });
  });

  describe('url', () => {
    it('does not render an <UnstyledLink /> by default', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" onClick={noop} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      expect(element).not.toContainReactComponent(UnstyledLink);
    });

    it('renders an <UnstyledLink />', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      expect(element).toContainReactComponent(UnstyledLink);
    });

    it('renders an <UnstyledLink /> with url', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {url});
    });

    it('renders an <UnstyledLink /> with an aria-label of ariaLabel', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        'aria-label': ariaLabel,
      });
    });

    it('adds a data-href to the wrapper element', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" url={url} />
        </Manager>,
      );

      expect(element).toContainReactComponent('li', {'data-href': url} as any);
    });
  });

  describe('external', () => {
    it('renders an <UnstyledLink /> with undefined external prop', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" url={url} />
        </Manager>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        external: undefined,
      });
    });

    it('renders an <UnstyledLink /> with external set to true', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item id="itemId" url={url} accessibilityLabel={ariaLabel} external />
        </Manager>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        external: true,
      });
    });

    it('renders an <UnstyledLink /> with external set to false', () => {
      const element = mountWithApp(
        <Manager {...defaultProps}>
          <Item
            id="itemId"
            url={url}
            accessibilityLabel={ariaLabel}
            external={external}
          />
        </Manager>,
      );

      expect(element).toContainReactComponent(UnstyledLink, {
        external: false,
      });
    });
  });

  describe('id', () => {
    it('is used on the content node and for the description of a link', () => {
      const item = mountWithApp(
        <Manager {...defaultProps}>
          <Item
            id={itemId}
            url="https://shopify.com"
            accessibilityLabel={ariaLabel}
          />
        </Manager>,
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
        <Manager {...defaultProps}>
          <Item id={itemId} onClick={onClick} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      wrapper
        .find('li')!
        .trigger('onClick', {stopPropagation: () => {}, nativeEvent: {}});
      expect(onClick).toHaveBeenCalledWith(itemId);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item
            id={itemId}
            onClick={onClick}
            url={url}
            accessibilityLabel={ariaLabel}
          />
        </Manager>,
      );

      wrapper
        .find('li')!
        .trigger('onClick', {stopPropagation: () => {}, nativeEvent: {}});
      expect(onClick).toHaveBeenCalledWith(itemId);
    });

    it('calls window.open on metaKey + click', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {metaKey: true},
      });
      expect(spy).toHaveBeenCalledWith(url, '_blank');
    });

    it('calls onClick when hitting keyUp on the item when onClick and URL exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url="#" onClick={onClick} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onKeyDown', {
        key: 'Enter',
      });
      expect(onClick).toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on non Enter key', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url="#" onClick={onClick} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onKeyDown', {
        key: 'Tab',
      });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when hitting keyUp on the item when no URL exists', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} onClick={onClick} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onKeyDown', {
        key: 'Enter',
      });
      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls window.open on ctrlKey + click', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onClick', {
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
        <Manager {...defaultProps} selectable>
          <Item id={itemId} onClick={onClick} />
        </Manager>,
      );

      wrapper
        .find('div', {className: 'Handle'})!
        .trigger('onClick', {stopPropagation: () => {}});
      expect(onClick).not.toHaveBeenCalled();
    });

    it('calls onSelectionChange with the id of the item when clicking the LargerSelectionArea', () => {
      const spy = jest.fn();
      const sortOrder = 0;
      const wrapper = mountWithApp(
        <Manager
          {...defaultProps}
          selectable
          hasItemsSelected
          onSelection={spy}
        >
          <Item id={itemId} url={url} position={sortOrder} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {},
      });
      expect(spy).toHaveBeenCalledWith('single', true, 'itemId');
    });
  });

  describe('SelectMode', () => {
    it('calls onClick when item is clicked', () => {
      const onClick = jest.fn();
      const wrapper = mountWithApp(
        <Manager {...defaultProps} hasItemsSelected>
          <Item id={itemId} onClick={onClick} accessibilityLabel={ariaLabel} />
        </Manager>,
      );

      wrapper
        .find('li')!
        .trigger('onClick', {stopPropagation: () => {}, nativeEvent: {}});
      expect(onClick).not.toHaveBeenCalledWith(itemId);
    });

    it('calls onSelectionChange with the id of the item even if url or onClick is present', () => {
      const spy = jest.fn();
      const sortOrder = 0;
      const wrapper = mountWithApp(
        <Manager {...defaultProps} hasItemsSelected onSelection={spy}>
          <Item
            id={itemId}
            url={url}
            position={sortOrder}
            accessibilityLabel={ariaLabel}
          />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onClick', {
        stopPropagation: () => {},
        key: ' ',
        nativeEvent: {shiftKey: false},
      } as any);
      expect(spy).toHaveBeenCalledWith('single', true, 'itemId');
    });

    it('renders a checked Checkbox if the item is selected', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps} hasItemsSelected>
          <Item id={selectedItemId} url={url} selected />
        </Manager>,
      );
      expect(wrapper).toContainReactComponent(Checkbox, {checked: true});
    });

    it('does not call window.open when clicking the item with metaKey', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps} hasItemsSelected>
          <Item id={selectedItemId} url={url} />
        </Manager>,
      );

      wrapper.find('li')!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {metaKey: true},
      });
      expect(spy).not.toHaveBeenCalled();
    });

    it('does not call window.open when clicking the item with ctrlKey', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps} hasItemsSelected>
          <Item id={selectedItemId} url={url} />
        </Manager>,
      );
      wrapper.find('li')!.trigger('onClick', {
        stopPropagation: () => {},
        nativeEvent: {ctrlKey: true},
      });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('media', () => {
    it('does not include media if not provided', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} />
        </Manager>,
      );
      expect(wrapper).not.toContainReactComponent('div', {className: 'Media'});
    });

    it('includes an <Avatar /> if one is provided', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} media={<Avatar customer />} />
        </Manager>,
      );

      expect(wrapper).toContainReactComponentTimes(Avatar, 1);
    });

    it('includes a <Thumbnail /> if one is provided', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item
            id={itemId}
            url={url}
            media={<Thumbnail source="source" alt="alt" />}
          />
        </Manager>,
      );

      expect(wrapper).toContainReactComponentTimes(Thumbnail, 1);
    });
  });

  describe('shortcutActions', () => {
    it('does not render shortcut actions if none are provided', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} />
        </Manager>,
      );
      expect(wrapper).not.toContainReactComponentTimes(ButtonGroup, 1);
    });

    it('renders shortcut actions when some are provided', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} shortcutActions={[{content: 'action'}]} />
        </Manager>,
      );
      expect(wrapper).toContainReactComponentTimes(ButtonGroup, 1);
    });

    it('renders persistent shortcut actions if persistActions is true', () => {
      const wrapper = mountWithApp(
        <Manager {...defaultProps}>
          <Item
            id={itemId}
            url={url}
            shortcutActions={[{content: 'action'}]}
            persistActions
          />
        </Manager>,
      );
      expect(wrapper).toContainReactComponentTimes(Button, 1, {
        plain: true,
        size: 'medium',
      });
    });
  });

  describe('verticalAlignment', () => {
    it('renders with default flex-start alignment if not provided', () => {
      const resourceItem = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} />
        </Manager>,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container',
      });
    });

    it('renders with leading vertical alignment', () => {
      const resourceItem = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} verticalAlignment="leading" />
        </Manager>,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentLeading',
      });
    });

    it('renders with center vertical alignment', () => {
      const resourceItem = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} verticalAlignment="center" />
        </Manager>,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentCenter',
      });
    });

    it('renders with trailing vertical alignment', () => {
      const resourceItem = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} verticalAlignment="trailing" />
        </Manager>,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentTrailing',
      });
    });

    it('renders with stretch vertical alignment', () => {
      const resourceItem = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} verticalAlignment="fill" />
        </Manager>,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentFill',
      });
    });

    it('renders with baseline vertical alignment', () => {
      const resourceItem = mountWithApp(
        <Manager {...defaultProps}>
          <Item id={itemId} url={url} verticalAlignment="baseline" />
        </Manager>,
      );

      expect(resourceItem).toContainReactComponent('div', {
        className: 'Container alignmentBaseline',
      });
    });
  });
});

function noop() {}
