---
name: Option list
category: Lists and tables
keywords:
  - option list
  - choices
  - decision
  - list
  - list of tags
  - list of collections
  - collections lists
  - collection lists
  - list selection
---

# Option list

The option list component lets you create a list of grouped items that
merchants can pick from. This can include single selection or multiple selection
of options. Option list usually appears in a popover, and sometimes in a modal
or a sidebar. Option lists are styled differently than
[choice lists](/components/forms/choice-list) and should not be used within a form, but as a standalone menu.

---

## Best practices

The option list component should:

- Be placed on its own inside a container. Usually the container behaves like a
  menu, as it does with [popover](/components/overlays/popover). Don’t
  place other components within the same container.
- Not be used when a [select component](/components/forms/select) will do.

---

## Content guidelines

### Option lists

Each item in an option list should be clear and descriptive.

<!-- usagelist -->

#### Do

- Traffic referrer source

#### Don’t

- Source

<!-- end -->

---

## Examples

### Simple option list

Use for a group of similar selectable items when only one should be selectable at once.

```jsx
class OptionListExample extends React.Component {
  state = {selected: []};

  render() {
    return (
      <Card>
        <OptionList
          title="Inventory Location"
          onChange={(updated) => {
            this.setState({selected: updated});
          }}
          options={[
            {value: 'byward_market', label: 'Byward Market'},
            {value: 'centretown', label: 'Centretown'},
            {value: 'hintonburg', label: 'Hintonburg'},
            {value: 'westboro', label: 'Westboro'},
            {value: 'downtown', label: 'Downtown'},
          ]}
          selected={this.state.selected}
        />
      </Card>
    );
  }
}
```

### Multiple option list

Use when you have a group of similar selectable items and more than one item can be selected at once.

```jsx
class OptionListExample extends React.Component {
  state = {selected: []};

  render() {
    return (
      <Card>
        <OptionList
          title="Manage sales channels availability"
          onChange={(updated) => {
            this.setState({selected: updated});
          }}
          options={[
            {value: 'online_store', label: 'Online Store'},
            {value: 'messenger', label: 'Messenger'},
            {value: 'facebook', label: 'Facebook'},
            {value: 'wholesale', label: 'Wholesale'},
            {value: 'buzzfeed', label: 'BuzzFeed'},
          ]}
          selected={this.state.selected}
          allowMultiple
        />
      </Card>
    );
  }
}
```

### Option list with sections

Use sections when you have multiple groups of similar selectable items.

```jsx
class OptionListExample extends React.Component {
  state = {selected: []};

  render() {
    return (
      <Card>
        <OptionList
          onChange={(updated) => {
            this.setState({selected: updated});
          }}
          sections={[
            {
              options: [
                {value: 'type', label: 'Sale item type'},
                {value: 'kind', label: 'Sale kind'},
              ],
            },
            {
              title: 'Traffic',
              options: [
                {value: 'source', label: 'Traffic referrer source'},
                {value: 'host', label: 'Traffic referrer host'},
                {value: 'path', label: 'Traffic referrer path'},
              ],
            },
          ]}
          selected={this.state.selected}
          allowMultiple
        />
      </Card>
    );
  }
}
```

### Option list in a popover

Use when a set of selections won’t fit in the available screen space.

```jsx
class OptionListExample extends React.Component {
  state = {
    selected: [],
    popoverActive: true,
  };

  togglePopover = () => {
    this.setState(({popoverActive}) => {
      return {popoverActive: !popoverActive};
    });
  };

  render() {
    const activator = <Button onClick={this.togglePopover}>Options</Button>;

    return (
      <div style={{height: '275px'}}>
        <Popover
          active={this.state.popoverActive}
          activator={activator}
          onClose={this.togglePopover}
        >
          <OptionList
            title="Inventory Location"
            onChange={(updated) => {
              this.setState({selected: updated});
            }}
            options={[
              {value: 'byward_market', label: 'Byward Market'},
              {value: 'centretown', label: 'Centretown'},
              {value: 'hintonburg', label: 'Hintonburg'},
              {value: 'westboro', label: 'Westboro'},
              {value: 'downtown', label: 'Downtown'},
            ]}
            selected={this.state.selected}
          />
        </Popover>
      </div>
    );
  }
}
```

---

## Related components

- To render a list of actions,
  [use the action list component](/components/actions/action-list)
- To create a list of grouped radio buttons or checkboxes,
  [use the choice list component](/components/forms/choice-list)
- For a basic version of option list as a single choice menu,
  [use the select component](/components/forms/select)

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

Items in an option list are organized as list items (`<li>`) in an unordered list (`<ul>`) and are conveyed as a group of related elements to assistive technology users.

Controls in simple option lists are [buttons](/components/actions/button), and controls in multiple option lists are [checkboxes](/components/forms/checkbox).

If you customize the option list, you can provide ARIA roles that fit the context. These roles must be valid according to the [W3C ARIA specification](https://www.w3.org/TR/wai-aria-1.1/) to be conveyed correctly to screen reader users.

- The `role` prop adds an ARIA role to the option list wrapper
- The `optionRole` prop adds an ARIA role to the option list items

<!-- /content-for -->
