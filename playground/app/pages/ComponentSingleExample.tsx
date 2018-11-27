import * as React from 'react';

import {Example} from '../components';
import {ComponentReadme, ExtractedExample} from '../types';
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
  const example = (
    components.find(
      (component) => component.slug === match.params.componentSlug,
    ) || {examples: [] as ExtractedExample[]}
  ).examples.find((example) => example.slug === match.params.exampleSlug);

  if (!example) {
    return <NotFound />;
  }

  return <Example {...example} />;
}
