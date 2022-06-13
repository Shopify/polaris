import { Button } from "@shopify/polaris";
import { useState } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

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

export default withPolarisExample(DisclosureButtion);
