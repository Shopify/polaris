import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './Spinner.scss';
import spinnerSVGLarge from './icons/spinner-large.svg';
import spinnerSVGSmall from './icons/spinner-small.svg';

export type Color = 'white' | 'teal' | 'inkLightest';

export type Size = 'small' | 'large';

const COLORS_FOR_LARGE_SPINNER = ['teal', 'inkLightest'];

export interface Props {
  size?: Size,
  color?: Color,
  accessibilityLabel?: string,
}

export default function Spinner({
  size = 'large',
  color = 'teal',
  accessibilityLabel,
}: Props) {

  if (process.env.NODE_ENV === 'development') {
    if (size === 'large' && COLORS_FOR_LARGE_SPINNER.indexOf(color) < 0) {
      // tslint:disable-next-line no-console
      console.warn(`The color ${color} is not meant to be used on ${size} spinners. The colors available on large spinners are: ${COLORS_FOR_LARGE_SPINNER.join(', ')}`);
      size = 'small';
    }
  }

  const className = classNames(
    styles.Spinner,
    color && styles[variationName('color', color)],
    size && styles[variationName('size', size)],
  );

  const spinnerSVG = size === 'large'
    ? spinnerSVGLarge
    : spinnerSVGSmall;

  return (
      <svg
        viewBox={spinnerSVG.viewBox}
        dangerouslySetInnerHTML={{__html: spinnerSVG.body}}
        className={className}
        aria-label={accessibilityLabel}
        role="status"
      />
  );
}
