import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';

function renderApp() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp();

if ((module as any).hot) {
  (module as any).hot.accept('./index.tsx');
  (module as any).hot.accept('./App.tsx', renderApp);
  (module as any).hot.accept('../Playground.tsx', renderApp);
}
