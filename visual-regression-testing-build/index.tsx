import * as React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import * as Polaris from '@shopify/polaris';
import {getSerialized} from '@shopify/react-serialize';

import Example from './Example';

const {data: codeExamples} = getSerialized('codeExamples');

function renderPlayground() {
  render(
    <Polaris.AppProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <ul id="examples">
              {Object.entries(codeExamples).map((tuple) => {
                return tuple[1].map((_, index) => (
                  <li>
                    <Link to={`/${tuple[0]}/${index}`}>{`/${
                      tuple[0]
                    }/${index}`}</Link>
                  </li>
                ));
              })}
            </ul>
          </Route>
          {Object.entries(codeExamples).map((tuple) => {
            return tuple[1].map((example, index) => (
              <Route path={`/${tuple[0]}/${index}`}>
                <Example example={example} />
              </Route>
            ));
          })}
        </Switch>
      </BrowserRouter>
    </Polaris.AppProvider>,
    document.getElementById('app'),
  );
}

renderPlayground();
