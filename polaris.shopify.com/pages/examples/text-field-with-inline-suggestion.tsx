import {TextField} from '@shopify/polaris';
import {useState, useCallback, useMemo} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function TextFieldWithSuggestionExample() {
  const suggestions = useMemo(
    () => [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Icon Outlying Islands',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'U.S. Virgin Islands',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ],
    [],
  );

  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState<string | undefined>();

  const handleChange = useCallback(
    (value: string) => {
      const suggestion =
        value &&
        suggestions.find((suggestion) =>
          suggestion.toLowerCase().startsWith(value.toLowerCase()),
        );

      setValue(value);
      setSuggestion(suggestion);
    },
    [suggestions],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Tab') {
        setValue(suggestion || value);
        setSuggestion('');
      } else if (event.key === 'Backspace') {
        setValue(value);
        setSuggestion('');
      }
    },
    [value, suggestion],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <TextField
        type="text"
        label="State"
        value={value}
        onChange={handleChange}
        suggestion={suggestion}
        autoComplete="off"
      />
    </div>
  );
}

export default withPolarisExample(TextFieldWithSuggestionExample);
