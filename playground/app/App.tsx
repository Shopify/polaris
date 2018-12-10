import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';

import {
  AllComponents,
  ComponentAllExamples,
  ComponentSingleExample,
  ExamplesList,
  NotFound,
  Playground,
} from './pages';

export default function App() {
  return (
    <AppProvider>
      <Switch>
        <Route path="/" exact component={Playground} />
        <Route path="/all-components" exact component={AllComponents} />
        <Route path="/examples" exact component={ExamplesList} />
        <Route path="/:componentSlug" exact component={ComponentAllExamples} />
        <Route
          path="/:componentSlug/:exampleSlug"
          exact
          component={ComponentSingleExample}
        />
        <Route component={NotFound} />
      </Switch>
    </AppProvider>
  );
}
