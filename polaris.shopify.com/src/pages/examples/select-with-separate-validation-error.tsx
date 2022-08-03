import {
  Stack,
  FormLayout,
  TextField,
  Select,
  InlineError,
  Card,
  TextStyle,
  Link,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function SeparateValidationErrorExample() {
  const [weight, setWeight] = useState("12");
  const [unit, setUnit] = useState("");

  const handleWeightChange = useCallback((value) => setWeight(value), []);
  const handleUnitChange = useCallback((value) => setUnit(value), []);

  const unitSelectID = "unit";
  const errorMessage = generateErrorMessage();
  const formGroupMarkup = (
    <Stack vertical spacing="extraTight">
      <FormLayout>
        <FormLayout.Group condensed>
          <TextField
            label="Product weight"
            type="number"
            value={weight}
            onChange={handleWeightChange}
            error={Boolean(!weight && unit)}
            autoComplete="off"
          />
          <Select
            id={unitSelectID}
            label="Unit of measure"
            placeholder="Select"
            options={["oz", "g", "kg", "lb"]}
            value={unit}
            onChange={handleUnitChange}
            error={Boolean(!unit && weight)}
          />
        </FormLayout.Group>
      </FormLayout>
      <InlineError message={errorMessage} fieldID={unitSelectID} />
    </Stack>
  );

  return <Card sectioned>{formGroupMarkup}</Card>;

  function generateErrorMessage() {
    const weightError =
      !weight && unit ? "The numeric weight of the product " : "";
    const unitError =
      !unit && weight ? "The unit of measure for the product weight" : "";

    if (!weightError && !unitError) {
      return "";
    }

    return (
      <span>
        <TextStyle variation="negative">
          <p>
            {`${weightError}${unitError} is required when weight based shipping rates are enabled. `}
            <Link>Manage shipping</Link>
          </p>
        </TextStyle>
      </span>
    );
  }
}

export default withPolarisExample(SeparateValidationErrorExample);
