import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import * as Polaris from '@shopify/polaris';
import {getSerialized} from '@shopify/react-serialize';

import Example, {ExampleProps} from './Example';

interface Component {
  name: string;
  slug: string;
  examples: ExampleProps[];
}

const {data: components}: {data: Component[]} = getSerialized('codeExamples');

function renderApp() {
  render(
    <Polaris.AppProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Polaris.Page title="Polaris React component examples">
              <Polaris.Layout>
                {components.map((component) => (
                  <Polaris.Layout.AnnotatedSection
                    title={component.name}
                    key={`${component.name}link`}
                  >
                    <Polaris.Card sectioned>
                      <Polaris.List>
                        {component.examples.map(({name}, index) => (
                          <Polaris.List.Item
                            key={`${component.slug}${index}listitem`}
                          >
                            <Polaris.Link url={`/${component.slug}/${index}`}>
                              {name}
                            </Polaris.Link>
                          </Polaris.List.Item>
                        ))}
                      </Polaris.List>
                    </Polaris.Card>
                  </Polaris.Layout.AnnotatedSection>
                ))}
              </Polaris.Layout>
            </Polaris.Page>
          </Route>
          {components.map((component) =>
            component.examples.map((example, index) => (
              <Route
                key={`${component.slug}${index}route`}
                path={`/${component.slug}/${index}`}
              >
                <Example code={example.code} name={example.name} />
              </Route>
            )),
          )}
          <Route path="/all-components" exact>
            <React.Fragment>
              {components.map((component) =>
                component.examples.map((example) => (
                  <div
                    style={{marginTop: '3rem', marginBottom: '3rem'}}
                    key={`${component.name}/${example.name}`}
                  >
                    <Example code={example.code} name={example.name} />
                  </div>
                )),
              )}
            </React.Fragment>
          </Route>
        </Switch>
      </BrowserRouter>
    </Polaris.AppProvider>,
    document.getElementById('app'),
  );
}

renderApp();
