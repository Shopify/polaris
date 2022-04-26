import React, {useCallback, useState} from 'react';

import {
  Card,
  Frame,
  Image,
  Layout,
  Page,
  Scrollable,
  Stack,
  TextField,
} from '../src';

import styles from './MobilePrototypeTextInput.scss';

export function MobilePrototypeTextInput() {
  const [textFieldValue, setTextFieldValue] = useState('Gummy World');

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    [],
  );

  const [value, setValue] = useState(
    'Gummy world strives for zero waste and zero sugar. Meet our curated collections of gummies!',
  );

  const handleChange = useCallback((newValue) => setValue(newValue), []);

  const preferencesMarkup = (
    <>
      <Image
        source="https://user-images.githubusercontent.com/3474483/164800800-fa54cbbc-02b3-4c4b-b3ca-d613c1b9b392.png"
        alt="scrappy mobile static banner"
        className={styles.MobileNativeStatic}
      />
      <Scrollable style={{height: '641px'}}>
        <Page
          title="Preferences"
          primaryAction={{
            content: 'Save',
            // eslint-disable-next-line no-console
            onAction: () => console.log('save'),
          }}
        >
          <Layout>
            <Layout.AnnotatedSection
              id="preferences"
              title="Title and meta description"
              description="The title and meta description help define how your store shows up on search engines."
            >
              <Card sectioned>
                <Stack spacing="loose" vertical>
                  <TextField
                    label="Store name"
                    value={textFieldValue}
                    onChange={handleTextFieldChange}
                    maxLength={35}
                    autoComplete="off"
                    showCharacterCount
                  />

                  <TextField
                    label="Homepage meta description"
                    value={value}
                    onChange={handleChange}
                    multiline={4}
                    autoComplete="off"
                    showCharacterCount
                    maxLength={150}
                  />
                </Stack>
              </Card>
            </Layout.AnnotatedSection>
          </Layout>
        </Page>
      </Scrollable>
      <Image
        source="https://user-images.githubusercontent.com/3474483/164063402-bbf4ba88-1279-4f7a-a16c-0c2b9e420b40.png"
        alt="scrappy mobile static footer"
        className={styles.MobileNativeStatic}
      />
    </>
  );

  return <Frame>{preferencesMarkup}</Frame>;
}
