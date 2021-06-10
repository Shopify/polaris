import React, {useCallback, useState} from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider} from 'test-utilities/legacy';
import {
  Page,
  PageProps,
  Card,
  Avatar,
  Badge,
  ActionMenuProps,
} from 'components';
import {mountWithApp} from 'test-utilities';

import {Header} from '../components';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: window.innerWidth <= 769,
      addListener() {},
      removeListener() {},
    };
  };

describe('<Page />', () => {
  const mockProps: PageProps = {
    title: 'Test',
  };

  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
  });

  describe('children', () => {
    it('renders its children', () => {
      const card = <Card />;
      const page = mountWithAppProvider(<Page {...mockProps}>{card}</Page>);
      expect(page.contains(card)).toBeTruthy();
    });
  });

  describe('title', () => {
    it('renders a <Header /> when defined', () => {
      const title = 'Products';
      const page = mountWithAppProvider(<Page {...mockProps} title={title} />);
      expect(page.find(Header).exists()).toBeTruthy();
    });

    it('gets passed into the <Header />', () => {
      const title = 'Products';
      const page = mountWithAppProvider(<Page {...mockProps} title={title} />);
      expect(page.find(Header).prop('title')).toBe(title);
    });
  });

  describe('subtitle', () => {
    it('gets passed into the <Header />', () => {
      const subtitle = 'Subtitle';
      const page = mountWithAppProvider(
        <Page {...mockProps} subtitle={subtitle} />,
      );
      expect(page.find(Header).prop('subtitle')).toBe(subtitle);
    });
  });

  describe('titleMetadata', () => {
    it('gets passed into the <Header />', () => {
      const titleMetadata = <Badge>Sold</Badge>;
      const page = mountWithAppProvider(
        <Page {...mockProps} titleMetadata={titleMetadata} />,
      );
      expect(page.find(Header).prop('titleMetadata')).toBe(titleMetadata);
    });
  });

  describe('thumbnail', () => {
    it('gets passed into the <Header />', () => {
      const thumbnail = <Avatar customer />;
      const page = mountWithAppProvider(
        <Page {...mockProps} thumbnail={thumbnail} />,
      );
      expect(page.find(Header).prop('thumbnail')).toBe(thumbnail);
    });
  });

  describe('primaryAction', () => {
    it('renders a <Header /> when defined', () => {
      const primaryAction = {
        content: 'Save',
      };
      const page = mountWithAppProvider(
        <Page {...mockProps} primaryAction={primaryAction} />,
      );
      expect(page.find(Header).exists()).toBeTruthy();
    });

    it('gets passed into the <Header />', () => {
      const primaryAction = {
        content: 'Save',
      };
      const page = mountWithAppProvider(
        <Page {...mockProps} primaryAction={primaryAction} />,
      );
      expect(page.find(Header).prop('primaryAction')).toBe(primaryAction);
    });
  });

  describe('secondaryActions', () => {
    it('renders a <Header /> when defined', () => {
      const secondaryActions = [
        {
          content: 'Preview',
        },
      ];
      const page = mountWithAppProvider(
        <Page {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(page.find(Header).exists()).toBeTruthy();
    });

    it('gets passed into the <Header />', () => {
      const secondaryActions = [
        {
          content: 'Preview',
        },
      ];
      const page = mountWithAppProvider(
        <Page {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(page.find(Header).prop('secondaryActions')).toBe(secondaryActions);
    });

    it('re-renders secondaryActions when they change', () => {
      function PageWithSecondaryActionsToggle() {
        const initialActions: ActionMenuProps['actions'] = [
          {content: 'initial'},
        ];

        const [groups, setGroups] = useState(initialActions);
        const handleActivatorClick = useCallback(
          () => setGroups([{content: 'updated'}]),
          [],
        );

        return (
          <>
            <button onClick={handleActivatorClick}>Activator</button>
            <Page secondaryActions={groups} />
          </>
        );
      }

      const wrapper = mountWithApp(<PageWithSecondaryActionsToggle />);

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper).toContainReactComponent(Page, {
        secondaryActions: [{content: 'updated'}],
      });
    });

    it('re-renders actionGroups when they change', () => {
      function PageWithActionsGroupsToggle() {
        const initialGroups: ActionMenuProps['groups'] = [
          {title: 'initial', actions: [{content: 'initial'}]},
        ];

        const [groups, setGroups] = useState(initialGroups);
        const handleActivatorClick = useCallback(
          () =>
            setGroups([{title: 'updated', actions: [{content: 'updated'}]}]),
          [],
        );

        return (
          <>
            <button onClick={handleActivatorClick}>Activator</button>
            <Page actionGroups={groups} />
          </>
        );
      }

      const wrapper = mountWithApp(<PageWithActionsGroupsToggle />);

      wrapper.find('button')!.trigger('onClick');
      expect(wrapper).toContainReactComponent(Page, {
        actionGroups: [{title: 'updated', actions: [{content: 'updated'}]}],
      });
    });
  });

  describe('actionGroups', () => {
    it('renders a <Header /> when defined', () => {
      const actionGroups = [
        {
          title: 'Preview',
          actions: [
            {
              content: 'URL',
            },
          ],
        },
      ];
      const page = mountWithAppProvider(
        <Page {...mockProps} actionGroups={actionGroups} />,
      );
      expect(page.find(Header).exists()).toBeTruthy();
    });

    it('gets passed into the <Header />', () => {
      const actionGroups = [
        {
          title: 'Preview',
          actions: [
            {
              content: 'URL',
            },
          ],
        },
      ];
      const page = mountWithAppProvider(
        <Page {...mockProps} actionGroups={actionGroups} />,
      );
      expect(page.find(Header).prop('actionGroups')).toBe(actionGroups);
    });
  });

  describe('breadcrumbs', () => {
    const breadcrumbs = [
      {
        content: 'Products',
        onAction: noop,
      },
    ];

    it('renders a <Header /> when defined', () => {
      const page = mountWithAppProvider(
        <Page {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(page.find(Header).exists()).toBeTruthy();
    });

    it('gets passed into the <Header />', () => {
      const page = mountWithAppProvider(
        <Page {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(page.find(Header).prop('breadcrumbs')).toStrictEqual(breadcrumbs);
    });
  });

  describe('divider', () => {
    it('renders border when divider is true and header props exist', () => {
      const wrapper = mountWithApp(<Page {...mockProps} divider />);
      expect(wrapper).toContainReactComponent('div', {
        className: 'Content divider',
      });
    });

    it('does not render border when divider is true and no header props exist', () => {
      const wrapper = mountWithApp(<Page divider />);
      expect(wrapper).not.toContainReactComponent('div', {
        className: 'Content divider',
      });
      expect(wrapper).toContainReactComponent('div', {
        className: 'Content',
      });
    });

    it('does not render border when divider is false', () => {
      const wrapper = mountWithApp(<Page {...mockProps} divider={false} />);
      expect(wrapper).not.toContainReactComponent('div', {
        className: 'Content divider',
      });
      expect(wrapper).toContainReactComponent('div', {
        className: 'Content',
      });
    });
  });

  describe('<Header />', () => {
    it('is not rendered when there is no header content', () => {
      const page = mountWithAppProvider(<Page title="" />);
      expect(page.find(Header).exists()).toBeFalsy();
    });
  });
});

function noop() {}
