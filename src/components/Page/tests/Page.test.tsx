import React from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from 'test-utilities/legacy';
import {Page, PageProps, Card, Avatar, Badge} from 'components';
import {Header} from '../components';

window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: window.innerWidth <= 769,
      addListener() {},
      removeListener() {},
    };
  };

const defaultWindowWidth = window.innerWidth;

describe('<Page />', () => {
  const mockProps: PageProps = {
    title: 'Test',
  };

  beforeEach(() => {
    animationFrame.mock();
  });

  afterEach(() => {
    animationFrame.restore();
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: defaultWindowWidth,
    });
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

  describe('<Header />', () => {
    it('is not rendered when there is no header content', () => {
      const page = mountWithAppProvider(<Page title="" />);
      expect(page.find(Header).exists()).toBeFalsy();
    });
  });
});

function noop() {}
