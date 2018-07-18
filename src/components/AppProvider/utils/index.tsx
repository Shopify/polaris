import * as React from 'react';
import get from 'lodash/get';
import merge from 'lodash/merge';
import replace from 'lodash/replace';
import hoistStatics from 'hoist-non-react-statics';
import tokens from '@shopify/polaris-tokens';
import {needsVariantList} from '../config';
import {HSLColor} from '../../ColorPicker/types';
import {
  colorToHsla,
  hslToString,
  hslToRgb,
} from '../../../utilities/color-transformers';
import {isLight} from '../../../utilities/color-validation';
import {constructColorName} from '../../../utilities/color-names';
import {
  createDarkColor,
  createLightColor,
} from '../../../utilities/color-manipulation';
import {compose} from '../../../utilities/compose';
import {setRootProperty} from '../../../utilities/setRootProperty';

import {
  polarisAppProviderContextTypes,
  TranslationDictionary,
  PrimitiveReplacementDictionary,
  ComplexReplacementDictionary,
  WithAppProviderProps,
  CreatePolarisContext,
  Theme,
  ColorsToParse,
} from '../types';

import Intl from '../Intl';
import Link from '../Link';
import {Context} from '../AppProvider';
import EASDK from '../EASDK';
import StickyManager from '../StickyManager';

import packageJSON from '../../../../package.json';

const METADATA = {
  interface: {
    name: packageJSON.name,
    version: packageJSON.version,
  },
};

const REPLACE_REGEX = /{([^}]*)}/g;

export function translate(
  id: string,
  translations: TranslationDictionary | TranslationDictionary[] | undefined,
  replacements?: PrimitiveReplacementDictionary | ComplexReplacementDictionary,
) {
  const text = get(translations, id) as string;

  if (!text) {
    return '';
  }

  if (replacements) {
    return replace(text, REPLACE_REGEX, (match: string) => {
      const replacement: string = match.substring(1, match.length - 1);

      if (!replacements.hasOwnProperty(replacement)) {
        throw new Error(
          `No replacement found for key '${replacement}'. The following replacements were passed: ${Object.keys(
            replacements,
          )
            .map((key) => `'${key}'`)
            .join(', ')}`,
        );
      }

      return replacements[replacement] as string;
    });
  }

  return text;
}

export function withAppProvider<OwnProps>() {
  return function addProvider<C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithAppProviderProps> & C
      | React.SFC<OwnProps & WithAppProviderProps> & C,
  ): React.ComponentClass<OwnProps> & C {
    // eslint-disable-next-line react/prefer-stateless-function
    class WithProvider extends React.Component<OwnProps, never> {
      static contextTypes = WrappedComponent.contextTypes
        ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
        : polarisAppProviderContextTypes;

      render() {
        const {polaris, easdk} = this.context;
        const polarisContext = {...polaris, easdk};

        if (!polaris) {
          throw new Error(
            `The <AppProvider> component is required as of v2.0 of Polaris React. See
            https://polaris.shopify.com/components/structure/app-provider for implementation
            instructions.`,
          );
        }

        return <WrappedComponent {...this.props} polaris={polarisContext} />;
      }
    }

    const FinalComponent = hoistStatics(
      WithProvider,
      WrappedComponent as React.ComponentClass<any>,
    );
    return FinalComponent as React.ComponentClass<OwnProps> & C;
  };
}

export function withSticky() {
  return function addStickyManager<OwnProps, C>(
    WrappedComponent:
      | React.ComponentClass<OwnProps & WithAppProviderProps> & C
      | React.SFC<OwnProps & WithAppProviderProps> & C,
  ): any & C {
    class WithStickyManager extends React.Component<
      {},
      OwnProps & WithAppProviderProps
    > {
      static childContextTypes = polarisAppProviderContextTypes;
      static contextTypes = WrappedComponent.contextTypes
        ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
        : polarisAppProviderContextTypes;

      private stickyManager: StickyManager = new StickyManager();
      private polarisContext: any;

      constructor(props: OwnProps & WithAppProviderProps, context: Context) {
        super(props);
        const {polaris, easdk} = context;
        this.polarisContext = {
          ...polaris,
          stickyManager: this.stickyManager,
          easdk,
        };
      }

      getChildContext(): Context {
        const {easdk, ...rest} = this.polarisContext;
        return {
          polaris: rest,
          easdk,
        };
      }

      render() {
        return (
          <WrappedComponent {...this.props} polaris={this.polarisContext} />
        );
      }
    }

    const FinalComponent = hoistStatics(
      WithStickyManager,
      WrappedComponent as React.ComponentClass<any>,
    );
    return FinalComponent as React.ComponentClass<any> & C;
  };
}

export function createPolarisContext({
  i18n,
  linkComponent,
  apiKey,
  shopOrigin,
  forceRedirect,
  debug,
  stickyManager,
  theme = {logo: null},
}: CreatePolarisContext = {}): Context {
  const intl = new Intl(i18n);
  const link = new Link(linkComponent);
  const easdk =
    apiKey && shopOrigin
      ? new EASDK(
          {
            apiKey,
            shopOrigin,
            forceRedirect,
            debug,
          },
          METADATA,
        )
      : undefined;

  const {logo} = theme;

  return {
    polaris: {
      intl,
      link,
      stickyManager: stickyManager || new StickyManager(),
      theme: {
        logo,
      },
    },
    easdk,
  };
}

export function setColors(theme: Theme | undefined) {
  if (theme && theme.colors) {
    Object.entries(theme.colors).forEach((color) => {
      parseColors(color);
    });
  }
}

function needsVariant(name: string) {
  return needsVariantList.indexOf(name) !== -1;
}

const darkenToString: (
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) => string = compose(
  hslToString,
  createDarkColor,
);

const lightenToString: (
  color: HSLColor | string,
  lightness: number,
  saturation: number,
) => string = compose(
  hslToString,
  createLightColor,
);

function setTextColor(name: string, color: string | HSLColor) {
  if (typeof color === 'string') {
    return;
  }

  const rgbColor = hslToRgb(color);

  if (isLight(rgbColor)) {
    setRootProperty(name, tokens.colorInkBase);
    return;
  }

  setRootProperty(name, tokens.colorSkyLighter);
}

function parseColors([baseName, colors]: [string, ColorsToParse]) {
  const keys = Object.keys(colors);
  for (let i = 0; i < keys.length; i++) {
    setRootProperty(constructColorName(baseName, keys[i]), colors[keys[i]]);

    if (needsVariant(baseName)) {
      const hslColor = colorToHsla(colors[keys[i]]);

      setTextColor(constructColorName(baseName, null, 'color'), hslColor);

      setRootProperty(
        constructColorName(baseName, keys[i], 'darker'),
        darkenToString(hslColor, 9, 10),
      );

      setRootProperty(
        constructColorName(baseName, keys[i], 'lighter'),
        lightenToString(hslColor, 14, 30),
      );
    }
  }
}
