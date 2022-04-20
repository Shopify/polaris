import AppProvider from '@shopify/polaris';
// en.json is English. Replace with fr.json for French, etc
import translations from '@shopify/polaris/locales/en.json';

function App() {
  return <AppProvider i18n={translations}>{/* App content */}</AppProvider>;
}

    export default App;