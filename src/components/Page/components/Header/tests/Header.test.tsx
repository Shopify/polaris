import * as React from 'react';
import {SaveMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';

import {
  Breadcrumbs,
  buttonsFrom,
  Pagination,
  PlainAction,
  PlainActionGroup,
  PlainActionGroupDescriptor,
  RollupActions,
  RollupActionsProps,
} from 'components';

import {LinkAction, ActionListItemDescriptor} from '../../../../../types';

import Header, {Props} from '../Header';
import {HeaderPrimaryAction} from '../types';

describe('<Header />', () => {
  const mockProps: Props = {
    title: 'mock title',
  };

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

  describe('secondaryActions', () => {
    const mockSecondaryActions: RollupActionsProps['items'] = [
      {
        content: 'content 1',
        url: 'https://www.google.com',
        target: 'REMOTE',
      },
      {
        content: 'content 2',
        url: 'https://shopify.ca',
      },
    ];

    it('get rendered as <PlainAction /> on desktop', () => {
      const header = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );
      expect(header.find(PlainAction)).toHaveLength(
        mockSecondaryActions.length,
      );
    });

    // TODO: This should be using `matchMedia` to put the test env in a mobile width
    it('get rendered as <RollupActions /> `items` on mobile', () => {
      const header = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );
      expect(header.find(RollupActions).prop('items')).toBe(
        mockSecondaryActions,
      );
    });
  });

  describe('actionGroups', () => {
    const mockSecondaryActions: RollupActionsProps['items'] = [
      {
        content: 'content 1',
        url: 'https://www.google.com',
        target: 'REMOTE',
      },
      {
        content: 'content 2',
        url: 'https://shopify.ca',
      },
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

    it('get rendered as <PlainActionGroup /> on desktop', () => {
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(header.find(PlainActionGroup)).toHaveLength(
        mockActionGroups.length,
      );
    });

    // TODO: This should be using `matchMedia` to put the test env in a mobile width
    it('get rendered as <RollupActions /> `sections` on mobile', () => {
      const header = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );
      expect(header.find(RollupActions).prop('items')).toBe(
        mockSecondaryActions,
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

  describe('<PlainActionGroup />', () => {
    const mockAction: ActionListItemDescriptor = {
      content: 'Products',
      url: 'https://www.google.com',
      target: 'REMOTE',
    };

    function fillActionGroup(
      partialPlainActionGroup?: Partial<PlainActionGroupDescriptor>,
    ) {
      return {
        title: 'Group',
        actions: [mockAction],
        ...partialPlainActionGroup,
      };
    }

    it('receives the group’s title', () => {
      const title = 'First group';
      const actionGroups = [fillActionGroup({title})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(PlainActionGroup).prop('title')).toBe(title);
    });

    it('receives the group’s icon', () => {
      const icon = SaveMinor;
      const actionGroups = [fillActionGroup({icon})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(PlainActionGroup).prop('icon')).toBe(icon);
    });

    it('receives the group’s actions', () => {
      const actions = [mockAction];
      const actionGroups = [fillActionGroup({actions})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(PlainActionGroup).prop('actions')).toStrictEqual(
        actions,
      );
    });

    it('receives the group’s details', () => {
      const details = 'Some details.';
      const actionGroups = [fillActionGroup({details})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(PlainActionGroup).prop('details')).toStrictEqual(
        details,
      );
    });

    it('is inactive by default', () => {
      const actionGroups = [fillActionGroup()];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(PlainActionGroup).prop('active')).toBeFalsy();
    });

    it('becomes active when opened', () => {
      const title = 'First group';
      const actionGroups = [fillActionGroup({title})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      trigger(header.find(PlainActionGroup), 'onOpen', title);
      expect(header.find(PlainActionGroup).prop('active')).toBeTruthy();
    });

    it('becomes inactive when closed', () => {
      const title = 'First group';
      const actionGroups = [fillActionGroup({title})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      trigger(header.find(PlainActionGroup), 'onOpen', title);
      trigger(header.find(PlainActionGroup), 'onClose', title);
      expect(header.find(PlainActionGroup).prop('active')).toBeFalsy();
    });
  });
});
