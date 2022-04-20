import AppProvider from '@shopify/polaris';
// en.json is English. Replace with fr.json for French, etc
import translations from '@shopify/polaris/locales/en.json';
import {useI18n} from '@shopify/react-i18n';

function App() {
  const [i18n] = useI18n({
    id: 'Polaris',
    fallback: translations,
    translations(locale) {
      return import(
        /* webpackChunkName: "Polaris-i18n", webpackMode: "lazy-once" */ `@shopify/polaris/locales/${locale}.json`
      ).then((dictionary) => dictionary && dictionary.default);
    },
  });

  // i18n.translations is an array of translation dictionaries, where the first
  // dictionary is the desired language, and the second is the fallback.
  return (
    <AppProvider i18n={i18n.translations}>{/* App content */}</AppProvider>
  );
}

    export default App;