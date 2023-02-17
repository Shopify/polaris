import * as polaris from "@shopify/polaris";
import { ComponentMap, PropDefinition, PropType } from "./types";
import untypedComponents from "./componentProps.json";
import { createElement } from "react";

interface PropMap {
  [reactPropsName: string]: {
    [prop: string]: PropDefinition;
  };
}

let importedProps = untypedComponents as PropMap;

const allowedComponents = [
  "Button",
  "Banner",
  "Avatar",
  "Card",
  "Page",
  "Layout",
  "Box",
  "IndexTable",
  "IndexTable.Row",
  "IndexTable.Cell",
  "Text",
  "Badge",
  "Stack",
  "Checkbox",
  "ContextualSaveBar",
  "RangeSlider",
  "KeyboardKey",
  "Spinner",
];

export let components: ComponentMap = {};

Object.entries(importedProps).forEach(([reactPropsName, props]) => {
  const componentName = reactPropsName.replace("Props", "");
  const polarisReactComponent = polaris[componentName as keyof typeof polaris];
  if (!allowedComponents.includes(componentName) || !polarisReactComponent) {
    delete components[componentName];
  } else {
    components[componentName] = {
      reactComponent: polarisReactComponent,
      renderPreview: () =>
        createElement("div", {}, [`${componentName} preview`]),
      props,
    };
  }
});

console.log({ components });

components["p"] = {
  reactComponent: (props: any) => createElement("p", props),
  props: {
    children: {
      type: PropType.String,
      alias: "Text",
      description: "The label of the button",
      defaultValue: {
        type: PropType.String,
        value: "Lorem ipsum dolor et amet",
      },
    },
  },
  renderPreview: () => <p>Paragraph</p>,
};
