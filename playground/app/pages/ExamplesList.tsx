import * as React from 'react';
import {Card, Layout, Link, List, Page} from '@shopify/polaris';
import {ComponentReadme} from '../types';

// At the moment the loader pulls in ALL component READMEs based upon a glob
// The filename here has no effect. we just need something that triggers using
// the markdown loader
// eslint-disable-next-line typescript/no-var-requires
const components: ComponentReadme[] = require('../../../src/components/README.md');

export default function ExamplesList() {
  return (
    <Page title="Polaris React component examples">
      <Layout>{components.map(singleComponent)}</Layout>
    </Page>
  );
}

function singleComponent(component: ComponentReadme) {
  return (
    <Layout.AnnotatedSection
      title={component.name}
      description={
        <div className="componentLinks">
          <Link url={`/${component.slug}`}>View all examples</Link>
        </div>
      }
      key={`${component.slug}`}
    >
      <Card sectioned>
        <List>
          {component.examples.map((example) => (
            <List.Item key={`${component.slug}/${example.slug}`}>
              <span className={`${component.slug}Link`}>
                <Link url={`/${component.slug}/${example.slug}`}>
                  {example.name}
                </Link>
              </span>
            </List.Item>
          ))}
        </List>
      </Card>
    </Layout.AnnotatedSection>
  );
}
