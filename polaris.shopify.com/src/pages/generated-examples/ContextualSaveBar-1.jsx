import { AppProvider, Frame,ContextualSaveBar } from "@shopify/polaris";
import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <div style={{height: '250px'}}>
  <Frame
    logo={{
      width: 124,
      contextualSaveBarSource:
        'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
    }}
  >
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: () => console.log('add form submit logic'),
        loading: false,
        disabled: false,
      }}
      discardAction={{
        onAction: () => console.log('add clear form logic'),
      }}
    />
  </Frame>
</div>
      </div>
    </AppProvider>
  );
}

export default Example;
    