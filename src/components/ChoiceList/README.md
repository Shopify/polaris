---
name: Choice list
tags:
  - form
  - input
  - choices
  - select
category: Forms
---

# Choice list

A choice list lets you create a list of grouped radio buttons or checkboxes.
Use this component if you need to group together a related list of interactive
choices.

**Problem**

Merchants need to be able to select from a set of options that are related to
one another.

**Solution**

Grouping things together in a choice list is a way to visually present options
so that merchants can decide what to select.

>**Not what you’re looking for?**
>
> To display a simple, non-interactive list of related content,
[use the content list component](/components/tables-and-lists/list).
> You may also want to learn more about:
> * [Checkbox components](/components/forms/checkbox)
> * [Radio button components](/components/forms/radio-button)
> * [Resource list components](/components/tables-and-lists/resource-list)

---

## Best practices

Choice lists should:

* Use radio buttons when only a single selection can be made
* Use checkboxes when multiple selections can be made
* Be consistently and clearly labeled to help merchants understand how each
item in the list is related
* Often include an instructional title or heading that either tells the
merchant what to do, or helps to categorize or clarify the options that are
listed

---

## Content guidelines

### List titles

List titles should:

* Help merchants understand how the items in the list are grouped together, or
should explain what kind of choice the merchant is making

<!-- usagelist -->
#### Do
Pick a shipping method

#### Don't
Pick one
<!-- end -->

* Be concise and scannable:
  * Use simple, clear language that can be read at a glance
  * Keep list titles to a single sentence
  * It the title introduces the list, it should end with a colon
  * Should be written in sentence case

<!-- usagelist -->
#### Do
Shipping options

#### Don't
Shipping Options
<!-- end -->

### List choices

Every item in a choice list should:

* Start with a capital letter

<!-- usageblock -->
#### Do
- Option 1
- Option 2
- Option 3

#### Don't
- option 1
- option 2
- option 3
<!-- end -->

* Not use commas or semicolons at the end of each line

<!-- usageblock -->
#### Do
- Red
- Yellow
- Blue

#### Don't
- Red;
- Yellow;
- Blue.
<!-- end -->

- Be written in sentence case (the first word capitalized, the rest lowercase)

<!-- usageblock -->
#### Do
- Item one
- Item two
- Item three

#### Don't
- Item One
- Item Two
- Item Three
<!-- end -->

| Prop | Type | Description |
| ---- | ---- | ----------- |
| title | string | Label for list of choices |
| choices* | Choice[] | Collection of choices |
| selected* | string[] | Collection of selected choices |
| name | string | Name for form input |
| allowMultiple | boolean | Allow multiple selections |
| titleHidden | boolean | Toggles display of the title |
| onChange | function(selected: string) | Function to call when selection is changed |

## Examples

### Single choice list

Use when you need merchants to make a single selection from a list of choices.

```jsx
<ChoiceList
  title="Company name"
  choices={[
    {label: 'Hidden', value: 'hidden'},
    {label: 'Optional', value: 'optional'},
    {label: 'Required', value: 'required'},
  ]}
  selected={['hidden']}
/>
```

### Multi-choice list

Use when to let merchants make multiple sections from a list of choices.

```jsx
<ChoiceList
  allowMultiple
  title="While the customer is checking out"
  choices={[
    {
      label: 'Use the shipping address as the billing address by default', value: 'shipping',
    },
    {
      label: 'Require a confirmation step',
      value: 'confirmation',
    },
  ]}
  selected={['shipping']}
/>
```
