import React from 'react';
import ReactDOM from 'react-dom';
import '@shopify/polaris/dist/styles.css';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import {App} from './App';

function WrappedApp() {
  return (
    <AppProvider i18n={enTranslations}>
      <App />
    </AppProvider>
  );
}

ReactDOM.render(<WrappedApp />, document.getElementById('root'));
