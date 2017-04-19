import * as React from 'react';

export interface SourceSet {
  source: string,
  descriptor?: string,
}

export interface Props extends React.HTMLProps<HTMLImageElement> {
  alt: string,
  source: string,
  sourceSet?: SourceSet[],
}

export default function Image({sourceSet, source, ...rest}: Props) {
  const finalSourceSet = sourceSet
    ? (
      sourceSet
        .map(({source: subSource, descriptor}) => `${subSource} ${descriptor}`)
        .join(',')
    )
    : null;

  return finalSourceSet
    ? <img src={source} srcSet={finalSourceSet} {...rest} />
    : <img src={source} {...rest} />;
}
