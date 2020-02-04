import React from 'react';
import {classNames, variationName} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {Image} from '../Image';
import {VisuallyHidden} from '../VisuallyHidden';
import {useIsAfterInitialMount} from '../../utilities/use-is-after-initial-mount';
import styles from './Spinner.scss';
import {spinnerLarge, spinnerSmall} from './images';

type Color = 'white' | 'teal' | 'inkLightest';

type Size = 'small' | 'large';

const COLORS_FOR_LARGE_SPINNER = ['teal', 'inkLightest'];

export interface SpinnerProps {
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
  /** Allows the component to apply the correct accessibility roles based on focus */
  hasFocusableParent?: boolean;
}

export function Spinner({
  size = 'large',
  color = 'teal',
  accessibilityLabel,
  hasFocusableParent,
}: SpinnerProps) {
  const i18n = useI18n();
  const isAfterInitialMount = useIsAfterInitialMount();

  if (size === 'large' && !COLORS_FOR_LARGE_SPINNER.includes(color)) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        i18n.translate('Polaris.Spinner.warningMessage', {
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

  const spanAttributes = {
    ...(!hasFocusableParent && {role: 'status'}),
  };

  const accessibilityLabelMarkup = (isAfterInitialMount ||
    !hasFocusableParent) && (
    <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
  );

  return (
    <React.Fragment>
      <Image
        alt=""
        source={spinnerSVG}
        className={className}
        draggable={false}
      />
      <span {...spanAttributes}>{accessibilityLabelMarkup}</span>
    </React.Fragment>
  );
}
