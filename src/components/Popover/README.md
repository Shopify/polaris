---
name: Popover
category: Overlays
platforms:
  - android
  - ios
  - web
keywords:
  - interactive
  - container
  - dropdown
  - drop down
  - drop-down
  - popover
  - pop over
  - menu
  - fly out
  - select
  - action list
  - menu
  - context menu
  - popover with form components
  - popover with action list
  - popover with content and actions
  - action sheet
  - ios
  - android
---

# Popover

Popovers are small overlays that open on demand. They let merchants access additional content and actions without cluttering the page.

---

## Best practices

Popovers should:

- Always be positioned next to the button or other interface element that triggers them
- Be used for secondary or less important information and actions since they’re hidden until merchants hit the trigger
- Contain navigation or actions that share a relationships to each other
- Be triggered by a clearly labeled button

---

## Content guidelines

### Popover content

If a popover contains actions, they should:

- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive merchants by mislabeling an action.

<!-- usagelist -->

#### Do

- Create order
- Buy shipping label

#### Don’t

- New order
- Buy

<!-- end -->

- Be action-led: buttons should always lead with a strong verb that encourages action. To provide enough context to merchants use the {verb}+{noun} format on buttons except in the case of common actions like Save, Close, Cancel, or OK.

<!-- usagelist -->

#### Do

- Rename
- Edit HTML
- Duplicate

#### Don’t

- HTML editing options
- File name changes
- Duplicate this order so that you can make edits, updates, or changes

<!-- end -->

- Be scannable, especially when the popover contains a list of actions or options. Avoid unnecessary words and articles such as “the”, “an”, or “a”.

<!-- usagelist -->

#### Do

- Add menu item

#### Don’t

- Add a menu item

<!-- end -->

If the popover includes a series of navigational links, each item should:

- Be concise but still give merchants enough information so they can easily find and accurately navigate to the path they want.

<!-- usagelist -->

#### Do

- Online store
- Messenger
- Facebook
- Buy Button

#### Don’t

- Sales channel

<!-- end -->

---

## Examples

### Popover with action list

Use when presenting a set of actions in a disclosable menu.

```jsx
class PopoverExample extends React.Component {
  state = {
    active: true,
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  };

  render() {
    const activator = (
      <Button onClick={this.togglePopover}>More actions</Button>
    );

    return (
      <div style={{height: '250px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
        >
          <ActionList items={[{content: 'Import'}, {content: 'Export'}]} />
        </Popover>
      </div>
    );
  }
}
```

<!-- content-for: android -->

![Popover with action list for Android](/public_images/components/Popover/android/action-list@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Popover with action list for iOS](/public_images/components/Popover/ios/action-list@2x.png)

<!-- /content-for -->

### Popover with content and actions

Use to present a combination of content, instructions, and actions in a panel for tasks that are of low or secondary importance to the current page. When used this way, popovers provide useful entry points to related features without overwhelming merchants.

```jsx
class PopoverContentExample extends React.Component {
  state = {
    active: true,
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  };

  render() {
    const activator = (
      <Button onClick={this.togglePopover}>Sales channels</Button>
    );

    return (
      <div style={{height: '250px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
        >
          <Popover.Pane fixed>
            <Popover.Section>
              <p>Available sales channels</p>
            </Popover.Section>
          </Popover.Pane>
          <Popover.Pane>
            <ActionList
              items={[
                {content: 'Online store'},
                {content: 'Facebook'},
                {content: 'Shopify POS'},
              ]}
            />
          </Popover.Pane>
        </Popover>
      </div>
    );
  }
}
```

<!-- content-for: android -->

![Popover with content and actions for Android](/public_images/components/Popover/android/action-content@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Popover with content and actions for iOS](/public_images/components/Popover/ios/action-content@2x.png)

<!-- /content-for -->

### Popover with form components

<!-- example-for: web -->

Use to present secondary input tasks on demand.

```jsx
class PopoverFormExample extends React.Component {
  state = {
    active: true,
    tagValue: '',
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  };

  handleTagChange = (value) => {
    this.setState({
      tagValue: value,
    });
  };

  render() {
    const activator = (
      <Button onClick={this.togglePopover} disclosure>
        Filter
      </Button>
    );

    return (
      <div style={{height: '280px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
          sectioned
        >
          <FormLayout>
            <Select
              label="Show all customers where:"
              options={['Tagged with']}
            />
            <TextField
              label="Tags"
              value={this.state.tagValue}
              onChange={this.handleTagChange}
            />
            <Button size="slim">Add filter</Button>
          </FormLayout>
        </Popover>
      </div>
    );
  }
}
```

### Action sheet

<!-- example-for: ios -->

Use when you have few actions that affects the whole page. Action sheets doesn’t support icons or additional information.

<!-- content-for: ios -->

![iOS action sheet](/public_images/components/Popover/ios/action-sheet@2x.png)

<!-- /content-for -->

---

## Related components

- To put a list of actions in a popover, [use the action list component](/components/actions/action-list)
- To let merchants select simple options from a list, [use the select component](/components/forms/select)
