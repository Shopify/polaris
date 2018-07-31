import * as React from 'react';
import tokens from '@shopify/polaris-tokens';

import {documentHasStyle} from '../../../../tests/utilities';
import {
  translate,
  createPolarisContext,
  setTextColor,
  setTheme,
} from '../utils';
import {
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
} from '../types';

import Intl from '../Intl';
import Link from '../Link';
import StickyManager from '../StickyManager';

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

describe('createPolarisContext()', () => {
  it('returns the right context without properties', () => {
    const context = createPolarisContext();
    const mockContext = {
      polaris: {
        intl: new Intl(undefined),
        link: new Link(),
        stickyManager: new StickyManager(),
        theme: {
          logo: null,
        },
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
        theme: {
          logo: null,
        },
      },
    };

    expect(context).toEqual(mockContext);
  });
});

describe('setTextColor', () => {
  it('sets a css variable to white if the variant is dark', () => {
    setTextColor('topBar', 'dark');
    expect(documentHasStyle('topBar', tokens.colorWhiteBase)).toBe(true);
  });

  it('sets a css variable to ink if the variant is light', () => {
    setTextColor('topBar', 'light');
    expect(documentHasStyle('topBar', tokens.colorInkBase)).toBe(true);
  });
});

describe('setTheme', () => {
  it('sets a base theme', () => {
    setTheme(
      {hue: 184, saturation: 100, lightness: 28},
      'topBar',
      'background',
      'dark',
    );
    // document will have the variables in pascal case
    expect(
      documentHasStyle('TopBarBackgroundDarker', 'hsl(184, 110%, 19%, 1)'),
    ).toBe(true);
    expect(
      documentHasStyle('TopBarBackgroundLighter', 'hsl(184, 70%, 42%, 1)'),
    ).toBe(true);
    expect(documentHasStyle('TopBarColor', 'rgb(255, 255, 255)')).toBe(true);
  });
});
