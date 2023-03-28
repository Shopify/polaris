import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchMinor} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

type Section = {
  title: string;
  options: {
    value: string;
    label: string;
  }[];
};

function AutocompleteExample() {
  const deselectedOptions = useMemo(
    (): Section[] => [
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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions: Section[] = [];

      deselectedOptions.forEach((opt) => {
        const options = opt.options.filter((option) =>
          option.label.match(filterRegex),
        );

        resultOptions.push({
          title: opt.title,
          options,
        });
      });

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      let selectedValue: string | undefined;

      options.forEach(({options}) => {
        if (selectedValue) {
          return;
        }

        const matchedOption = options.find((option) =>
          option.value.match(selected[0]),
        );

        if (matchedOption) {
          selectedValue = matchedOption.label;
        }
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue ? selectedValue : '');
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
      autoComplete="off"
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
