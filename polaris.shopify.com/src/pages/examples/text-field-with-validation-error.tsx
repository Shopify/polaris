// import { TextField } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// 
// function ValidationErrorExample() {
//   const [textFieldValue, setTextFieldValue] = useState("");
// 
//   const handleTextFieldChange = useCallback(
//     (value) => setTextFieldValue(value),
//     []
//   );
// 
//   return (
//     <TextField
//       label="Store name"
//       value={textFieldValue}
//       onChange={handleTextFieldChange}
//       error="Store name is required"
//       autoComplete="off"
//     />
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);
