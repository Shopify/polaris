// import { ChoiceList } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// 
// function ChoiceListWithErrorExample() {
//   const [selected, setSelected] = useState("hidden");
// 
//   const handleChange = useCallback((value) => setSelected(value), []);
// 
//   return (
//     <ChoiceList
//       title="Company name"
//       choices={[
//         { label: "Hidden", value: "hidden", describedByError: true },
//         { label: "Optional", value: "optional" },
//         { label: "Required", value: "required" },
//       ]}
//       selected={selected}
//       onChange={handleChange}
//       error="Company name cannot be hidden at this time"
//     />
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);
