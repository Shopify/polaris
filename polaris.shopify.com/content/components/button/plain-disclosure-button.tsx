import { Button } from "@shopify/polaris";
import { useState } from "react";

function DisclosureButtion() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Button
      plain
      disclosure={expanded ? "up" : "down"}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      {expanded ? "Show less" : "Show more"}
    </Button>
  );
}
