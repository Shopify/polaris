// @flow

/* eslint-env node */

import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import 'core-js/es7/object';

import App from './App';

const rootElement = document.getElementById('root');

render(<AppContainer><App /></AppContainer>, rootElement);

if (module.hot) {
  // $FlowIgnore: This is needed for hot reloading
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer><NextApp /></AppContainer>,
      rootElement,
    );
  });
}
