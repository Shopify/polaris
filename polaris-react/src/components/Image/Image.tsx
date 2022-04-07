import React, {useCallback, useEffect} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Image.scss';

interface SourceSet {
  source: string;
  descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
type Status = 'loading' | 'loaded' | 'error';

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  source: string;
  crossOrigin?: CrossOrigin;
  sourceSet?: SourceSet[];
  onLoad?(): void;
  onError?(): void;
}

export function Image({
  alt,
  sourceSet,
  source,
  crossOrigin,
  onLoad,
  className,
  ...rest
}: ImageProps) {
  const [status, setStatus] = React.useState<Status>('loading');
  const finalSourceSet = sourceSet
    ? sourceSet
        .map(({source: subSource, descriptor}) => `${subSource} ${descriptor}`)
        .join(',')
    : null;

  useEffect(() => setStatus('loading'), [status]);

  const handleLoad = useCallback(() => {
    if (onLoad) onLoad();
    setStatus('loaded');
  }, [onLoad]);

  const imageClassName = classNames(
    styles.Image,
    status === 'loaded' && styles.hasLoaded,
    className,
  );

  return (
    <img
      alt={alt}
      src={source}
      crossOrigin={crossOrigin}
      className={imageClassName}
      onLoad={handleLoad}
      {...(finalSourceSet ? {srcSet: finalSourceSet} : {})}
      {...rest}
    />
  );
}
