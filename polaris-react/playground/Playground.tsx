// import React, {useCallback, useState} from 'react';

// import {ActionList, Listbox, Button, Popover} from '../src';

// export function Playground() {
//   const [popoverActive, setPopoverActive] = useState('');

//   const togglePopoverActive = useCallback(
//     (popoverName) => () => setPopoverActive(popoverName),
//     [],
//   );

//   const activatorListbox = (
//     <Button onClick={togglePopoverActive('listbox')} disclosure>
//       View list
//     </Button>
//   );

//   const activatorActionList = (
//     <Button onClick={togglePopoverActive('actionList')} disclosure>
//       View actions
//     </Button>
//   );

//   return (
//     <div style={{height: '250px'}}>
//       <Popover
//         fullWidth
//         fluidContent
//         active={popoverActive === 'listbox'}
//         activator={activatorListbox}
//         autofocusTarget="first-node"
//         onClose={togglePopoverActive('')}
//       >
//         <Popover.Pane>
//           <div style={{height: '150px', padding: '4px 2px'}}>
//             <Listbox accessibilityLabel="Basic Listbox example">
//               <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
//               <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
//               <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
//               <Listbox.Option value="UniqueValue-1">Item 4</Listbox.Option>
//               <Listbox.Option value="UniqueValue-2">Item 5</Listbox.Option>
//               <Listbox.Option value="UniqueValue-3">Item 6</Listbox.Option>
//               <Listbox.Option value="UniqueValue-1">Item 7</Listbox.Option>
//               <Listbox.Option value="UniqueValue-2">Item 8</Listbox.Option>
//               <Listbox.Option value="UniqueValue-3">Item 9</Listbox.Option>
//               <Listbox.Option value="UniqueValue-1">Item 10</Listbox.Option>
//               <Listbox.Option value="UniqueValue-2">Item 11</Listbox.Option>
//               <Listbox.Option value="UniqueValue-3">Item 12</Listbox.Option>
//               <Listbox.Option value="UniqueValue-1">Item 13</Listbox.Option>
//               <Listbox.Option value="UniqueValue-2">Item 14</Listbox.Option>
//               <Listbox.Option value="UniqueValue-3">Item 15</Listbox.Option>
//             </Listbox>
//           </div>
//         </Popover.Pane>
//       </Popover>

//       <Popover
//         fullWidth
//         fluidContent
//         active={popoverActive === 'actionList'}
//         activator={activatorActionList}
//         autofocusTarget="first-node"
//         onClose={togglePopoverActive('')}
//       >
//         <Popover.Pane>
//           <div style={{height: '150px'}}>
//             <ActionList
//               actionRole="menuitem"
//               items={[
//                 {content: 'Export 1'},
//                 {content: 'Export 2'},
//                 {content: 'Export 3'},
//                 {content: 'Export 4'},
//                 {content: 'Export 5'},
//                 {content: 'Export 6'},
//                 {content: 'Export 7'},
//                 {content: 'Export 8'},
//               ]}
//             />
//           </div>
//         </Popover.Pane>
//       </Popover>
//     </div>
//   );
// }

/* Multiselect playground */

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
].sort();

export function Playground() {
  const [disableAll, setDisableAll] = useState(true)
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [selectedTags, setSelectedTags] = useState(tags.slice(3, 7));
  const [filteredTags, setFilteredTags] = useState(tags.slice(3, 7));

  const handleSuggestion = useCallback(
    (activeOption) => {
      if (query && !activeOption.disabled) setSuggestion(activeOption);
    },
    [query],
  );

  const handleFilterOptions = useCallback(
    (query: string) => {
      if (query === '') {
        setFilteredTags(selectedTags);

        if (selectedTags.length) handleSuggestion(selectedTags[0]);
        return;
      }

      const nextFilteredTags = tags.filter((option) =>
        option.startsWith(query),
      );

      setFilteredTags(nextFilteredTags);

      if (nextFilteredTags.length > 0) {
        handleSuggestion(nextFilteredTags[0]);
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

  const handleActiveOptionChange = useCallback((option) => {
    setSuggestion(option);
  }, []);

  const handleSelect = useCallback(
    (selected) => {
      console.log(`Selected option "${selected}"`);
      if (selectedTags.includes(selected)) {
        setSelectedTags(selectedTags.filter((option) => option !== selected));
      } else {
        setSelectedTags([selected, ...selectedTags].sort());

        if (!tags.includes(selected)) {
          tags.push(selected);
          tags.sort();
        }
      }

      handleInputChange('');
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

  const handleDisableAll = useCallback(() => {
    setDisableAll(disabled => !disabled )
  }, [disableAll])

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

  console.log(`Value: ${query}, Suggestion: ${suggestion}`);

  const optionMarkup =
    filteredTags.length > 0
      ? filteredTags.map((option, index) => {
          return (
            <Listbox.Option key={option} value={option} disabled={disableAll || index % 2 === 0}>
              <Listbox.TextOption selected={selectedTags.includes(option)} disabled={disableAll || index % 2 === 0}>
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
    <Page title="Playground" primaryAction={{content: `Disable all options ${disableAll ? 'on' : 'off'}`, onAction: handleDisableAll}}>
      <Combobox activator={input} allowMultiple>
        {listboxMarkup}
      </Combobox>
    </Page>
  );
}
