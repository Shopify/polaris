import * as React from 'react';
import {shallow, mount} from 'enzyme';
import {noop} from '@shopify/javascript-utilities/other';
import {findByTestID} from '../../../../../../tests/utilities';

import {UnstyledLink} from '../../../../';
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

  const mockSelectableContext = {
    ...mockDefaultContext,
    selectMode: true,
    selectable: true,
    onSelectionChange: jest.fn(),
  };

  const url = 'http://test-link.com';

  describe('url', () => {
    it('does not renders a UnstyledLink by default', () => {
      const element = shallow(
        <Item
          id="itemId"
          onClick={noop}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).exists()).toBe(false);
    });

    it('renders a UnstyledLink', () => {
      const element = shallow(
        <Item
          id="itemId"
          url={url}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).exists()).toBe(true);
    });

    it('renders a UnstyledLink with url', () => {
      const element = shallow(
        <Item
          id="itemId"
          url={url}
        />,
        {context: mockDefaultContext},
      );

      expect(element.find(UnstyledLink).prop('url')).toBe(url);
    });
  });

  describe('onClick()', () => {
    it('calls onClick when clicking on the item when onClick exist', () => {
      const id = 'itemId';
      const onClick = jest.fn();
      const wrapper = mount(
        <Item
          id={id}
          onClick={onClick}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(id);
    });

    it('calls onClick when clicking on the item when both onClick and url exist', () => {
      const id = 'itemId';
      const onClick = jest.fn();
      const wrapper = mount(
        <Item
          id={id}
          onClick={onClick}
          url={url}
        />,
        {context: mockDefaultContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).toBeCalledWith(id);
    });
  });

  describe('in selectMode', () => {
    it('it should not call onClick when clicking the item', () => {
      const id = 'itemId';
      const onClick = jest.fn();
      const wrapper = mount(
        <Item
          id={id}
          onClick={onClick}
        />,
        {context: mockSelectableContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(onClick).not.toBeCalledWith(id);
    });

    it('it should call onSelectionChange with the id of the item even if url or onClick is present', () => {
      const id = 'itemId';
      const onClick = jest.fn();
      const wrapper = mount(
        <Item
          id={id}
          url={url}
          onClick={onClick}
        />,
        {context: mockSelectableContext},
      );

      findByTestID(wrapper, 'Item-Wrapper').simulate('click');
      expect(mockSelectableContext.onSelectionChange).toHaveBeenCalledWith(true, id);
    });
  });
});
