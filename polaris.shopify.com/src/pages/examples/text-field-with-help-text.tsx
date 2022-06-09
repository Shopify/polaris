// import { TextField } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// 
// function HelpTextExample() {
//   const [textFieldValue, setTextFieldValue] = useState(
//     "bernadette.lapresse@jadedpixel.com"
//   );
// 
//   const handleTextFieldChange = useCallback(
//     (value) => setTextFieldValue(value),
//     []
//   );
// 
//   return (
//     <TextField
//       label="Account email"
//       type="email"
//       value={textFieldValue}
//       onChange={handleTextFieldChange}
//       helpText="We’ll use this address if we need to contact you about your account."
//       autoComplete="email"
//     />
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);
