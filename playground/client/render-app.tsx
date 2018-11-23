import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {BrowserRouter} from 'react-router-dom';

export default function renderApp(
  appContainerElement: HTMLElement | null,
  App: React.ComponentType,
) {
  if (appContainerElement) {
    render(
      <AppContainer>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppContainer>,
      appContainerElement,
    );
  }
}
