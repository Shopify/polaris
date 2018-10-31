import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import Image from '../Image';

import * as styles from './Avatar.scss';
import * as avatars from './images';

export type Size = 'small' | 'medium' | 'large';

const STYLE_CLASSES = ['one', 'two', 'three', 'four', 'five', 'six'];
const AVATAR_IMAGES = Object.keys(avatars).map(
  // import/namespace does not allow computed values by default
  // eslint-disable-next-line import/namespace
  (key: keyof typeof avatars) => avatars[key],
);

export interface Props {
  /**
   * Size of avatar
   * @default 'medium'
   */
  size?: Size;
  /** The name of the person */
  name?: string;
  /** Initials of person to display */
  initials?: string;
  /** Whether the avatar is for a customer */
  customer?: boolean;
  /** URL of the avatar image */
  source?: string;
  /** Accessible label for the avatar image */
  accessibilityLabel?: string;
}

export type CombinedProps = Props & WithAppProviderProps;

function Avatar({
  name,
  source,
  initials,
  customer,
  size = 'medium',
  accessibilityLabel,
  polaris: {intl},
}: CombinedProps) {
  const nameString = name || initials;

  let finalSource: string | undefined;
  let label: string | undefined;

  if (accessibilityLabel) {
    label = accessibilityLabel;
  } else if (name) {
    label = name;
  } else if (initials) {
    const splitInitials = initials.split('').join(' ');
    label = intl.translate('Polaris.Avatar.labelWithInitials', {
      initials: splitInitials,
    });
  } else {
    label = intl.translate('Polaris.Avatar.label');
  }

  if (source) {
    finalSource = source;
  } else if (customer) {
    finalSource = customerPlaceholder(nameString);
  }

  const className = classNames(
    styles.Avatar,
    styles[variationName('style', styleClass(nameString))],
    size && styles[variationName('size', size)],
    finalSource && styles.hasImage,
  );

  const imageMarkUp = finalSource ? (
    <Image
      className={styles.Image}
      source={finalSource}
      alt=""
      role="presentation"
    />
  ) : null;

  // Use `dominant-baseline: central` instead of `dy` when Edge supports it.
  const verticalOffset = '0.35em';

  const initialsMarkup = initials ? (
    <span className={styles.Initials}>
      <svg className={styles.Svg} viewBox="0 0 48 48">
        <text
          x="50%"
          y="50%"
          dy={verticalOffset}
          fill="currentColor"
          fontSize="26"
          textAnchor="middle"
        >
          {initials}
        </text>
      </svg>
    </span>
  ) : null;

  return (
    <span aria-label={label} role="img" className={className}>
      {initialsMarkup}
      {imageMarkUp}
    </span>
  );
}

function styleClass(name?: string) {
  return name
    ? STYLE_CLASSES[name.charCodeAt(0) % STYLE_CLASSES.length]
    : STYLE_CLASSES[0];
}

function customerPlaceholder(name?: string) {
  return name
    ? AVATAR_IMAGES[name.charCodeAt(0) % AVATAR_IMAGES.length]
    : AVATAR_IMAGES[0];
}

export default withAppProvider<Props>()(Avatar);
