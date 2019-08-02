import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/styles.css';
import {AppProvider} from '@shopify/polaris';

import App from './App';

function WrappedApp() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
