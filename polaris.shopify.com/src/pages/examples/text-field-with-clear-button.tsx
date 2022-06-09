// import { TextField } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// 
// function TextFieldWithClearButtonExample() {
//   const [textFieldValue, setTextFieldValue] = useState("Jaded Pixel");
// 
//   const handleTextFieldChange = useCallback(
//     (value) => setTextFieldValue(value),
//     []
//   );
// 
//   const handleClearButtonClick = useCallback(() => setTextFieldValue(""), []);
// 
//   return (
//     <TextField
//       label="Store name"
//       value={textFieldValue}
//       onChange={handleTextFieldChange}
//       clearButton
//       onClearButtonClick={handleClearButtonClick}
//       autoComplete="off"
//     />
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);
