---
name: Autocomplete
category: Forms
keywords:
  - autocomplete
  - searchable
  - typeahead
---

# Autocomplete

The autocomplete component is an input field that provides selectable suggestions as a merchant types into it. It allows merchants to quickly search through and select from large collections of options.

---

## Best practices

The autocomplete component should:

- Be clearly labeled so it’s obvious to the merchant what type of options will be available
- Limit the number of options displayed at once
- Not be used within a popover
- Indicate a loading state to the merchant while option data is being populated

---

## Content guidelines

### Input field

- Follow the [text field component](/components/forms/text-field)'s content guidelines

---

## Examples

### Basic autocomplete

Use to help merchants complete text input quickly from a list of options.

```jsx
class AutocompleteExample extends React.Component {
  options = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];

  state = {
    selected: [],
    inputText: '',
    options: this.options,
  };

  render() {
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label=""
        value={this.state.inputText}
        prefix={<Icon source="search" color="inkLighter" />}
        placeholder="Search"
      />
    );
    return (
      <div style={{height: '225px'}}>
        <Autocomplete
          options={this.state.options}
          selected={this.state.selected}
          onSelect={this.updateSelection}
          textField={textField}
        />
      </div>
    );
  }

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  filterAndUpdateOptions = (inputString) => {
    if (inputString === '') {
      this.setState({
        options: this.options,
      });
      return;
    }

    const filterRegex = new RegExp(inputString, 'i');
    const resultOptions = this.options.filter((option) =>
      option.label.match(filterRegex),
    );
    this.setState({
      options: resultOptions,
    });
  };

  updateSelection = (updatedSelection) => {
    const selectedText = updatedSelection.map((selectedItem) => {
      const matchedOption = this.options.filter((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption[0] && matchedOption[0].label;
    });
    this.setState({selected: selectedText, inputText: selectedText});
  };
}
```

### Multiple tags autocomplete

Use to help merchants select multiple options from a list curated by the text input.

```jsx
class MultiAutocompleteExample extends React.Component {
  options = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];

  state = {
    selected: [],
    inputText: '',
    options: this.options,
  };

  render() {
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label=""
        value={this.state.inputText}
        placeholder="Vintage, cotton, summer"
      />
    );
    return (
      <div style={{height: '325px'}}>
        <TextContainer>
          <Stack>{this.renderTags()}</Stack>
        </TextContainer>
        <br />
        <Autocomplete
          allowMultiple
          options={this.state.options}
          selected={this.state.selected}
          textField={textField}
          onSelect={this.updateSelection}
          listTitle="Suggested Tags"
        />
      </div>
    );
  }

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  removeTag = (tag) => {
    let newSelected = this.state.selected;
    newSelected.splice(newSelected.indexOf(tag), 1);
    this.setState({selected: newSelected});
  };

  renderTags = () => {
    return this.state.selected.map((option) => {
      let tagLabel = '';
      tagLabel = option.replace('_', ' ');
      tagLabel = titleCase(tagLabel);
      return (
        <Tag key={'option' + option} onRemove={() => this.removeTag(option)}>
          {tagLabel}
        </Tag>
      );
    });
  };

  filterAndUpdateOptions = (inputString) => {
    if (inputString === '') {
      this.setState({
        options: this.options,
      });
      return;
    }

    const filterRegex = new RegExp(inputString, 'i');
    const resultOptions = this.options.filter((option) =>
      option.label.match(filterRegex),
    );
    let endIndex = resultOptions.length - 1;
    if (resultOptions.length === 0) {
      endIndex = 0;
    }
    this.setState({
      options: resultOptions,
    });
  };

  updateSelection = (updatedSelection) => {
    this.setState({selected: updatedSelection});
  };
}

function titleCase(string) {
  string = string
    .toLowerCase()
    .split(' ')
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    });
  return string.join(' ');
}
```

### Autocomplete with loading

Use to indicate loading state to merchants while option data is processing.

```jsx
class AutocompleteExample extends React.Component {
  options = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];

  state = {
    selected: [],
    inputText: '',
    options: this.options,
    loading: false,
  };

  render() {
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label=""
        value={this.state.inputText}
        prefix={<Icon source="search" color="inkLighter" />}
        placeholder="Search"
      />
    );
    return (
      <div style={{height: '225px'}}>
        <Autocomplete
          options={this.state.options}
          selected={this.state.selected}
          onSelect={this.updateSelection}
          loading={this.state.loading}
          textField={textField}
        />
      </div>
    );
  }

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  filterAndUpdateOptions = (inputString) => {
    if (!this.state.loading) {
      this.setState({loading: true});
    }

    setTimeout(() => {
      if (inputString === '') {
        this.setState({
          options: this.options,
          loading: false,
        });
        return;
      }
      const filterRegex = new RegExp(inputString, 'i');
      const resultOptions = this.options.filter((option) =>
        option.label.match(filterRegex),
      );
      this.setState({
        options: resultOptions,
        loading: false,
      });
    }, 300);
  };

  updateSelection = (updatedSelection) => {
    const selectedText = updatedSelection.map((selectedItem) => {
      const matchedOption = this.options.filter((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption[0] && matchedOption[0].label;
    });
    this.setState({selected: selectedText, inputText: selectedText});
  };
}
```

### Autocomplete with empty state

Use to indicate there are no search results.

```jsx
class AutocompleteExample extends React.Component {
  options = [
    {value: 'rustic', label: 'Rustic'},
    {value: 'antique', label: 'Antique'},
    {value: 'vinyl', label: 'Vinyl'},
    {value: 'vintage', label: 'Vintage'},
    {value: 'refurbished', label: 'Refurbished'},
  ];

  state = {
    selected: [],
    inputText: '',
    options: this.options,
    loading: false,
  };

  render() {
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label=""
        value={this.state.inputText}
        prefix={<Icon source="search" color="inkLighter" />}
        placeholder="Search"
      />
    );
    const emptyState = (
      <React.Fragment>
        <Icon source="search" />
        <div style={{textAlign: 'center'}}>
          <TextContainer>Could not find any results</TextContainer>
        </div>
      </React.Fragment>
    );
    return (
      <div style={{height: '225px'}}>
        <Autocomplete
          options={this.state.options}
          selected={this.state.selected}
          onSelect={this.updateSelection}
          emptyState={emptyState}
          loading={this.state.loading}
          textField={textField}
        />
      </div>
    );
  }

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  filterAndUpdateOptions = (inputString) => {
    if (!this.state.loading) {
      this.setState({loading: true});
    }

    setTimeout(() => {
      if (inputString === '') {
        this.setState({
          options: this.options,
          loading: false,
        });
        return;
      }
      const filterRegex = new RegExp(inputString, 'i');
      const resultOptions = this.options.filter((option) =>
        option.label.match(filterRegex),
      );
      this.setState({
        options: resultOptions,
        loading: false,
      });
    }, 300);
  };

  updateSelection = (updatedSelection) => {
    const selectedText = updatedSelection.map((selectedItem) => {
      const matchedOption = this.options.filter((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption[0] && matchedOption[0].label;
    });
    this.setState({selected: selectedText, inputText: selectedText});
  };
}
```

---

## Related components

- For an input field without suggested options, [use the text field component](/components/forms/text-field)
- For a list of selectable options not linked to an input field, [use the option list component](/components/lists-and-tables/option-list)
