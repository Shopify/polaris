import { AppProvider, FullscreenBar,Button,DisplayText } from "@shopify/polaris";
import { useState,useCallback } from "react";
import translations from '@shopify/polaris/locales/en.json';
function FullscreenBarExample() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = <FullscreenBar onAction={handleActionClick} />;

  return (
    <div style={{height: '250px'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <DisplayText size="small">Page content</DisplayText>
      </div>
    </div>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <FullscreenBarExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    