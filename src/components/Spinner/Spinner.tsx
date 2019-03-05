import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import styles from './Spinner.scss';
import {spinnerLarge, spinnerSmall} from './icons';

export type Color = 'white' | 'teal' | 'inkLightest';

export type Size = 'small' | 'large';

const COLORS_FOR_LARGE_SPINNER = ['teal', 'inkLightest'];

export interface Props {
  /**
   * Color of spinner
   * @default 'teal'
   */
  color?: Color;
  /**
   * Size of spinner
   * @default 'large'
   */
  size?: Size;
  /** Accessible label for the spinner */
  accessibilityLabel?: string;
}

export type CombinedProps = Props & WithAppProviderProps;

function Spinner({
  size = 'large',
  color = 'teal',
  accessibilityLabel,
  polaris: {intl},
}: CombinedProps) {
  if (size === 'large' && COLORS_FOR_LARGE_SPINNER.indexOf(color) < 0) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        intl.translate('Polaris.Spinner.warningMessage', {
          color,
          size,
          colors: COLORS_FOR_LARGE_SPINNER.join(', '),
        }),
      );
    }

    // eslint-disable-next-line no-param-reassign
    size = 'small';
  }

  const className = classNames(
    styles.Spinner,
    color && styles[variationName('color', color)],
    size && styles[variationName('size', size)],
  );

  const spinnerSVG = size === 'large' ? spinnerLarge : spinnerSmall;

  /*  FIXME
      The following is a weird hack to deal with the way we compile polaris.
      The polaris library compiles itself into a single bundle, "index.js", and uploads it to npm.
      sewing-kit ignores that bundle and recompiles polaris to get a few performance benefits.
      The problem here is that the library uses one SVG loader, SVGR, and  sewing-kit uses a custom loader.
      These loaders output diferent formats: SVGR outputs React Components, and the other loader outputs a custom object.
      The way we deal with it is by checking what kind of object we're dealing with, and rendering it differently.
      This is hacky, we should remove it and unify the builds */
  let spinnerElement;

  if (typeof spinnerSVG === 'function') {
    const SpinnerComponent = spinnerSVG;
    spinnerElement = (
      <SpinnerComponent
        className={className}
        aria-label={accessibilityLabel}
        role="status"
      />
    );
  } else {
    spinnerElement = (
      <svg
        viewBox={spinnerSVG.viewBox}
        dangerouslySetInnerHTML={{__html: spinnerSVG.body}}
        className={className}
        aria-label={accessibilityLabel}
        role="status"
      />
    );
  }

  return spinnerElement;
}

export default withAppProvider<Props>()(Spinner);
