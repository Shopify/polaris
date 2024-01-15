import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function AutocompleteExample() {
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === '') {
          setOptions(deselectedOptions);
          setLoading(false);
          return;
        }
        const filterRegex = new RegExp(value, 'i');
        const resultOptions = deselectedOptions.filter((option) =>
          option.label.match(filterRegex),
        );
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [deselectedOptions, loading],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedText = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      setSelectedOptions(selected);
      setInputValue(selectedText[0] || '');
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <div style={{height: '225px'}}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        loading={loading}
        textField={textField}
      />
    </div>
  );
}

export default withPolarisExample(AutocompleteExample);
