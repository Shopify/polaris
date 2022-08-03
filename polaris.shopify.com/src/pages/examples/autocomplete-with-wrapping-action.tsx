import { Autocomplete, Icon } from "@shopify/polaris";
import { SearchMinor, CirclePlusMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo } from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function AutocompleteActionBeforeExample() {
  const deselectedOptions = useMemo(
    () => [
      { value: "rustic", label: "Rustic" },
      { value: "antique", label: "Antique" },
      { value: "vinyl", label: "Vinyl" },
      { value: "vintage", label: "Vintage" },
      { value: "refurbished", label: "Refurbished" },
    ],
    []
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === "") {
          setOptions(deselectedOptions);
          setLoading(false);
          return;
        }
        const filterRegex = new RegExp(value, "i");
        const resultOptions = options.filter((option) =>
          option.label.match(filterRegex)
        );
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [deselectedOptions, loading, options]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedText = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      setSelectedOptions(selected);
      setInputValue(selectedText[0]);
    },
    [options]
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} />}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: "225px" }}>
      <Autocomplete
        actionBefore={{
          accessibilityLabel: "Action label",
          badge: {
            status: "new",
            content: "New!",
          },
          content:
            "Action with long name that will need to wrap on small display in order to have a nice display",
          ellipsis: true,
          helpText: "Help text",
          icon: CirclePlusMinor,
          wrapOverflow: true,
        }}
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        listTitle="Suggested tags"
        loading={loading}
        textField={textField}
      />
    </div>
  );
}

export default withPolarisExample(AutocompleteActionBeforeExample);
