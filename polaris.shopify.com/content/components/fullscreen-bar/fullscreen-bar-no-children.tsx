import { FullscreenBar, Button, DisplayText } from "@shopify/polaris";
import { useState, useCallback } from "react";

function FullscreenBarExample() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = <FullscreenBar onAction={handleActionClick} />;

  return (
    <div style={{ height: "250px" }}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{ padding: "1rem" }}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <DisplayText size="small">Page content</DisplayText>
      </div>
    </div>
  );
}
