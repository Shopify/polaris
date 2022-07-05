import React from 'react';

import {Page} from '../src';
import {useBreakpoints} from '../src/utilities/breakpoints';

export function Playground() {
  const breakpoints = useBreakpoints();

  return (
    <Page title="Playground">
      {Object.entries(breakpoints).map(([name, value]) => (
        <div key={name} style={{background: value ? 'lightsteelblue' : 'pink'}}>
          <p>
            {name}: {value.toString()}
          </p>
        </div>
      ))}
    </Page>
  );
}
