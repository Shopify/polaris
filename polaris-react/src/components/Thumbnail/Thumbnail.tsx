import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {Image} from '../Image';
import {Icon} from '../Icon';

import styles from './Thumbnail.scss';

type Size = 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string | React.SFC<React.SVGProps<SVGSVGElement>>;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Transparent background */
  transparent?: boolean;
}

export function Thumbnail({
  source,
  alt,
  size = 'medium',
  transparent,
}: ThumbnailProps) {
  const className = classNames(
    styles.Thumbnail,
    size && styles[variationName('size', size)],
    transparent && styles.transparent,
  );

  const content =
    typeof source === 'string' ? (
      <Image alt={alt} source={source} />
    ) : (
      <Icon accessibilityLabel={alt} source={source} />
    );

  return <span className={className}>{content}</span>;
}
