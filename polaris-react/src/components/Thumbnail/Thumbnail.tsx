import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {Image} from '../Image';
import {Icon} from '../Icon';

import styles from './Thumbnail.scss';

type Size = 'extraSmall' | 'small' | 'medium' | 'large';

type Variant = 'transparent';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Styling variant for thumbnail */
  variant?: Variant;
}

export function Thumbnail({
  source,
  alt,
  size = 'medium',
  variant,
}: ThumbnailProps) {
  const className = classNames(
    styles.Thumbnail,
    size && styles[variationName('size', size)],
    variant && styles[variationName('variant', variant)],
  );

  const content =
    typeof source === 'string' ? (
      <Image alt={alt} source={source} />
    ) : (
      <Icon accessibilityLabel={alt} source={source} />
    );

  return <span className={className}>{content}</span>;
}
