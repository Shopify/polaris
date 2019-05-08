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
        label="Tags"
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

  updateSelection = (selected) => {
    const selectedText = selected.map((selectedItem) => {
      const matchedOption = this.options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });
    this.setState({selected, inputText: selectedText});
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
        label="Tags"
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
    const {selected: newSelected} = this.state;
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

  updateSelection = (selected) => this.setState({selected});
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
        label="Tags"
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

  updateSelection = (selected) => {
    const selectedText = selected.map((selectedItem) => {
      const matchedOption = this.options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });
    this.setState({selected, inputText: selectedText});
  };
}
```

### Autocomplete with lazy loading

```jsx
class AutoCompleteLazyLoadExample extends React.Component {
  paginationInterval = 25;

  options = Array.from(Array(100)).map((_, index) => ({
    value: `rustic ${index}`,
    label: `Rustic ${index}`,
  }));

  state = {
    selected: [],
    inputText: '',
    options: this.options,
    visibleOptionIndex: this.paginationInterval,
  };

  render() {
    const {visibleOptionIndex, selected, options} = this.state;
    const textField = (
      <Autocomplete.TextField
        onChange={this.updateText}
        label="Tags"
        value={this.state.inputText}
        placeholder="Vintage, cotton, summer"
      />
    );

    const optionList = options.slice(0, visibleOptionIndex);
    const selectedTagMarkup =
      selected.length > 0 ? (
        <Stack spacing="extraTight">{this.renderTags()}</Stack>
      ) : null;

    return (
      <Stack vertical>
        {selectedTagMarkup}
        <Autocomplete
          allowMultiple
          options={optionList}
          selected={this.state.selected}
          textField={textField}
          onSelect={this.updateSelection}
          listTitle="Suggested Tags"
          onLoadMoreResults={this.handleLoadMoreResults}
        />
      </Stack>
    );
  }

  handleLoadMoreResults = () => {
    const {visibleOptionIndex} = this.state;
    const nextVisibleOptionIndex = visibleOptionIndex + this.paginationInterval;
    if (nextVisibleOptionIndex <= this.options.length - 1) {
      this.setState({visibleOptionIndex: nextVisibleOptionIndex});
    }
  };

  updateText = (newValue) => {
    this.setState({inputText: newValue});
    this.filterAndUpdateOptions(newValue);
  };

  removeTag = (tag) => () => {
    const {selected: newSelected} = this.state;
    newSelected.splice(newSelected.indexOf(tag), 1);
    this.setState({selected: newSelected});
  };

  renderTags = () => {
    return this.state.selected.map((option) => {
      let tagLabel = '';
      tagLabel = option.replace('_', ' ');
      tagLabel = titleCase(tagLabel);
      return (
        <Tag key={`option${option}`} onRemove={this.removeTag(option)}>
          {tagLabel}
        </Tag>
      );
    });
  };

  filterAndUpdateOptions = (inputString) => {
    if (inputString === '') {
      this.setState({options: this.options});

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

    this.updateOptions(resultOptions);
  };

  updateOptions = (options) => {
    this.setState({options: resultOptions});
  };

  updateSelection = (selected) => this.setState({selected});
}

function titleCase(string) {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
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
        label="Tags"
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

  updateSelection = (selected) => {
    const selectedText = selected.map((selectedItem) => {
      const matchedOption = this.options.find((option) => {
        return option.value.match(selectedItem);
      });
      return matchedOption && matchedOption.label;
    });
    this.setState({selected, inputText: selectedText});
  };
}
```

---

## Related components

- For an input field without suggested options, [use the text field component](/components/forms/text-field)
- For a list of selectable options not linked to an input field, [use the option list component](/components/lists-and-tables/option-list)

---

## Accessibility

<!-- content-for: android -->

See Material Design and development documentation about accessibility for Android:

- [Accessible design on Android](https://material.io/design/usability/accessibility.html)
- [Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility/)

<!-- /content-for -->

<!-- content-for: ios -->

See Apple’s Human Interface Guidelines and API documentation about accessibility for iOS:

- [Accessible design on iOS](https://developer.apple.com/design/human-interface-guidelines/ios/app-architecture/accessibility/)
- [Accessible development on iOS](https://developer.apple.com/accessibility/ios/)

<!-- /content-for -->

<!-- content-for: web -->

### Structure

The autocomplete component is based on the [ARIA 1.1 combobox pattern](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox). See the [text field component](https://polaris.shopify.com/components/forms/text-field) for information on implementing the autocomplete component with a text field.

The autocomplete list displays below the text field or other control by default so it is easy for merchants to discover and use. However, you can change the position with the `preferredPosition` prop.

Autocomplete features can be challenging for merchants with visual, motor, and cognitive disabilities. Even when they’re built using best practices, these features can be difficult to use with some assistive technologies. Merchants should always be able to search, enter data, or perform other activities without relying on the autocomplete.

<!-- usageblock -->

#### Do

Use autocomplete as progressive enhancement to make the interface easier to use for most merchants.

#### Don’t

Require that merchants make a selection from the autocomplete to complete a task.

<!-- end -->

### Keyboard support

- Give the autocomplete text input keyboard focus with the <kbd>tab</kbd> key (or <kbd>shift</kbd> + <kbd>tab</kbd> when tabbing backwards)
- Access the list of options with the up and down arrow keys
- Select an option that has focus with the <kbd>enter</kbd>/<kbd>return</kbd> key

<!-- /content-for -->
