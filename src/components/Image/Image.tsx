import React from 'react';

interface SourceSet {
  source: string;
  descriptor?: string;
}

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  source: string;
  sourceSet?: SourceSet[];
  onLoad?(): void;
  onError?(): void;
}

export function Image({sourceSet, source, crossOrigin, ...rest}: ImageProps) {
  const finalSourceSet = sourceSet
    ? sourceSet
        .map(({source: subSource, descriptor}) => `${subSource} ${descriptor}`)
        .join(',')
    : null;

  return finalSourceSet ? (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={source}
      srcSet={finalSourceSet}
      crossOrigin={crossOrigin as CrossOrigin}
      {...rest}
    />
  ) : (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img src={source} {...rest} crossOrigin={crossOrigin as CrossOrigin} />
  );
}
