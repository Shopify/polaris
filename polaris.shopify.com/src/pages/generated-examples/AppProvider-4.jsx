import { AppProvider, Page,Layout,SettingToggle,TextStyle,ContextualSaveBar } from "@shopify/polaris";
import { useState,useCallback } from "react";

import translations from '@shopify/polaris/locales/en.json';
function AppProviderThemeExample() {
  const [isDirty, setIsDirty] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const handleSearchChange = useCallback(
    (searchFieldValue) => setSearchFieldValue(searchFieldValue),
    [],
  );

  const toggleIsDirty = useCallback(
    () => setIsDirty((isDirty) => !isDirty),
    [],
  );

  const contentStatus = isDirty ? 'Disable' : 'Enable';
  const textStatus = isDirty ? 'enabled' : 'disabled';

  const pageMarkup = (
    <Page title="Account">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: toggleIsDirty,
            }}
            enabled={isDirty}
          >
            This setting is{' '}
            <TextStyle variation="strong">{textStatus}</TextStyle>.
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: toggleIsDirty,
      }}
      discardAction={{
        onAction: toggleIsDirty,
      }}
    />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <AppProvider
        colorScheme="dark"
        i18n={{
          Polaris: {
            Frame: {skipToContent: 'Skip to content'},
            ContextualSaveBar: {
              save: 'Save',
              discard: 'Discard',
            },
            TopBar: {
              SearchField: {
                clearButtonLabel: 'Clear',
                search: 'Search',
              },
            },
          },
        }}
      >
        {contextualSaveBarMarkup}
        {pageMarkup}
      </AppProvider>
    </div>
  );
}

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
        <AppProviderThemeExample />
      </div>
    </AppProvider>
  );
}

export default Example;
