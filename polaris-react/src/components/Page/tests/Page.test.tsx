import React, {useCallback, useState} from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import type {ActionMenuProps} from '../../ActionMenu';
import type {ActionTooltip} from '../../../types';
import {Badge} from '../../Badge';
import {Card} from '../../Card';
import {Tooltip} from '../../Tooltip';
import {Page, PageProps} from '../Page';
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
      const page = mountWithApp(<Page {...mockProps}>{card}</Page>);
      expect(page).toContainReactComponent(Card);
    });
  });

  describe('title', () => {
    it('renders a <Header /> when defined', () => {
      const title = 'Products';
      const page = mountWithApp(<Page {...mockProps} title={title} />);
      expect(page).toContainReactComponent(Header);
    });

    it('gets passed into the <Header />', () => {
      const title = 'Products';
      const page = mountWithApp(<Page {...mockProps} title={title} />);
      expect(page).toContainReactComponent(Header, {
        title,
      });
    });
  });

  describe('subtitle', () => {
    it('gets passed into the <Header />', () => {
      const subtitle = 'Subtitle';
      const page = mountWithApp(<Page {...mockProps} subtitle={subtitle} />);
      expect(page).toContainReactComponent(Header, {
        subtitle,
      });
    });
  });

  describe('titleMetadata', () => {
    it('gets passed into the <Header />', () => {
      const titleMetadata = <Badge>Sold</Badge>;
      const page = mountWithApp(
        <Page {...mockProps} titleMetadata={titleMetadata} />,
      );
      expect(page).toContainReactComponent(Header, {
        titleMetadata,
      });
    });
  });

  describe('primaryAction', () => {
    it('renders a <Header /> when defined', () => {
      const primaryAction = {
        content: 'Save',
      };
      const page = mountWithApp(
        <Page {...mockProps} primaryAction={primaryAction} />,
      );
      expect(page).toContainReactComponent(Header);
    });

    it('gets passed into the <Header />', () => {
      const primaryAction = {
        content: 'Save',
      };
      const page = mountWithApp(
        <Page {...mockProps} primaryAction={primaryAction} />,
      );
      expect(page).toContainReactComponent(Header, {
        primaryAction,
      });
    });
  });

  describe('secondaryActions', () => {
    it('renders a <Header /> when defined', () => {
      const secondaryActions = [
        {
          content: 'Preview',
        },
      ];
      const page = mountWithApp(
        <Page {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(page).toContainReactComponent(Header);
    });

    it('gets passed into the <Header />', () => {
      const secondaryActions = [
        {
          content: 'Preview',
        },
      ];
      const page = mountWithApp(
        <Page {...mockProps} secondaryActions={secondaryActions} />,
      );
      expect(page).toContainReactComponent(Header, {
        secondaryActions,
      });
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
      const page = mountWithApp(
        <Page {...mockProps} actionGroups={actionGroups} />,
      );
      expect(page).toContainReactComponent(Header);
    });

    it('gets passed into the <Header />', () => {
      const actionGroups = [
        {
          title: 'Preview',
          disabled: true,
          actions: [
            {
              content: 'URL',
            },
          ],
        },
        {
          title: 'More actions',
          actions: [
            {
              content: 'Copy',
            },
          ],
        },
      ];
      const page = mountWithApp(
        <Page {...mockProps} actionGroups={actionGroups} />,
      );
      expect(page).toContainReactComponent(Header, {
        actionGroups,
      });
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
      const page = mountWithApp(
        <Page {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(page).toContainReactComponent(Header);
    });

    it('gets passed into the <Header />', () => {
      const page = mountWithApp(
        <Page {...mockProps} breadcrumbs={breadcrumbs} />,
      );
      expect(page).toContainReactComponent(Header, {
        breadcrumbs,
      });
    });
  });

  describe('divider', () => {
    it('renders border when divider is true and header props exist', () => {
      const wrapper = mountWithApp(<Page {...mockProps} divider />);
      expect(wrapper).toContainReactComponent('div', {
        className: 'divider',
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
        className: 'divider',
      });
    });
  });

  describe('<Header />', () => {
    it('is not rendered when there is no header content', () => {
      const page = mountWithApp(<Page title="" />);
      expect(page).not.toContainReactComponent(Header);
    });
  });

  describe('<Tooltip />', () => {
    const saveTooltip: ActionTooltip = {
      content: 'Save tooltip',
      dismissOnMouseOut: true,
    };

    it('is rendered when available for primary action', () => {
      const page = mountWithApp(
        <Page
          {...mockProps}
          primaryAction={{content: 'Save', tooltip: saveTooltip}}
        />,
      );
      expect(page).toContainReactComponent(Tooltip, saveTooltip);
    });

    it('is rendered when available for secondary actions', () => {
      const page = mountWithApp(
        <Page
          {...mockProps}
          secondaryActions={[{content: 'Save', tooltip: saveTooltip.content}]}
        />,
      );
      expect(page).toContainReactComponent(Tooltip, {
        content: saveTooltip.content,
      });
    });

    it('will NOT be rendered when primary & secondary actions have no tooltip passed', () => {
      const page = mountWithApp(
        <Page
          {...mockProps}
          primaryAction={{content: 'Save'}}
          secondaryActions={[{content: 'Load'}]}
        />,
      );

      expect(page).not.toContainReactComponent(Tooltip);
    });
  });
});

function noop() {}
