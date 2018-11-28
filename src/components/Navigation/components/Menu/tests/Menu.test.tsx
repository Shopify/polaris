import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {mountWithAppProvider, trigger} from 'test-utilities';
import MessageIndicator from '../../../../MessageIndicator';
import Message, {Props as MessageProps} from '../../Message';
import Icon, {IconSource} from '../../../../Icon';
import {ActionItem} from '../components';
import Menu from '../Menu';

describe('<Menu />', () => {
  const mockProps = {
    avatar: <div />,
  };

  describe('avatar', () => {
    it('renders', () => {
      const avatar = <div />;
      const menu = mountWithAppProvider(
        <Menu {...mockProps} avatar={avatar} />,
      );
      expect(menu.contains(avatar)).toBeTruthy();
    });

    it('gets wrapped in a message indicator', () => {
      const avatar = <div />;
      const menu = mountWithAppProvider(
        <Menu {...mockProps} avatar={avatar} />,
      );
      expect(menu.find(MessageIndicator).contains(avatar)).toBeTruthy();
    });
  });

  describe('title', () => {
    it('renders', () => {
      const title = 'John Doe';
      const menu = mountWithAppProvider(<Menu {...mockProps} title={title} />);
      expect(menu.contains(title)).toBeTruthy();
    });
  });

  describe('detail', () => {
    it('renders', () => {
      const detail = 'Little Victories CA';
      const menu = mountWithAppProvider(
        <Menu {...mockProps} detail={detail} />,
      );
      expect(menu.contains(detail)).toBeTruthy();
    });
  });

  describe('children', () => {
    it('renders', () => {
      const children = <div />;
      const menu = mountWithAppProvider(<Menu {...mockProps}>{children}</Menu>);
      expect(menu.contains(children)).toBeTruthy();
    });
  });

  describe('activatorAccessibilityLabel', () => {
    it('gets passed into the activator icon', () => {
      const activatorAccessibilityLabel = 'Show user menu';
      const menu = mountWithAppProvider(
        <Menu
          {...mockProps}
          activatorAccessibilityLabel={activatorAccessibilityLabel}
        />,
      );
      expect(menu.find(Icon).prop('accessibilityLabel')).toBe(
        activatorAccessibilityLabel,
      );
    });
  });

  describe('message', () => {
    const mockMessage = {
      title: 'Polaris',
      description: 'Download now',
      action: {
        content: 'View on npm',
        onClick: noop,
      },
      link: {
        content: 'View on yarn',
        to: 'https://yarnpkg.com/en/',
      },
    };

    it('is used to render a message', () => {
      const menu = mountWithAppProvider(
        <Menu {...mockProps} message={mockMessage} />,
      );
      expect(menu.find(Message).props()).toEqual(mockMessage);
    });

    it('passes in a badge when defined', () => {
      const message: MessageProps = {
        ...mockMessage,
        badge: {
          content: 'New message',
          status: 'success',
        },
      };
      const menu = mountWithAppProvider(
        <Menu {...mockProps} message={message} />,
      );
      expect(menu.find(Message).props()).toEqual(message);
    });

    it('is used to determine if a message indicator should be shown', () => {
      const menu = mountWithAppProvider(
        <Menu {...mockProps} message={mockMessage} />,
      );
      expect(menu.find(MessageIndicator).prop('active')).toBeTruthy();
    });
  });

  describe('actions', () => {
    const mockAction = {
      content: 'Products',
      onAction: noop,
      url: '/products',
      icon: 'view' as IconSource,
    };
    const mockSection = {id: '0', items: [mockAction]};

    it('renders an action item for each action', () => {
      const menu = mountWithAppProvider(
        <Menu {...mockProps} actions={[mockSection]} />,
      );
      expect(menu.find(ActionItem)).toHaveLength(1);
    });

    it('passes in the content', () => {
      const menu = mountWithAppProvider(
        <Menu {...mockProps} actions={[mockSection]} />,
      );
      expect(menu.find(ActionItem).prop('children')).toBe(mockAction.content);
    });

    it('passes in the icon', () => {
      const menu = mountWithAppProvider(
        <Menu {...mockProps} actions={[mockSection]} />,
      );
      expect(menu.find(ActionItem).prop('icon')).toBe(mockAction.icon);
    });

    it('passes in the url', () => {
      const menu = mountWithAppProvider(
        <Menu {...mockProps} actions={[mockSection]} />,
      );
      expect(menu.find(ActionItem).prop('url')).toBe(mockAction.url);
    });

    it('triggers the given onAction handler when clicked', () => {
      const onActionSpy = jest.fn();
      const actions = [
        {
          ...mockSection,
          items: [{...mockAction, url: undefined, onAction: onActionSpy}],
        },
      ];
      const menu = mountWithAppProvider(
        <Menu {...mockProps} actions={actions} />,
      );
      trigger(menu.find(ActionItem), 'onClick');
      expect(onActionSpy).toHaveReturnedTimes(1);
    });
  });
});
