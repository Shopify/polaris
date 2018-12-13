---
name: Checkbox
category: Forms
platforms:
  - android
  - ios
  - web
keywords:
  - accept
  - decline
  - terms
  - input
  - multiple choice lists
  - terms and services
  - checkboxes
  - check boxes
  - multiple selections
  - form selections
  - multi-choice lists
---

# Checkbox

Checkboxes are most commonly used to give merchants a way to make a range of selections (zero, one, or multiple). They may also be used as a way to have merchants indicate they agree to specific terms and services.

---

## Best practices

Checkboxes should:

- Work independently from each other: selecting one checkbox shouldn’t change
  the selection status of another checkbox in the list. The exception is when a
  checkbox is used to make a bulk selection of multiple items.
- Be framed positively: for example, `Turn on notifications` instead of
  `Turn off notifications`
- Always have a label when being used to toggling a setting on or off
- Be listed according to a logical order, whether it’s alphabetical, numerical,
  time-based, or some other clear system.
- Link to more information or include a subtitle as required to provide more
  explanation. Don’t rely on tooltips to explain a checkbox.

---

## Content guidelines

### Lists with checkboxes

Lists that use checkboxes should:

- Start with a capital letter

<!-- usageblock -->

#### Do

- Option 1
- Option 2
- Option 3

#### Don’t

- option 1
- option 2
- option 3

<!-- end -->

- Not use commas or semicolons at the end of each line

<!-- usageblock -->

#### Do

- Red
- Yellow
- Blue

#### Don’t

- Red;
- Yellow;
- Blue.

<!-- end -->

- In the rare case where the checkbox is asking merchants to agree to terms
  or service, use the first person

<!-- usageblock -->

#### Do

I agree to the Terms of Service.

#### Don’t

You agree to the Terms of Service

<!-- end -->

---

## Examples

### Default checkboxes

Use in forms to toggle the state of something on or off. Default checkboxes can appear in two states: selected and disabled, or unselected.

```jsx
class CheckboxExample extends React.Component {
  state = {
    checked: false,
  };

  render() {
    const {checked} = this.state;

    return (
      <Checkbox
        checked={checked}
        label="Basic checkbox"
        onChange={this.handleChange}
      />
    );
  }

  handleChange = (value) => {
    this.setState({checked: value});
  };
}
```

<!-- content-for: android -->

![Default checkbox on Android](/public_images/components/Checkbox/android/default@2x.png)

<!-- /content-for -->

<!-- content-for: ios -->

![Default checkbox on iOS](/public_images/components/Checkbox/ios/default@2x.png)

<!-- /content-for -->

---

## Related components

- To present a list of options where merchants can only make a single choice, [use the radio button component](/components/forms/radio-button)
- To display a list of related content, [use the choice list component](/components/forms/choice-list)
- To create an ungrouped list, [use the content list component](/components/lists-and-tables/list)
