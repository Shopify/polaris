---
name: Popover
category: Overlays
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
---

# Popover

Popovers are small overlays that open on demand, usually when the merchant clicks a button. They let merchants access supplementary content and actions without cluttering the page.

---

## Best practices

Popovers should:

- Always show next to the button or other interface element that triggers them
- Be used for secondary or less important information and actions since they’re hidden until the merchant hits the trigger
- Contain navigation or actions that share a relationships to each other
- Be triggered by a clearly labeled button

---

## Content guidelines

### Popover content

If the menu items in a popover menu include a series of actions, each item should:

- Be clear and predictable: merchants should be able to anticipate what will happen when they click on an action item. Never deceive a merchant by mislabeling an action.

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

- Be scannable: avoid unnecessary words and articles such as the, an, or a.

<!-- usagelist -->
#### Do
Add menu item

#### Don’t
Add a menu item
<!-- end -->

If the menu items in a popover menu include a series of navigational links, each item should:

- Be concise but still give the merchant enough information so they can easily find and accurately navigate to the path they want.

<!-- usagelist -->
#### Do
- Online store
- Messenger
- Facebook
- Buy Button

#### Don’t
- Sales channel
<!-- end -->

## Examples

###  Popover with action list

Use when presenting a set of actions in a disclosable menu.

```jsx
class PopoverExample extends React.Component {
  state = {
    active: false,
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  }

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
          <ActionList
            items={[
              {content: 'Import'},
              {content: 'Export'},
            ]}
          />
        </Popover>
      </div>
    );
  }
}
```


###  Popover with content and actions

Use to present a combination of content, instructions, and actions is a panel for tasks that are of low or secondary importance to the current page. When used this way, popovers provide useful entry points to related features without overwhelming merchants.

```jsx
class PopoverContentExample extends React.Component {
  state = {
    active: false,
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  }

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

###  Popover with form components

Use to present secondary input tasks on demand.

```jsx
class PopoverFormExample extends React.Component {
  state = {
    active: false,
    tagValue: '',
  };

  togglePopover = () => {
    this.setState(({active}) => {
      return {active: !active};
    });
  }

  handleTagChange = (value) => {
    this.setState({
      tagValue: value,
    });
  }

  render() {
    const activator = (
      <Button onClick={this.togglePopover} disclosure>Filter</Button>
    );

    return (
      <div style={{height: '250px'}}>
        <Popover
          active={this.state.active}
          activator={activator}
          onClose={this.togglePopover}
          sectioned
        >
          <FormLayout>
            <Select label="Show all customers where:" options={['Tagged with']} />
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

---

## Related components

* To put a list of actions in a popover, [use the action list component](/components/actions/action-list)
* To group similar concepts and tasks together to make Shopify easier for merchants to scan, read, and take action on, [use the card component](/components/structure/card)
