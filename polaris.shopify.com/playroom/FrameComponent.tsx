import React, {useEffect} from 'react';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/build/esm/style.css';
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
    <AppProvider i18n={theme || enTranslations}>
      <div id="polaris-sandbox-wrapper">{children}</div>
    </AppProvider>
  );
}
