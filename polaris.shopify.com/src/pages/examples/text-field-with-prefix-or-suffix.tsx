// import { TextField } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// 
// function PrefixExample() {
//   const [textFieldValue, setTextFieldValue] = useState("2.00");
// 
//   const handleTextFieldChange = useCallback(
//     (value) => setTextFieldValue(value),
//     []
//   );
// 
//   return (
//     <TextField
//       label="Price"
//       type="number"
//       value={textFieldValue}
//       onChange={handleTextFieldChange}
//       prefix="$"
//       autoComplete="off"
//     />
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);
