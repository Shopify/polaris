import React, {useEffect} from 'react';
import {AppProvider} from '@shopify/polaris';
import {Provider} from '@shopify/app-bridge-react';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {updateGrowFrameHeight} from '../src/components/GrowFrame';
const hostString = 'localhost:3000';
const config = {
  apiKey: 'Client ID retrieved from the Partner Dashboard',
  host: btoa(hostString.replace(/\//g, '_').replace(/\+/g, '-')),
  forceRedirect: true,
};
export default function FrameComponent({
  theme = enTranslations,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) {
  useEffect(() => {
    updateGrowFrameHeight(`${document.body.scrollHeight}px`);
  }, []);
  return (
    <AppProvider i18n={theme}>
      <Provider config={config}>
        <div id="polaris-sandbox-wrapper">{children}</div>
      </Provider>
    </AppProvider>
  );
}
