import * as React from 'react';
import {animationFrame} from '@shopify/jest-dom-mocks';
import {mountWithAppProvider} from 'test-utilities';

import {
  Breadcrumbs,
  buttonsFrom,
  EventListener,
  Pagination,
  Menu,
} from 'components';

import {LinkAction} from '../../../../../types';

import Header, {Props} from '../Header';
import {HeaderPrimaryAction} from '../types';

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

describe('<Header />', () => {
  const mockProps: Props = {
    title: 'mock title',
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

    it('passes to <Menu />', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(Menu).prop('actions')).toBe(mockSecondaryActions);
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

    it('passes to <Menu />', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} actionGroups={mockActionGroups} />,
      );

      expect(wrapper.find(Menu).prop('groups')).toBe(mockActionGroups);
    });
  });

  describe('<Menu />', () => {
    const mockSecondaryActions: Props['secondaryActions'] = [
      {content: 'mock content 1'},
    ];

    it('renders with `rollup` as `false` when on desktop', () => {
      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(Menu).prop('rollup')).toBe(false);
    });

    it('renders with `rollup` as `true` when on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: 500,
      });

      const wrapper = mountWithAppProvider(
        <Header {...mockProps} secondaryActions={mockSecondaryActions} />,
      );

      expect(wrapper.find(Menu).prop('rollup')).toBe(true);
    });
  });
});
