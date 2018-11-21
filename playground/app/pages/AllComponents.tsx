import * as React from 'react';

import {Example} from '../components';
import {ComponentReadme} from '../types';

// At the moment the loader pulls in ALL component READMEs based upon a glob
// The filename here has no effect. we just need something that triggers using
// the markdown loader
// eslint-disable-next-line typescript/no-var-requires
const components: ComponentReadme[] = require('../../../src/components/README.md');

export default function AllComponents() {
  return (
    <React.Fragment>
      {components.map((component) =>
        component.examples.map((example) => (
          <div
            style={{marginTop: '3rem', marginBottom: '3rem'}}
            key={`${component.name}/${example.name}`}
          >
            <Example {...example} />
          </div>
        )),
      )}
    </React.Fragment>
  );
}
