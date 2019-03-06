import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Image from '../Image';
import styles from './Spinner.scss';
import {spinnerLarge, spinnerSmall} from './images';

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

  return (
    <Image
      alt="Spinner"
      source={spinnerSVG}
      className={className}
      draggable={false}
      role="status"
      aria-label={accessibilityLabel}
    />
  );
}

export default withAppProvider<Props>()(Spinner);
