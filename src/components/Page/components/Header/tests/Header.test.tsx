import * as React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from 'test-utilities';

import {
  ActionMenu,
  Breadcrumbs,
  buttonsFrom,
  EventListener,
  Pagination,
} from 'components';

import {HeaderPrimaryAction} from '../../../types';
import {LinkAction} from '../../../../../types';

import Header, {Props} from '../Header';

describe('<Header />', () => {
  const mockProps: Props = {
    title: 'mock title',
  };

  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('renders resize <EventListener />', () => {
    const wrapper = mountWithAppProvider(<Header {...mockProps} />);
    const resizeEventListener = wrapper
      .find(EventListener)
      .filterWhere((component) => component.prop('event') === 'resize');

    expect(resizeEventListener).toHaveLength(1);
  });

  describe('title', () => {
    it('is displayed in the header', () => {
      const mockTitle = 'mock title';
      const header = mountWithAppProvider(<Header title={mockTitle} />);
      expect(header.text()).toContain(mockTitle);
    });
  });

  describe('titleMetadata', () => {
    it('is displayed in the header', () => {
      const metaData = <div />;
      const header = mountWithAppProvider(
        <Header {...mockProps} titleMetadata={metaData} />,
      );
      expect(header.contains(metaData)).toBeTruthy();
    });
  });

  describe('icon', () => {
    it('warns that icon is no longer supported', () => {
      const warnSpy = jest.spyOn(console, 'warn');
      mountWithAppProvider(<Header {...mockProps} icon="foo" />);

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        "The icon prop has been removed from Page. Upload an application icon in the Shopify Partners Dashboard 'App setup' section instead.",
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
    it('renders a button based on the given action', () => {
      const primaryAction: HeaderPrimaryAction = {
        content: 'Click me!',
      };

      const header = mountWithAppProvider(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      const expectedButton = buttonsFrom(primaryAction, {primary: true});
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
    const mockSecondaryActions: Props['secondaryActions'] = [
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
    const mockSecondaryActions: Props['secondaryActions'] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];
    const mockActionGroups: Props['actionGroups'] = [
      {
        title: 'First group',
        actions: [...mockSecondaryActions],
      },
      {
        title: 'Second group',
        actions: [...mockSecondaryActions],
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
    const mockSecondaryActions: Props['secondaryActions'] = [
      {content: 'mock content 1'},
    ];

    it('does not render without either `secondaryActions` or `actionGroups`', () => {
      const wrapper = mountWithAppProvider(<Header {...mockProps} />);

      expect(wrapper.find(ActionMenu).exists()).toBe(false);
    });

    it('does not render if `actionGroups` has no `actions', () => {
      const mockActionGroups: Props['actionGroups'] = [
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
      const mockSecondaryActions: Props['secondaryActions'] = [
        {content: 'mock content'},
      ];
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(ActionMenu).exists()).toBe(true);
    });

    it('renders with atleast valid `actionGroups`', () => {
      const mockActionGroups: Props['actionGroups'] = [
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
      matchMedia.setMedia(() => ({matches: true}));

      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(ActionMenu).prop('rollup')).toBe(true);
    });
  });
});
