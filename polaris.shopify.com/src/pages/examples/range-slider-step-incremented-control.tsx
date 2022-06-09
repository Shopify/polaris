// import { Card, RangeSlider } from "@shopify/polaris";
// import { useState, useCallback } from "react";
// 
// function RangeSliderWithPreciseRangeControlExample() {
//   const [rangeValue, setRangeValue] = useState(4);
// 
//   const handleRangeSliderChange = useCallback(
//     (value) => setRangeValue(value),
//     []
//   );
// 
//   return (
//     <Card sectioned title="Navigation branding">
//       <RangeSlider
//         output
//         label="Logo offset"
//         min={-20}
//         max={20}
//         step={4}
//         value={rangeValue}
//         onChange={handleRangeSliderChange}
//       />
//     </Card>
//   );
// }
// 
import { withPolarisExample } from "../../components/PolarisExamplePage";
export default withPolarisExample(() => <p>Polaris Example Tk</p>);
