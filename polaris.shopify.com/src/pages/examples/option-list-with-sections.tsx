import { Card, OptionList } from "@shopify/polaris";
import { useState } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function OptionListWithSectionsExample() {
  const [selected, setSelected] = useState([]);

  return (
    <Card>
      <OptionList
        onChange={setSelected}
        sections={[
          {
            options: [
              { value: "type", label: "Sale item type" },
              { value: "kind", label: "Sale kind" },
            ],
          },
          {
            title: "Traffic",
            options: [
              { value: "source", label: "Traffic referrer source" },
              { value: "host", label: "Traffic referrer host" },
              { value: "path", label: "Traffic referrer path" },
            ],
          },
        ]}
        selected={selected}
        allowMultiple
      />
    </Card>
  );
}

export default withPolarisExample(OptionListWithSectionsExample);
