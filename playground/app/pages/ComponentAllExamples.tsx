import * as React from 'react';
import {DisplayText} from '@shopify/polaris';

import {Example} from '../components';
import {ComponentReadme} from '../types';
import NotFound from './NotFound';

// At the moment the loader pulls in ALL component READMEs based upon a glob
// The filename here has no effect. we just need something that triggers using
// the markdown loader
const components: ComponentReadme[] = require('../../../src/components/README.md')
  .components;

export interface Props {
  match: any;
}

export default function ComponentSingleExample({match}: Props) {
  const component = components.find(
    (component) => component.slug === match.params.componentSlug,
  );

  if (!component) {
    return <NotFound />;
  }

  // This is to prevent false positives in visual regression testing.
  // Set a minimum height so that examples don't shift and triger
  // a failure if an example above them changes height
  const containerStyle = {
    minHeight: '720px',
    margin: '0 10px',
  };

  return (
    <React.Fragment>
      <DisplayText>{component.name}</DisplayText>
      {component.examples.map((example) => (
        <React.Fragment key={example.name}>
          <div style={containerStyle}>
            <Example {...example} />
          </div>
          <hr />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
