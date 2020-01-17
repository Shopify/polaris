import React from 'react';
import {
  ActionMenu,
  Breadcrumbs,
  buttonsFrom,
  Pagination,
  Badge,
  Avatar,
} from 'components';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {LinkAction} from '../../../../../types';
import {Header, HeaderProps} from '../Header';

describe('<Header />', () => {
  const mockProps: HeaderProps = {
    title: 'mock title',
  };

  describe('Header', () => {
    const mockProps = {
      title: 'title',
      subtitle: 'subtitle',
      titleMetadata: <Badge>Sold</Badge>,
      thumbnail: <Avatar customer />,
    };

    it('sets the title on the Header', () => {
      const header = mountWithAppProvider(<Header {...mockProps} />);
      expect(header.find(Header).prop('title')).toBe(mockProps.title);
    });

    it('sets the subtitle on the Header', () => {
      const header = mountWithAppProvider(<Header {...mockProps} />);
      expect(header.find(Header).prop('subtitle')).toBe(mockProps.subtitle);
    });

    it('sets the thumbnail on the Header', () => {
      const header = mountWithAppProvider(<Header {...mockProps} />);
      expect(header.find(Header).prop('thumbnail')).toBe(mockProps.thumbnail);
    });

    it('sets the titleMetadata on the Header', () => {
      const header = mountWithAppProvider(<Header {...mockProps} />);
      expect(header.find(Header).prop('titleMetadata')).toBe(
        mockProps.titleMetadata,
      );
    });
  });

  describe('breadcrumbs', () => {
    const breadcrumbs: LinkAction[] = [
      {
        content: 'Products',
        url: 'https://www.google.com',
        target: 'REMOTE',
      },
    ];

    it('get passed into Breadcrumbs', () => {
      const header = mountWithAppProvider(
        <Header {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(header.find(Breadcrumbs).prop('breadcrumbs')).toStrictEqual(
        breadcrumbs,
      );
    });
  });

  describe('primaryAction', () => {
    it('renders a `primary` button based on the given action', () => {
      const primaryAction: HeaderProps['primaryAction'] = {
        content: 'Click me!',
      };

      const header = mountWithAppProvider(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      const expectedButton = buttonsFrom(primaryAction, {primary: true});
      expect(header.contains(expectedButton)).toBeTruthy();
    });

    it('renders a regular button based on the given action when primary is set to false', () => {
      const primaryAction: HeaderProps['primaryAction'] = {
        content: 'Click me!',
        primary: false,
      };

      const header = mountWithAppProvider(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      const expectedButton = buttonsFrom(primaryAction, {primary: false});
      expect(header.contains(expectedButton)).toBeTruthy();
    });
  });

  describe('pagination', () => {
    it('gets passed into Pagination', () => {
      const pagination = {
        hasNext: true,
      };

      const header = mountWithAppProvider(
        <Header {...mockProps} pagination={pagination} />,
      );

      expect(
        header.contains(<Pagination {...pagination} plain />),
      ).toBeTruthy();
    });
  });

  describe('secondaryActions', () => {
    const mockSecondaryActions: HeaderProps['secondaryActions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];

    it('passes to <ActionMenu />', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(ActionMenu).prop('actions')).toBe(
        mockSecondaryActions,
      );
    });
  });

  describe('actionGroups', () => {
    const mockSecondaryActions: HeaderProps['secondaryActions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];
    const mockActionGroups: HeaderProps['actionGroups'] = [
      {
        title: 'First group',
        actions: mockSecondaryActions,
      },
      {
        title: 'Second group',
        actions: mockSecondaryActions,
      },
    ];

    it('passes to <ActionMenu />', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper.find(ActionMenu).prop('groups')).toBe(mockActionGroups);
    });
  });

  describe('<ActionMenu />', () => {
    const mockSecondaryActions: HeaderProps['secondaryActions'] = [
      {content: 'mock content 1'},
    ];

    it('does not render without either `secondaryActions` or `actionGroups`', () => {
      const wrapper = mountWithAppProvider(<Header {...mockProps} />);

      expect(wrapper.find(ActionMenu).exists()).toBe(false);
    });

    it('does not render if `actionGroups` has no `actions', () => {
      const mockActionGroups: HeaderProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [],
        },
      ];
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper.find(ActionMenu).exists()).toBe(false);
    });

    it('renders with atleast valid `secondaryActions`', () => {
      const mockSecondaryActions: HeaderProps['secondaryActions'] = [
        {content: 'mock content'},
      ];
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(ActionMenu).exists()).toBe(true);
    });

    it('renders with atleast valid `actionGroups`', () => {
      const mockActionGroups: HeaderProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [{content: 'mock content 1'}],
        },
      ];
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper.find(ActionMenu).exists()).toBe(true);
    });

    it('renders with `rollup` as `false` when on desktop', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(ActionMenu).prop('rollup')).toBe(false);
    });

    it('renders with `rollup` as `true` when on mobile', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
        {mediaQuery: {isNavigationCollapsed: true}},
      );

      expect(wrapper.find(ActionMenu).prop('rollup')).toBe(true);
    });
  });
});
