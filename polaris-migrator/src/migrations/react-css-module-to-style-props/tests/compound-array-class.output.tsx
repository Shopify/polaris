import React from "react";

import { Box } from "../../../../../polaris-react/src/component/Box";

declare function MyComponent(props: any): JSX.Element;
export function App() {
  return (
    <Box display="block" color="green" fontWeight="bold" borderRadius="4px">
      Hello world
    </Box>
  );
}
