import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import * as Polaris from '@shopify/polaris';
import {getSerialized} from '@shopify/react-serialize';

import Example from './Example';

interface CodeExamples {
  [key: string]: string[];
}

const {data: codeExamples} = getSerialized('codeExamples');

function renderPlayground() {
  render(
    <Polaris.AppProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <ul id="examples">
              {Object.entries(codeExamples as CodeExamples).map((tuple) =>
                tuple[1].map((_, index) => (
                  <li key={`${tuple[0]}${index}link`}>
                    <Link to={`/${tuple[0]}/${index}`}>{`/${
                      tuple[0]
                    }/${index}`}</Link>
                  </li>
                )),
              )}
            </ul>
          </Route>
          {Object.entries(codeExamples as CodeExamples).map((tuple) =>
            tuple[1].map((example, index) => (
              <Route
                key={`${tuple[0]}${index}route`}
                path={`/${tuple[0]}/${index}`}
              >
                <Example example={example} />
              </Route>
            )),
          )}
        </Switch>
      </BrowserRouter>
    </Polaris.AppProvider>,
    document.getElementById('app'),
  );
}

renderPlayground();
