import './setup';
import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

function renderPlayground() {
  // eslint-disable-next-line no-require-imports
  const Playground = require('./Playground').default;
  render(
    <AppContainer>
      <Playground />
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderPlayground();

if ((module as any).hot) {
  (module as any).hot.accept('./index.tsx');
  (module as any).hot.accept('./Playground.tsx', renderPlayground);
}
