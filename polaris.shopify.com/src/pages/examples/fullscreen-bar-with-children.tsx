import {
  Badge,
  ButtonGroup,
  FullscreenBar,
  DisplayText,
  Button,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

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
          paddingRight: "1rem",
        }}
      >
        <Badge status="info">Draft</Badge>
        <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
          <DisplayText size="small">Page title</DisplayText>
        </div>
        <ButtonGroup>
          <Button onClick={() => {}}>Secondary Action</Button>
          <Button primary onClick={() => {}}>
            Primary Action
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );

  return (
    <div style={{ height: "250px", width: "100%" }}>
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

export default withPolarisExample(FullscreenBarExample);
