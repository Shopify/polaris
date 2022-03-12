import React, {useState, useCallback, useEffect} from 'react';
import {CirclePlusMinor} from '@shopify/polaris-icons';

import {Page, Combobox, Listbox, TextStyle} from '../src';

const tags = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
];

export function Playground() {
  const [query, setQuery] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [selection, setSelection] = useState({start: 0, end: 0});
  const [selectedTags, setSelectedTags] = useState(tags.slice(3, 7));
  const [filteredTags, setFilteredTags] = useState<string[]>(tags.slice(3, 7));

  const handleSuggestion = useCallback((activeOption, query) => {
    setSuggestion(activeOption);
    setSelection({
      start: query.length,
      end: activeOption.length,
    });
  }, []);

  const handleFilterOptions = useCallback(
    (query: string) => {
      if (query === '') {
        setFilteredTags(selectedTags);

        if (selectedTags.length) handleSuggestion(selectedTags[0], query);
        return;
      }

      const filterRegex = new RegExp(query, 'i');
      const nextFilteredTags = tags.filter((option) =>
        option.match(filterRegex),
      );

      setFilteredTags(nextFilteredTags);

      if (nextFilteredTags.length > 0) {
        handleSuggestion(nextFilteredTags[0], query);
      }
    },
    [selectedTags, handleSuggestion],
  );

  const handleInputChange = useCallback((value) => {
    setQuery(value);
    setSuggestion('');
  }, []);

  useEffect(() => {
    handleFilterOptions(query);
  }, [query, handleFilterOptions]);

  const handleActiveOptionChange = useCallback(
    (option) => {
      setSuggestion(option);
      setSelection(() => ({
        start: query ? query.length : 0,
        end: option.length,
      }));
    },
    [query],
  );

  const handleSelect = useCallback(
    (selected) => {
      if (selectedTags.includes(selected)) {
        setSelectedTags(selectedTags.filter((option) => option !== selected));
      } else {
        setSelectedTags([selected, ...selectedTags]);
        handleInputChange('');
      }
    },
    [selectedTags, handleInputChange],
  );

  const formatOption = useCallback(
    (option) => {
      if (!query) return option;

      const matchIndex = option.toLowerCase().indexOf(query);
      const start = option.slice(0, matchIndex);
      const highlight = option.slice(matchIndex, matchIndex + query.length);
      const end = option.slice(matchIndex + query.length, option.length);

      return (
        <p>
          {start}
          <TextStyle variation="strong">{highlight}</TextStyle>
          {end}
        </p>
      );
    },
    [query],
  );

  const inputValue =
    query && suggestion.includes(query) && suggestion !== query
      ? suggestion
      : query;

  const input = (
    <Combobox.TextField
      labelHidden
      typeahead
      disabled={false}
      label="Tags"
      value={inputValue}
      type="text"
      autoComplete="on"
      ariaAutocomplete="list"
      selection={selection}
      onChange={handleInputChange}
    />
  );

  const createActionMarkup = query ? (
    <Listbox.Action
      accessibilityLabel={`Add: ${query}`}
      value={query}
      icon={CirclePlusMinor}
    >
      <p>
        <TextStyle variation="strong">Add: </TextStyle>
        {query}
      </p>
    </Listbox.Action>
  ) : null;

  const optionMarkup =
    filteredTags.length > 0
      ? filteredTags.map((option) => {
          return (
            <Listbox.Option key={option} value={option}>
              <Listbox.TextOption selected={selectedTags.includes(option)}>
                {formatOption(option)}
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })
      : null;

  const listboxMarkup =
    optionMarkup || createActionMarkup ? (
      <Listbox
        accessibilityLabel="Find or create tags"
        onSelect={handleSelect}
        onActiveOptionChange={handleActiveOptionChange}
        enableKeyboardControl
      >
        {optionMarkup}
        {createActionMarkup}
      </Listbox>
    ) : null;

  return (
    <Page title="Playground">
      <Combobox activator={input} allowMultiple>
        {listboxMarkup}
      </Combobox>
    </Page>
  );
}
