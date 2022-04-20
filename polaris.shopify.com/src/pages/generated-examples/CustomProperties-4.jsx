import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        s
.Card {
  background-color: var(--p-surface);
  box-shadow: var(--p-shadow-card);
  border-radius: var(--p-border-radius-2);
}
      </div>
    </AppProvider>
  );
}

export default Example;
    