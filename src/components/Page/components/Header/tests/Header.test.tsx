import * as React from 'react';
import {SaveMinor} from '@shopify/polaris-icons';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {Breadcrumbs, buttonsFrom, Pagination} from 'components';
import {LinkAction, ActionListItemDescriptor} from '../../../../../types';
import {Action, ActionGroup, ActionGroupDescriptor} from '../components';
import Header from '../Header';

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
      const secondaryActions: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'REMOTE',
        },
      ];
      const header = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(header.find(Action)).toHaveLength(1);
    });
  });

  describe('actionGroups', () => {
    it('get rendered as action groups', () => {
      const secondaryActions: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'REMOTE',
        },
      ];

      const actionGroups = [
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

      expect(header.find(ActionGroup)).toHaveLength(2);
    });
  });

  describe('primaryAction', () => {
    it('renders a button based on the given action', () => {
      const primaryAction = {
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

  describe('<ActionGroup />', () => {
    const mockAction: ActionListItemDescriptor = {
      content: 'Products',
      url: 'https://www.google.com',
      target: 'REMOTE',
    };

    function fillActionGroup(
      partialActionGroup?: Partial<ActionGroupDescriptor>,
    ) {
      return {
        title: 'Group',
        actions: [mockAction],
        ...partialActionGroup,
      };
    }

    it('receives the group’s title', () => {
      const title = 'First group';
      const actionGroups = [fillActionGroup({title})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(ActionGroup).prop('title')).toBe(title);
    });

    it('receives the group’s icon', () => {
      const icon = SaveMinor;
      const actionGroups = [fillActionGroup({icon})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(ActionGroup).prop('icon')).toBe(icon);
    });

    it('receives the group’s actions', () => {
      const actions = [mockAction];
      const actionGroups = [fillActionGroup({actions})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(ActionGroup).prop('actions')).toStrictEqual(actions);
    });

    it('receives the group’s details', () => {
      const details = 'Some details.';
      const actionGroups = [fillActionGroup({details})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(ActionGroup).prop('details')).toStrictEqual(details);
    });

    it('is inactive by default', () => {
      const actionGroups = [fillActionGroup()];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(ActionGroup).prop('active')).toBeFalsy();
    });

    it('becomes active when opened', () => {
      const title = 'First group';
      const actionGroups = [fillActionGroup({title})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      trigger(header.find(ActionGroup), 'onOpen', title);
      expect(header.find(ActionGroup).prop('active')).toBeTruthy();
    });

    it('becomes inactive when closed', () => {
      const title = 'First group';
      const actionGroups = [fillActionGroup({title})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      trigger(header.find(ActionGroup), 'onOpen', title);
      trigger(header.find(ActionGroup), 'onClose', title);
      expect(header.find(ActionGroup).prop('active')).toBeFalsy();
    });
  });
});
