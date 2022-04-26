import { AppProvider, Card, OptionList } from "@shopify/polaris";
import { useState } from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function OptionListWithSectionsExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        onChange={setSelected}
        sections={[
          {
            options: [
              {value: 'type', label: 'Sale item type'},
              {value: 'kind', label: 'Sale kind'},
            ],
          },
          {
            title: 'Traffic',
            options: [
              {value: 'source', label: 'Traffic referrer source'},
              {value: 'host', label: 'Traffic referrer host'},
              {value: 'path', label: 'Traffic referrer path'},
            ],
          },
        ]}
        selected={selected}
        allowMultiple
      />
    </Card>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <OptionListWithSectionsExample />
    </AppProvider>
  );
}

export default Example;
    