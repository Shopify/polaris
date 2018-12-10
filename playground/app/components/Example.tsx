import * as React from 'react';
import * as Polaris from '@shopify/polaris';

import {ExtractedExample} from '../types';

export default function Example(props: ExtractedExample) {
  const Component = props.code({React, ...Polaris});

  return (
    <React.Fragment>
      <Polaris.Heading>{props.name}</Polaris.Heading>
      <Component />
    </React.Fragment>
  );
}
