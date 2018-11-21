import * as React from 'react';
import * as Polaris from '@shopify/polaris';

import {ExtractedExample} from '../types';

export default function Example(props: ExtractedExample) {
  const scope = {React, ...Polaris};
  const tempScope: Object[] = [];

  Object.keys(scope).forEach((scopeProp) => {
    tempScope.push(scope[scopeProp]);
  });

  const code = props.code.replace(
    'SCOPE_VARIABLES_PLACEHOLDER',
    Object.keys(scope).join(', '),
  );

  // eslint-disable-next-line no-eval
  const Component = eval(code)(...tempScope);

  return (
    <React.Fragment>
      <Polaris.Heading>{props.name}</Polaris.Heading>
      <Component />
    </React.Fragment>
  );
}
