import * as React from 'react';
import {noop} from '@shopify/javascript-utilities/other';
import {
  translate,
  createAppProviderContext,
  createPolarisContext,
} from '../utils';

import {
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
} from '../types';

import Intl from '../Intl';
import Link from '../Link';
import StickyManager from '../StickyManager';
import ScrollLockManager from '../ScrollLockManager';

describe('translate()', () => {
  it('returns a simple string value in the translation dictionary', () => {
    expect(translate('foo', {foo: 'bar'})).toBe('bar');
  });

  it('returns a nested string value in the translation dictionary', () => {
    expect(translate('foo.bar.baz', {foo: {bar: {baz: 'qux'}}})).toBe('qux');
  });

  it('returns an empty string when no match is found', () => {
    expect(translate('foo.bar.baz', {foo: {bar: 'baz'}})).toBe('');
  });

  describe('replacements', () => {
    function translateWithReplacements(
      id: string,
      replacements:
        | PrimitiveReplacementDictionary
        | ComplexReplacementDictionary,
    ) {
      return translate('value', {value: id}, replacements);
    }

    it('uses replacements', () => {
      expect(translateWithReplacements('foo {next}', {next: 'bar'})).toBe(
        'foo bar',
      );
    });

    it('throws an error for a missing replacement', () => {
      expect(() =>
        translateWithReplacements('foo {next}', {notNext: 'bar'}),
      ).toThrow();
    });
  });
});

describe('createAppProviderContext()', () => {
  it('returns the right context without properties', () => {
    const context = createAppProviderContext();
    const mockContext = {
      polaris: {
        intl: new Intl(undefined),
        link: new Link(),
        stickyManager: new StickyManager(),
        scrollLockManager: new ScrollLockManager(),
        subscribe: noop,
        unsubscribe: noop,
      },
      easdk: undefined,
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with properties', () => {
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
    const context = createAppProviderContext({
      i18n,
      linkComponent: CustomLinkComponent,
      stickyManager,
      scrollLockManager,
    });
    const mockContext = {
      polaris: {
        intl: new Intl(i18n),
        link: new Link(CustomLinkComponent),
        stickyManager,
        scrollLockManager,
        subscribe: noop,
        unsubscribe: noop,
      },
      easdk: undefined,
    };

    expect(context).toEqual(mockContext);
  });
});

describe('createPolarisContext()', () => {
  it('returns the right context without arguments', () => {
    const context = createPolarisContext();
    const mockContext = {
      polaris: {
        intl: new Intl(undefined),
        link: new Link(),
        stickyManager: new StickyManager(),
        scrollLockManager: new ScrollLockManager(),
        subscribe: noop,
        unsubscribe: noop,
      },
      easdk: undefined,
      theme: {
        logo: null,
        subscribe: noop,
        unsubscribe: noop,
      },
    };

    expect(context).toEqual(mockContext);
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
    const mockSubscribe = (fn: () => void) =>
      ([] as Array<() => void>).push(fn);
    const mockUnsubscribe = (fn: () => void) => [].filter((f: any) => f !== fn);
    const contextOne = createPolarisContext(
      {
        i18n,
        linkComponent: CustomLinkComponent,
        stickyManager,
      },
      {
        logo: null,
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
      },
    );
    const contextTwo = createPolarisContext(
      {
        logo: null,
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
      },
      {
        i18n,
        linkComponent: CustomLinkComponent,
        stickyManager,
      },
    );
    const mockContext = {
      polaris: {
        intl: new Intl(i18n),
        link: new Link(CustomLinkComponent),
        stickyManager,
        scrollLockManager,
        subscribe: noop,
        unsubscribe: noop,
      },
      easdk: undefined,
      theme: {
        logo: null,
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
      },
    };

    expect(contextOne).toEqual(mockContext);
    expect(contextTwo).toEqual(mockContext);
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
      polaris: {
        intl: new Intl(i18n),
        link: new Link(CustomLinkComponent),
        stickyManager,
        scrollLockManager,
        subscribe: noop,
        unsubscribe: noop,
      },
      easdk: undefined,
      theme: {
        logo: null,
        subscribe: noop,
        unsubscribe: noop,
      },
    };

    expect(context).toEqual(mockContext);
  });

  it('returns the right context with only theme provider context being provided', () => {
    const mockSubscribe = (fn: () => void) =>
      ([] as Array<() => void>).push(fn);
    const mockUnsubscribe = (fn: () => void) => [].filter((f: any) => f !== fn);
    const context = createPolarisContext({
      logo: null,
      subscribe: mockSubscribe,
      unsubscribe: mockUnsubscribe,
    });

    const mockContext = {
      polaris: {
        intl: new Intl(undefined),
        link: new Link(),
        stickyManager: new StickyManager(),
        scrollLockManager: new ScrollLockManager(),
        subscribe: noop,
        unsubscribe: noop,
      },
      easdk: undefined,
      theme: {
        logo: null,
        subscribe: mockSubscribe,
        unsubscribe: mockUnsubscribe,
      },
    };

    expect(context).toEqual(mockContext);
  });
});
