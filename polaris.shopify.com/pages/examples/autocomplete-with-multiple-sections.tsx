import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AutocompleteExample() {
  const deselectedOptions = useMemo(
    () => [
      {
        title: 'Frequently used',
        options: [
          {value: 'ups', label: 'UPS'},
          {value: 'usps', label: 'USPS'},
        ],
      },
      {
        title: 'All carriers',
        options: [
          {value: 'dhl', label: 'DHL Express'},
          {value: 'canada_post', label: 'Canada Post'},
        ],
      },
    ],
    [],
  );
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = [];

      deselectedOptions.forEach((opt) => {
        const lol = opt.options.filter((option) =>
          option.label.match(filterRegex),
        );

        resultOptions.push({
          title: opt.title,
          options: lol,
        });
      });

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    ([selected]) => {
      let selectedValue;

      options.forEach(({options: opt}) => {
        if (selectedValue) {
          return;
        }

        const matchedOption = opt.find((option) =>
          option.value.match(selected),
        );

        if (matchedOption) {
          selectedValue = matchedOption.label;
        }
      });

      setSelectedOptions([selected]);
      setInputValue(String(selectedValue) ? String(selectedValue) : '');
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <div style={{height: '225px'}}>
      <Autocomplete
        textField={textField}
        selected={selectedOptions}
        options={options}
        onSelect={updateSelection}
      />
    </div>
  );
}

export default withPolarisExample(AutocompleteExample);
