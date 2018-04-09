import * as React from 'react';

export interface SourceSet {
  source: string;
  descriptor?: string;
}

export type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

export interface Props extends React.HTMLProps<HTMLImageElement> {
  alt: string;
  source: string;
  sourceSet?: SourceSet[];
}

export default function Image({
  sourceSet,
  source,
  crossOrigin,
  ...rest
}: Props) {
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
