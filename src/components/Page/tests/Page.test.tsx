import * as React from 'react';
import {TitleBar, Button} from '@shopify/app-bridge/actions';
import {shallowWithAppProvider, mountWithAppProvider} from 'tests/utilities';
import {noop} from '../../../utilities/other';
import {LinkAction} from '../../../types';
import {Header} from '../components';
import Page from '../Page';

jest.mock('../../../utilities/app-bridge-transformers', () => ({
  ...require.requireActual('../../../utilities/app-bridge-transformers'),
  generateRedirect: jest.fn((...args) => args),
  transformActions: jest.fn((...args) => args),
}));

const breadcrumbs: LinkAction[] = [
  {
    content: 'Products',
    url: 'https://www.google.com',
    target: 'REMOTE',
  },
];

describe('<Page />', () => {
  describe('<Header />', () => {
    it('is passed breadcrumbs', () => {
      const page = shallowWithAppProvider(
        <Page title="Test" breadcrumbs={breadcrumbs} />,
      );
      expect(page.find(Header).prop('breadcrumbs')).toBe(breadcrumbs);
    });

    it('is not rendered when there is no header content', () => {
      const page = shallowWithAppProvider(<Page title="" />);
      expect(page.find(Header).exists()).toBe(false);
    });
  });

  describe('with appBridge', () => {
    const titleBarMock = {
      set: jest.fn(),
      unsubscribe: jest.fn(),
    };

    const buttonMock = {
      set: jest.fn(),
      subscribe: jest.fn(),
    };

    TitleBar.create = jest.fn().mockReturnValue(titleBarMock);
    Button.create = jest.fn().mockReturnValue(buttonMock);

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('creates a title bar', () => {
      const primaryAction = {
        content: 'Foo',
      };
      const secondaryActions = [{content: 'Bar'}];
      const actionGroups = [
        {
          title: 'Baz',
          actions: [{content: 'Qux'}],
        },
      ];

      const {polaris} = mountWithAppBridge(
        <Page
          title="Test"
          primaryAction={primaryAction}
          secondaryActions={secondaryActions}
          actionGroups={actionGroups}
        />,
      );

      expect(TitleBar.create).toHaveBeenCalledTimes(1);
      expect(TitleBar.create).toHaveBeenCalledWith(polaris.appBridge, {
        title: 'Test',
        buttons: [
          polaris.appBridge,
          {primaryAction, secondaryActions, actionGroups},
        ],
        breadcrumbs: undefined,
      });
    });

    it('subscribes a redirect callback for breadcrumbs', () => {
      const {polaris} = mountWithAppBridge(
        <Page title="Test" breadcrumbs={breadcrumbs} />,
      );

      expect(buttonMock.subscribe).toHaveBeenCalledTimes(1);
      expect(buttonMock.subscribe).toHaveBeenCalledWith(Button.Action.CLICK, [
        polaris.appBridge,
        breadcrumbs[0].url,
        breadcrumbs[0].target,
      ]);
    });

    it('subscribes an action callback for breadcrumbs', () => {
      mountWithAppBridge(
        <Page
          title="Test"
          breadcrumbs={[
            {
              onAction: noop,
            },
          ]}
        />,
      );

      expect(buttonMock.subscribe).toHaveBeenCalledTimes(1);
      expect(buttonMock.subscribe).toHaveBeenCalledWith(
        Button.Action.CLICK,
        noop,
      );
    });

    it('updates only when props change', () => {
      const {page} = mountWithAppBridge(<Page title="Title" />);

      page.setProps({title: 'Title'});
      expect(titleBarMock.set).toHaveBeenCalledTimes(0);
      page.setProps({title: 'New Title'});
      expect(titleBarMock.set).toHaveBeenCalledTimes(1);
    });

    it('unsubscribes when unmounted', () => {
      const {page} = mountWithAppBridge(<Page title="" />);

      page.unmount();
      expect(titleBarMock.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});

function mountWithAppBridge(element: React.ReactElement<any>) {
  const appBridge = {};
  const polaris = {appBridge};
  const page = mountWithAppProvider(element, {
    context: {polaris},
  });

  return {page, polaris};
}
