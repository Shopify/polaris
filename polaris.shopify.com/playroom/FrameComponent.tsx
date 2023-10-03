import React, {useEffect, useState} from 'react';
import {AppProvider, FrameContext} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {updateGrowFrameHeight} from '../src/components/GrowFrame';

const mockFrameContext = {
  toastMessages: [],
  showToast: () => {
    console.info(
      '[Polaris] Frame#showToast() is not available in Sandbox mode.',
    );
  },
  hideToast: () => {
    console.info(
      '[Polaris] Frame#hideToast() is not available in Sandbox mode.',
    );
  },
  setContextualSaveBar: () => {
    console.info(
      '[Polaris] Frame#setContextualSaveBar() is not available in Sandbox mode.',
    );
  },
  removeContextualSaveBar: () => {
    console.info(
      '[Polaris] Frame#removeContextualSaveBar() is not available in Sandbox mode.',
    );
  },
  startLoading: () => {
    console.info(
      '[Polaris] Frame#startLoading() is not available in Sandbox mode.',
    );
  },
  stopLoading: () => {
    console.info(
      '[Polaris] Frame#stopLoading() is not available in Sandbox mode.',
    );
  },
};

export default function FrameComponent({
  theme = enTranslations,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) {
  const [features, setFeatures] =
    useState<React.ComponentProps<typeof AppProvider>['features']>();
  useEffect(() => {
    updateGrowFrameHeight(`${document.body.scrollHeight}px`);
  });
  useEffect(() => {
    const urlFeatures = new URLSearchParams(window.location.search).get(
      'features',
    );
    if (typeof urlFeatures === 'string') {
      setFeatures(
        Object.fromEntries(
          urlFeatures.split(',').map((feature) => [feature.trim(), true]),
        ),
      );
    }
  }, []);
  return (
    <AppProvider i18n={theme || enTranslations} features={features}>
      <FrameContext.Provider value={mockFrameContext}>
        <div id="polaris-sandbox-wrapper">{children}</div>
      </FrameContext.Provider>
    </AppProvider>
  );
}
