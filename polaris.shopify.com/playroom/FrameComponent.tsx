import React, {useEffect} from 'react';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {updateGrowFrameHeight} from '../src/components/GrowFrame';
export default function FrameComponent({
  theme = enTranslations,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) {
  useEffect(() => {
    updateGrowFrameHeight(`${document.body.scrollHeight}px`);
  });
  return (
    <AppProvider i18n={theme}>
      <div
        id="polaris-sandbox-wrapper"
        style={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '32px',
          paddingRight: '32px',
        }}
      >
        <div
          style={{
            width: '100%',
          }}
        >
          {children}
        </div>
      </div>
    </AppProvider>
  );
}
