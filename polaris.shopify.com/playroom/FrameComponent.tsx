import React, {useEffect, useRef, useState} from 'react';
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

function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

export default function FrameComponent({
  theme = enTranslations,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) {
  const [features, setFeatures] =
    useState<React.ComponentProps<typeof AppProvider>['features']>();
  // Don't render anything until we've done our client-side check for iframe
  // security.
  const [content, setContent] = useState(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Tell parent frame of the initial size on first render
  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    var {height} = wrapperRef.current.getBoundingClientRect();
    updateGrowFrameHeight(`${Math.ceil(height)}px`);
  }, []);

  // Watch for changes in size (screen resizing, interacting, etc);
  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const observer = new ResizeObserver((entries) => {
      const {blockSize: height} = entries[0].contentBoxSize[0];
      updateGrowFrameHeight(`${Math.ceil(height)}px`);
    });
    observer.observe(wrapperRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

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

  // Don't render anything on the server, only render on the client.
  useEffect(() => {
    // window.origin is set to "null" when the page is loaded in a sandboxed iframe without access to the same origin
    if (window.origin === 'null') {
      setContent(children);
    } else {
      if (!inIframe()) {
        // Raw window, not embedded in an iframe at all, so redirect to the correct page (useful for old links before we enforced iframe sandboxing)
        const url = new URL(window.location.href);
        url.pathname = '/sandbox/preview';
        window.location.replace(url.toString());
      } else if (window.frameElement) {
        // Embedded on our own domain, but with insecure sandbox settings (frameElement only has a value on same-origin iframes).
        console.error(
          'Refusing to load example on same origin with allow-same-origin enabled. Hint: ensure the iframe has a "sandbox" attribute WITHOUT "allow-same-origin" set.',
        );
      } else {
        // Embedded on a cross-origin domain, so throw an error
        console.error('Unable to load example on cross-origin domain');
      }
      setContent(null);
    }
  }, [children]);

  return (
    <AppProvider i18n={theme || enTranslations} features={features}>
      <FrameContext.Provider value={mockFrameContext}>
        <div id="polaris-sandbox-wrapper" ref={wrapperRef}>
          {content}
        </div>
      </FrameContext.Provider>
    </AppProvider>
  );
}
