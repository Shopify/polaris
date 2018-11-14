import * as React from 'react';
import * as Polaris from '@shopify/polaris';

export interface ExampleProps {
  name: string;
  code: string;
}

export default function Example(props: ExampleProps) {
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
