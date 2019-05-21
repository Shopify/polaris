import * as React from 'react';
import StickyManager from '../../StickyManager';
import ScrollLockManager from '../../ScrollLockManager';
import createPolarisContext from '../createPolarisContext';

jest.mock('../../Intl', () => ({
  default: jest.fn(),
  __esModule: true,
}));

jest.mock('../../Link', () => ({
  default: jest.fn(),
  __esModule: true,
}));

describe('createPolarisContext()', () => {
  const Intl: jest.Mock<{}> = require.requireMock('../../Intl').default;
  const Link: jest.Mock<{}> = require.requireMock('../../Link').default;

  afterEach(() => {
    Intl.mockReset();
    Link.mockReset();
  });
  it('returns the right context without arguments', () => {
    const context = createPolarisContext();

    expect(context).toMatchObject({
      intl: expect.any(Intl),
      link: expect.any(Link),
      stickyManager: expect.any(StickyManager),
      scrollLockManager: expect.any(ScrollLockManager),
      appBridge: undefined,
      theme: {
        logo: null,
      },
    });
  });

  it('returns the right context with app provider and theme provider context provided', () => {
    const i18n = {
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
    const scrollLockManager = new ScrollLockManager();
    const contextOne = createPolarisContext(
      {
        i18n,
        linkComponent: CustomLinkComponent,
        stickyManager,
      },
      {
        logo: null,
      },
    );
    const contextTwo = createPolarisContext(
      {
        logo: null,
      },
      {
        i18n,
        linkComponent: CustomLinkComponent,
        stickyManager,
      },
    );
    const mockContext = {
      intl: new Intl(i18n),
      link: new Link(CustomLinkComponent),
      stickyManager,
      scrollLockManager,
      appBridge: undefined,
      theme: {
        logo: null,
      },
    };

    expect(contextOne).toStrictEqual(mockContext);
    expect(contextTwo).toStrictEqual(mockContext);
  });

  it('returns the right context with only app provider context being provided', () => {
    const i18n = {
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
    const scrollLockManager = new ScrollLockManager();
    const context = createPolarisContext({
      i18n,
      linkComponent: CustomLinkComponent,
      stickyManager,
    });
    const mockContext = {
      intl: new Intl(i18n),
      link: new Link(CustomLinkComponent),
      stickyManager,
      scrollLockManager,
      appBridge: undefined,
      theme: {
        logo: null,
      },
    };

    expect(context).toStrictEqual(mockContext);
  });

  it('returns the right context with only theme provider context being provided', () => {
    const context = createPolarisContext({
      logo: null,
    });

    expect(context).toMatchObject({
      intl: expect.any(Intl),
      link: expect.any(Link),
      stickyManager: expect.any(StickyManager),
      scrollLockManager: expect.any(ScrollLockManager),
      appBridge: undefined,
      theme: {
        logo: null,
      },
    });
  });
});
