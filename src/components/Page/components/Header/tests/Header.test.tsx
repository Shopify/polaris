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

import {RollupSecondaryAction} from '../../../../RollupActions';
import {LinkAction, ActionListItemDescriptor} from '../../../../../types';

import Header from '../Header';
import {HeaderPrimaryAction} from '../types';

describe('<Header />', () => {
  const mockProps = {
    title: 'test',
  };

  describe('title', () => {
    it('is displayed in the header', () => {
      const title = 'test';
      const header = mountWithAppProvider(<Header title={title} />);
      expect(header.text()).toContain(title);
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
    it('get rendered as actions', () => {
      const secondaryActions: RollupSecondaryAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'REMOTE',
        },
      ];
      const header = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(header.find(PlainAction)).toHaveLength(1);
    });
  });

  describe('actionGroups', () => {
    it('get rendered as action groups', () => {
      const secondaryActions: RollupSecondaryAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'REMOTE',
        },
      ];

      const actionGroups: RollupActionsProps['actionGroups'] = [
        {
          title: 'First group',
          actions: secondaryActions,
        },
        {
          title: 'Second group',
          actions: secondaryActions,
        },
      ];

      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );

      expect(header.find(PlainActionGroup)).toHaveLength(2);
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

  describe('<RollupActions />', () => {
    it('passes `secondaryActions`', () => {
      const secondaryActions: RollupSecondaryAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'REMOTE',
        },
      ];
      const header = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(header.find(RollupActions).prop('secondaryActions')).toBe(
        secondaryActions,
      );
    });

    it('passes `actionGroups`', () => {
      const actionGroups: RollupActionsProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [
            {
              content: 'mock content',
              helpText: 'mock help text',
            },
          ],
          details: 'mock details',
        },
      ];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(RollupActions).prop('actionGroups')).toBe(
        actionGroups,
      );
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
