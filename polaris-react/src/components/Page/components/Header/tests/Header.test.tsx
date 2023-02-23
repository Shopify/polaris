import React from 'react';
import {PlusMinor} from '@shopify/polaris-icons';
import {mountWithApp} from 'tests/utilities';

import {ActionMenu} from '../../../../ActionMenu';
import {Badge} from '../../../../Badge';
import {Breadcrumbs} from '../../../../Breadcrumbs';
import {Button} from '../../../../Button';
import {ButtonGroup} from '../../../../ButtonGroup';
import {Pagination} from '../../../../Pagination';
import {Tooltip} from '../../../../Tooltip';
import type {LinkAction, MenuActionDescriptor} from '../../../../../types';
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
    };

    it('sets the title on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        title: mockProps.title,
      });
    });

    it('sets the subtitle on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        subtitle: mockProps.subtitle,
      });
    });

    it('sets the titleMetadata on the Header', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).toHaveReactProps({
        titleMetadata: mockProps.titleMetadata,
      });
    });
  });

  describe('breadcrumbs', () => {
    const backAction: LinkAction = {
      content: 'Products',
      url: 'https://www.google.com',
    };

    it('get passed into Breadcrumbs', () => {
      const header = mountWithApp(
        <Header {...mockProps} backAction={breadcrumb} />,
      );
      expect(header).toContainReactComponent(Breadcrumbs, {
        backAction,
      });
    });

    it('renders breadcrumb markup if not an array', () => {
      const backAction: LinkAction = {
        content: 'Products',
        url: 'https://www.google.com',
      };
      const header = mountWithApp(
        <Header {...mockProps} backAction={breadcrumb} />,
      );
      expect(header).toContainReactComponent(Breadcrumbs, {
        backAction,
      });
    });

    it('does not render breadcrumb markup if no breadcrumbs', () => {
      const header = mountWithApp(<Header {...mockProps} />);
      expect(header).not.toContainReactComponent(Breadcrumbs);
    });
  });

  describe('primaryAction', () => {
    const buttonContent = 'Click me!';

    it('renders a `primary` button based on the given action', () => {
      const primaryAction: HeaderProps['primaryAction'] = {
        content: buttonContent,
      };

      const header = mountWithApp(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      expect(header).toContainReactComponent(Button, {
        primary: true,
        children: buttonContent,
      });
    });

    it('renders a regular button based on the given action when primary is set to false', () => {
      const primaryAction: HeaderProps['primaryAction'] = {
        content: buttonContent,
        primary: false,
      };

      const header = mountWithApp(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );

      expect(header).toContainReactComponent(Button, {
        primary: false,
        children: buttonContent,
      });
    });

    it('renders a `ReactNode`', () => {
      const PrimaryAction = () => null;

      const header = mountWithApp(
        <Header {...mockProps} primaryAction={<PrimaryAction />} />,
      );

      expect(header).toContainReactComponent(PrimaryAction);
    });

    it('renders a <Tooltip /> when helpText is provided', () => {
      const primaryAction = {
        content: 'Save',
        helpText: 'Helpful text',
      };
      const header = mountWithApp(
        <Header {...mockProps} primaryAction={primaryAction} />,
      );
      expect(header).toContainReactComponent(Tooltip, {
        content: primaryAction.helpText,
      });
    });
  });

  describe('pagination', () => {
    it('gets passed into Pagination', () => {
      const pagination = {
        hasNext: true,
      };

      const header = mountWithApp(
        <Header {...mockProps} pagination={pagination} />,
      );

      expect(header).toContainReactComponent(Pagination, {
        hasNext: true,
      });
    });
  });

  describe('actionGroups', () => {
    const mockActionGroupsActions: MenuActionDescriptor[] = [
      {content: 'mock content 1'},
      {content: 'mock content 2'},
    ];
    const mockActionGroups: HeaderProps['actionGroups'] = [
      {
        title: 'First group',
        actions: mockActionGroupsActions,
      },
      {
        title: 'Second group',
        actions: mockActionGroupsActions,
      },
    ];

    it('passes to <ActionMenu />', () => {
      const wrapper = mountWithApp(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        groups: mockActionGroups,
      });
    });
  });

  describe('additionalNavigation', () => {
    it('renders element if passed', () => {
      const TestComponent = () => <div />;

      const header = mountWithApp(
        <Header {...mockProps} additionalNavigation={<TestComponent />} />,
      );

      expect(header).toContainReactComponent(TestComponent);
    });
  });

  describe('action menu', () => {
    const mockSecondaryActions: HeaderProps['secondaryActions'] = [
      {content: 'mock content 1'},
    ];
    const CustomSecondaryActions = () => null;

    it('does not render <ActionMenu /> without either `secondaryActions` or `actionGroups`', () => {
      const wrapper = mountWithApp(<Header {...mockProps} />);

      expect(wrapper).not.toContainReactComponent(ActionMenu);
    });

    it('does not render <ActionMenu /> if `actionGroups` has no `actions', () => {
      const mockActionGroups: HeaderProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [],
        },
      ];
      const wrapper = mountWithApp(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper).not.toContainReactComponent(ActionMenu);
    });

    it('does not render <ActionMenu /> if `ReactNode` is provided as `secondaryActions`', () => {
      const wrapper = mountWithApp(
        <Header secondaryActions={<CustomSecondaryActions />} />,
      );

      expect(wrapper).not.toContainReactComponent(ActionMenu);
    });

    it('renders <ActionMenu /> with at least valid `secondaryActions`', () => {
      const mockSecondaryActions: HeaderProps['secondaryActions'] = [
        {content: 'mock content'},
      ];
      const wrapper = mountWithApp(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu);
    });

    it('renders <ActionMenu /> with at least valid `actionGroups`', () => {
      const mockActionGroups: HeaderProps['actionGroups'] = [
        {
          title: 'mock title',
          actions: [{content: 'mock content 1'}],
        },
      ];
      const wrapper = mountWithApp(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu);
    });

    it('renders <ActionMenu /> with `rollup` as `false` when on desktop', () => {
      const wrapper = mountWithApp(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        rollup: false,
      });
    });

    it('renders <ActionMenu /> with `rollup` as `true` when on mobile', () => {
      const wrapper = mountWithApp(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
        {mediaQuery: {isNavigationCollapsed: true}},
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        rollup: true,
      });
    });

    it('renders <CustomSecondaryActions /> if `ReactNode` is provided as `secondaryActions`', () => {
      const wrapper = mountWithApp(
        <Header secondaryActions={<CustomSecondaryActions />} />,
      );

      expect(wrapper).toContainReactComponent(CustomSecondaryActions);
    });

    it('renders <ActionMenu /> passing `onActionRollup` as prop if it exists', () => {
      const onActionRollup = jest.fn();
      const wrapper = mountWithApp(
        <Header
          {...mockProps}
          secondaryActions={mockSecondaryActions}
          onActionRollup={onActionRollup}
        />,
      );

      expect(wrapper).toContainReactComponent(ActionMenu, {
        onActionRollup,
      });
    });
  });

  const primaryAction: HeaderProps['primaryAction'] = {
    content: 'Click me!',
    icon: PlusMinor,
  };

  const secondaryActions: HeaderProps['secondaryActions'] = [
    {content: 'mock content 1'},
    {content: 'mock content 2'},
  ];

  const breadcrumb: LinkAction = {
    content: 'Products',
    url: 'https://www.google.com',
  };

  it('does not render primary and secondary action wrapper divs', () => {
    const header = mountWithApp(
      <Header
        title="Hello, world!"
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      />,
    );
    expect(
      header.findAll('div', {className: 'PrimaryActionWrapper'}),
    ).toHaveLength(1);
  });

  it('renders a compact mobile layout with icon-only primary action', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmm" primaryAction={primaryAction} />,
      {
        mediaQuery: {isNavigationCollapsed: true},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
    expect(header).toContainReactComponent(Button, {
      icon: PlusMinor,
      children: undefined,
    });
  });

  it('renders a compact desktop layout and hides primary action icon', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmm" primaryAction={primaryAction} />,
      {
        mediaQuery: {isNavigationCollapsed: false},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
    expect(header).toContainReactComponent(Button, {
      icon: undefined,
      children: 'Click me!',
    });
  });

  it('renders a default mobile layout', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmmm" backAction={breadcrumb} />,
      {
        mediaQuery: {isNavigationCollapsed: true},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
  });

  it('renders a default desktop layout', () => {
    const header = mountWithApp(
      <Header title="mmmmmmmmmmmmmmmmmmmmm" primaryAction={primaryAction} />,
      {
        mediaQuery: {isNavigationCollapsed: false},
      },
    );
    expect(header.findAll('div', {className: 'Row'})).toHaveLength(1);
  });

  it('wraps the secondary activator and primary buttons in a ButtonGroup', () => {
    const header = mountWithApp(
      <Header
        title="Hello, world!"
        primaryAction={primaryAction}
        secondaryActions={secondaryActions}
      />,
      {
        mediaQuery: {isNavigationCollapsed: true},
      },
    );
    expect(header.findAll(ButtonGroup)).toHaveLength(0);
  });
});
