'use client';

import {LegacyCard, EmptyState, AppProvider} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';

export default function () {
  return (
    <main id="polaris-example">
      <AppProvider i18n={en}>
        <LegacyCard sectioned>
          <EmptyState
            heading="Manage your inventory transfers"
            action={{content: 'Add transfer'}}
            secondaryAction={{
              content: 'Learn more',
              url: 'https://help.shopify.com',
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>Track and receive your incoming inventory from suppliers.</p>
          </EmptyState>
        </LegacyCard>
      </AppProvider>
    </main>
  );
}
