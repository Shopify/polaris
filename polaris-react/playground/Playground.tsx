import React, {useState, useCallback, useEffect} from 'react';
import {CirclePlusMinor} from '@shopify/polaris-icons';

import {Page, Combobox, Listbox, TextStyle, Card} from '../src';

export function Playground() {
  return (
    <Page title="Multiselect autocomplete playground">
      <Card>
        <Card.Section title="No options disabled">
          <ComboboxNoOptionsDisabled />
        </Card.Section>
        <Card.Section title="Some options disabled">
          <ComboboxSomeOptionsDisabled />
        </Card.Section>
        <Card.Section title="All options disabled">
          <ComboboxAllOptionsDisabled />
        </Card.Section>
      </Card>
    </Page>
  );
}

function ComboboxNoOptionsDisabled() {
  const initialTags = [
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
  ].sort();

  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [tags, setTags] = useState(initialTags);
  const [selectedTags, setSelectedTags] = useState(initialTags.slice(3, 7));
  const [filteredTags, setFilteredTags] = useState(initialTags.slice(3, 7));

  const handleSuggestion = useCallback(
    (activeOption) => {
      if (query && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
      }
    },
    [query, selectedTags],
  );

  const handleFilterOptions = useCallback(
    (query: string) => {
      if (query === '') {
        setFilteredTags(selectedTags);

        if (selectedTags.length) handleSuggestion(selectedTags[0]);
        return;
      }

      const nextFilteredTags = tags.filter((option) =>
        option.toLowerCase().startsWith(query.toLowerCase()),
      );

      setFilteredTags(nextFilteredTags);

      if (nextFilteredTags.length > 0) {
        handleSuggestion(nextFilteredTags[0]);
      }
    },
    [tags, selectedTags, handleSuggestion],
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
      handleSuggestion(option);
    },
    [handleSuggestion],
  );

  const handleSelect = useCallback(
    (selected) => {
      if (selectedTags.includes(selected)) {
        setSelectedTags(selectedTags.filter((option) => option !== selected));
      } else {
        setSelectedTags([selected, ...selectedTags].sort());

        if (!tags.includes(selected)) {
          setTags([...tags, selected].sort());
        }
      }

      handleInputChange('');
    },
    [tags, selectedTags, handleInputChange],
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

  const input = (
    <Combobox.TextField
      labelHidden
      suggestion={suggestion}
      disabled={false}
      label="Tags"
      value={query}
      type="text"
      autoComplete="on"
      ariaAutocomplete="list"
      onChange={handleInputChange}
    />
  );

  const createActionMarkup =
    query && !tags.includes(query) ? (
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
    <Combobox activator={input} allowMultiple>
      {listboxMarkup}
    </Combobox>
  );
}

function ComboboxSomeOptionsDisabled() {
  const initialTags = [
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
  ].sort();

  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [tags, setTags] = useState(initialTags);
  const [selectedTags, setSelectedTags] = useState(initialTags.slice(3, 7));
  const [filteredTags, setFilteredTags] = useState(initialTags.slice(3, 7));

  const handleSuggestion = useCallback(
    (activeOption) => {
      if (query && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
      }
    },
    [query, selectedTags],
  );

  const handleFilterOptions = useCallback(
    (query: string) => {
      if (query === '') {
        setFilteredTags(selectedTags);

        if (selectedTags.length) handleSuggestion(selectedTags[0]);
        return;
      }

      const nextFilteredTags = tags.filter((option) =>
        option.toLowerCase().startsWith(query.toLowerCase()),
      );

      setFilteredTags(nextFilteredTags);

      if (nextFilteredTags.length > 0) {
        handleSuggestion(nextFilteredTags[0]);
      }
    },
    [tags, selectedTags, handleSuggestion],
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
      handleSuggestion(option);
    },
    [handleSuggestion],
  );

  const handleSelect = useCallback(
    (selected) => {
      if (selectedTags.includes(selected)) {
        setSelectedTags(selectedTags.filter((option) => option !== selected));
      } else {
        setSelectedTags([selected, ...selectedTags].sort());

        if (!tags.includes(selected)) {
          setTags([...tags, selected].sort());
        }
      }

      handleInputChange('');
    },
    [tags, selectedTags, handleInputChange],
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

  const input = (
    <Combobox.TextField
      labelHidden
      suggestion={suggestion}
      disabled={false}
      label="Tags"
      value={query}
      type="text"
      autoComplete="on"
      ariaAutocomplete="list"
      helpText="Note this example is only here to demonstrate that disabled options are not be navigable and skipped when navigable options are present"
      onChange={handleInputChange}
    />
  );

  const createActionMarkup =
    query && !tags.includes(query) ? (
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
      ? filteredTags.map((option, index) => {
          return (
            <Listbox.Option
              key={option}
              value={option}
              disabled={index % 2 === 0}
            >
              <Listbox.TextOption
                selected={selectedTags.includes(option)}
                disabled={index % 2 === 0}
              >
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
    <Combobox activator={input} allowMultiple>
      {listboxMarkup}
    </Combobox>
  );
}

function ComboboxAllOptionsDisabled() {
  const initialTags = [
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
  ].sort();

  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [tags, setTags] = useState(initialTags);
  const [selectedTags, setSelectedTags] = useState(initialTags.slice(3, 7));
  const [filteredTags, setFilteredTags] = useState(initialTags.slice(3, 7));

  const handleSuggestion = useCallback(
    (activeOption) => {
      if (query && !selectedTags.includes(activeOption)) {
        setSuggestion(activeOption);
      }
    },
    [query, selectedTags],
  );

  const handleFilterOptions = useCallback(
    (query: string) => {
      if (query === '') {
        setFilteredTags(selectedTags);

        if (selectedTags.length) handleSuggestion(selectedTags[0]);
        return;
      }

      const nextFilteredTags = tags.filter((option) =>
        option.toLowerCase().startsWith(query.toLowerCase()),
      );

      setFilteredTags(nextFilteredTags);

      if (nextFilteredTags.length > 0) {
        handleSuggestion(nextFilteredTags[0]);
      }
    },
    [tags, selectedTags, handleSuggestion],
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
      handleSuggestion(option);
    },
    [handleSuggestion],
  );

  const handleSelect = useCallback(
    (selected) => {
      if (selectedTags.includes(selected)) {
        setSelectedTags(selectedTags.filter((option) => option !== selected));
      } else {
        setSelectedTags([selected, ...selectedTags].sort());

        if (!tags.includes(selected)) {
          setTags([...tags, selected].sort());
        }
      }

      handleInputChange('');
    },
    [tags, selectedTags, handleInputChange],
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

  const input = (
    <Combobox.TextField
      labelHidden
      suggestion={suggestion}
      disabled={false}
      label="Tags"
      value={query}
      type="text"
      autoComplete="on"
      ariaAutocomplete="list"
      helpText="Note this example is only here to demonstrate that disabled options are not be navigable"
      onChange={handleInputChange}
    />
  );

  const createActionMarkup =
    query && !tags.includes(query) ? (
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
            <Listbox.Option disabled key={option} value={option}>
              <Listbox.TextOption
                disabled
                selected={selectedTags.includes(option)}
              >
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
    <Combobox activator={input} allowMultiple>
      {listboxMarkup}
    </Combobox>
  );
}
