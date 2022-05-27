import { FullscreenBar, DisplayText, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";

function FullscreenBarExample() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "1rem",
        }}
      >
        <DisplayText>Content</DisplayText>
        <Button onClick={() => {}}>User Action 1</Button>
      </div>
    </FullscreenBar>
  );

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
