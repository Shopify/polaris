import * as React from 'react';
import {mountWithAppProvider, trigger} from 'test-utilities';
import {Breadcrumbs, buttonsFrom, Pagination} from 'components';
import {LinkAction} from 'types';
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

  describe('breadcrumbs', () => {
    const breadcrumbs: LinkAction[] = [
      {
        content: 'Products',
        url: 'https://www.google.com',
        target: 'new',
      },
    ];

    it('get passed into Breadcrumbs', () => {
      const header = mountWithAppProvider(
        <Header {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(header.find(Breadcrumbs).prop('breadcrumbs')).toEqual(breadcrumbs);
    });
  });

  describe('secondaryActions', () => {
    it('get rendered as actions', () => {
      const secondaryActions: LinkAction[] = [
        {
          content: 'Products',
          url: 'https://www.google.com',
          target: 'new',
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
          target: 'new',
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
    const mockAction = {
      content: 'Products',
      url: 'https://www.google.com',
      target: 'new',
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
      const icon = 'save';
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
      expect(header.find(ActionGroup).prop('actions')).toEqual(actions);
    });

    it('receives the group’s details', () => {
      const details = 'Some details.';
      const actionGroups = [fillActionGroup({details})];
      const header = mountWithAppProvider(
        <Header {...mockProps} actionGroups={actionGroups} />,
      );
      expect(header.find(ActionGroup).prop('details')).toEqual(details);
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
