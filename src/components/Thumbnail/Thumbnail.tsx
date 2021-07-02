import React, {ReactNode, useState} from 'react';

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
  /** Fallback for the image */
  fallback?: React.SFC<React.SVGProps<SVGSVGElement>>;
  /** Alt text for the thumbnail image */
  alt: string;
  /** Loading */
  loading?: 'lazy' | 'eager';
}

export function Thumbnail({
  source,
  fallback,
  alt,
  size = 'medium',
  loading,
}: ThumbnailProps) {
  const [errored, setErrored] = useState(false);

  const className = classNames(
    styles.Thumbnail,
    size && styles[variationName('size', size)],
  );

  let content: ReactNode;
  if (typeof source === 'string') {
    if (errored && fallback) {
      content = <Icon accessibilityLabel={alt} source={fallback} />;
    } else {
      content = (
        <Image
          alt={alt}
          source={source}
          loading={loading}
          onError={() => setErrored(true)}
        />
      );
    }
  } else {
    content = <Icon accessibilityLabel={alt} source={source} />;
  }

  return <span className={className}>{content}</span>;
}
