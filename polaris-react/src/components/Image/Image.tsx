import React, {useCallback, useEffect} from 'react';

import {classNames} from '../../utilities/css';

import styles from './Image.scss';

interface SourceSet {
  source: string;
  descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;
type Status = 'loading' | 'loaded';

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  source: string;
  crossOrigin?: CrossOrigin;
  sourceSet?: SourceSet[];
  noPlaceholder?: boolean;
  onLoad?(): void;
  onError?(): void;
}

export function Image({
  alt,
  sourceSet,
  source,
  crossOrigin,
  noPlaceholder,
  onLoad,
  className: classNameProp,
  ...rest
}: ImageProps) {
  const [status, setStatus] = React.useState<Status>('loading');
  const finalSourceSet = sourceSet
    ? sourceSet
        .map(({source: subSource, descriptor}) => `${subSource} ${descriptor}`)
        .join(',')
    : null;

  useEffect(() => setStatus('loading'), [source, sourceSet]);

  const handleLoad = useCallback(() => {
    if (onLoad) onLoad();
    setStatus('loaded');
  }, [onLoad]);

  const className = classNames(
    styles.Image,
    !noPlaceholder && status === 'loading' && styles.isLoading,
    classNameProp,
  );

  return (
    <img
      alt={alt}
      src={source}
      crossOrigin={crossOrigin}
      className={className}
      onLoad={handleLoad}
      {...(finalSourceSet ? {srcSet: finalSourceSet} : {})}
      {...rest}
    />
  );
}
