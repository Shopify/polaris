import {RouteComponentProps, Router} from '@reach/router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Canvas from './components/Canvas';
import './global.scss';

let AppRoute = (props: RouteComponentProps) => <App />;
let CanvasRoute = (props: RouteComponentProps) => <Canvas />;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <AppRoute path="/" />
      <CanvasRoute path="canvas" />
    </Router>
  </React.StrictMode>,
);
