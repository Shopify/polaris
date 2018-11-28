import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider, trigger} from 'test-utilities';
import UnstyledLink from '../../../../../../UnstyledLink';
import Icon, {Props as IconProps} from '../../../../../../Icon';
import ActionItem from '../ActionItem';

describe('<ActionItem />', () => {
  const mockProps = {
    tabIndex: 0,
    onClick: noop,
    className: '',
  };

  describe('url', () => {
    it('renders an unstyled link when present', () => {
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url="/products" />,
      );
      expect(actionItem.find(UnstyledLink)).toHaveLength(1);
    });

    it('renders a button when not present', () => {
      const actionItem = mountWithAppProvider(<ActionItem {...mockProps} />);
      expect(actionItem.find('button')).toHaveLength(1);
    });

    it('gets passed into the link', () => {
      const url = '/products';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url={url} />,
      );
      expect(actionItem.find(UnstyledLink).prop('url')).toBe(url);
    });
  });

  describe('children', () => {
    it('is used as content for the link', () => {
      const content = 'Products';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url="/products">
          {content}
        </ActionItem>,
      );
      expect(actionItem.find(UnstyledLink).contains(content)).toBeTruthy();
    });

    it('is used as content for the button', () => {
      const content = 'Products';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps}>{content}</ActionItem>,
      );
      expect(actionItem.find('button').contains(content)).toBeTruthy();
    });
  });

  describe('icon', () => {
    it('passes the icon into the link', () => {
      const icon: IconProps['source'] = 'view';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url="/products" icon={icon} />,
      );
      expect(
        actionItem
          .find(UnstyledLink)
          .find(Icon)
          .prop('source'),
      ).toBe(icon);
    });

    it('passes the icon into the button', () => {
      const icon: IconProps['source'] = 'view';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} icon={icon} />,
      );
      expect(
        actionItem
          .find('button')
          .find(Icon)
          .prop('source'),
      ).toBe(icon);
    });
  });

  describe('className', () => {
    it('gets passed into the link', () => {
      const className = 'Item';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url="/products" className={className} />,
      );
      expect(actionItem.find(UnstyledLink).prop('className')).toBe(className);
    });

    it('gets passed into the button', () => {
      const className = 'Item';
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} className={className} />,
      );
      expect(actionItem.find('button').prop('className')).toBe(className);
    });
  });

  describe('tabIndex', () => {
    it('gets passed into the link', () => {
      const tabIndex = 0;
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url="/products" tabIndex={tabIndex} />,
      );
      expect(actionItem.find(UnstyledLink).prop('tabIndex')).toBe(tabIndex);
    });

    it('gets passed into the button', () => {
      const tabIndex = 0;
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} tabIndex={tabIndex} />,
      );
      expect(actionItem.find('button').prop('tabIndex')).toBe(tabIndex);
    });
  });

  describe('onClick()', () => {
    it('is used as the onClick handler on the link', () => {
      const onClickSpy = jest.fn();
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} url="/products" onClick={onClickSpy} />,
      );
      trigger(actionItem.find(UnstyledLink), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });

    it('is used as the onClick handler on the button', () => {
      const onClickSpy = jest.fn();
      const actionItem = mountWithAppProvider(
        <ActionItem {...mockProps} onClick={onClickSpy} />,
      );
      trigger(actionItem.find('button'), 'onClick');
      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
