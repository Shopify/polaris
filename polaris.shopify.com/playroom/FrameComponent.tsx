import React, {useEffect, useRef, useState} from 'react';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import {useGrowFrameUpdater} from '../src/components/GrowFrame';

export default function FrameComponent({
  theme = enTranslations,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) {
  const [features, setFeatures] =
    useState<React.ComponentProps<typeof AppProvider>['features']>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Tell parent frame the rendered height of the given element
  useGrowFrameUpdater(wrapperRef);

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
      <div id="polaris-sandbox-wrapper" ref={wrapperRef}>
        {children}
      </div>
    </AppProvider>
  );
}
