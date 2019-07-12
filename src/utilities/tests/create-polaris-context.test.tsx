import React from 'react';
import {StickyManager} from 'utilities/sticky-manager';
import {ScrollLockManager} from 'utilities/scroll-lock-manager';
import {createPolarisContext} from '../create-polaris-context';

jest.mock('../i18n', () => ({
  I18n: jest.fn(),
  __esModule: true,
}));

jest.mock('../link', () => ({
  Link: jest.fn(),
  __esModule: true,
}));

describe('createPolarisContext()', () => {
  const I18n: jest.Mock<{}> = require.requireMock('../i18n').I18n;
  const Link: jest.Mock<{}> = require.requireMock('../link').Link;

  afterEach(() => {
    I18n.mockReset();
    Link.mockReset();
  });

  it('generates default context', () => {
    const context = createPolarisContext();

    expect(context).toMatchObject({
      intl: expect.any(I18n),
      link: expect.any(Link),
      stickyManager: expect.any(StickyManager),
      scrollLockManager: expect.any(ScrollLockManager),
      appBridge: undefined,
      theme: {
        logo: null,
      },
    });
  });

  it('generates context from provided values', () => {
    const i18nContext = {
      Polaris: {
        Common: {
          undo: 'Custom Undo',
        },
      },
    };
    const CustomLinkComponent = () => {
      return <a href="test">Custom Link Component</a>;
    };
    const stickyManager = new StickyManager();
    Object.defineProperties(stickyManager, {
      handleResize: {
        value: expect.any(Function),
      },
      handleScroll: {
        value: expect.any(Function),
      },
    });

    const scrollLockManager = new ScrollLockManager();

    const themeContext = {
      logo: {
        topBarSource: 'logo',
      },
    };

    const context = createPolarisContext({
      i18n: i18nContext,
      themeProvider: themeContext,
      link: CustomLinkComponent,
    });

    expect(context).toStrictEqual({
      intl: new I18n(i18nContext),
      link: new Link(CustomLinkComponent),
      stickyManager,
      scrollLockManager,
      appBridge: undefined,
      theme: {
        logo: {
          topBarSource: 'logo',
        },
      },
    });
  });
});
