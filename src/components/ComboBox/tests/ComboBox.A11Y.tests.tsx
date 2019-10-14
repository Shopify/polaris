describe('A11Y', () => {
  describe('combobox', () => {
    it.todo('renders the activator wrapped in a div with a role of combobox');
    it.todo('has an `aria-expanded` attribute of false by default');
    it.todo(
      'has an `aria-expanded` attribute of true when a ListBox is visible',
    );
    it.todo(
      'does not have an `aria-owns` attribute when the LisBox is not visible',
    );
    it.todo(
      'has an `aria-owns` attribute whos value matches the ListBox UL ID when the ListBox visible',
    );
    it.todo('has a an attribute of `aria-haspopup` with a value of `listbox`');

    describe('input', () => {
      it.todo(
        'has an `id` attribute whos value matches the label for attribute value',
      );
      it.todo(
        'has an `aria-autocomplete` attribute with a value of `list` if `inline` is false',
      );
      it.todo(
        'has an `aria-autocomplete` attribute with a value of `both` if `inline` is true',
      );
      it.todo(
        'has an `aria-controls` attribute whose value matches the ListBox UL ID when the ListBox visible',
      );
      it.todo(
        'does not have an `aria-controls` when the ListBox is not visible',
      );
      it.todo(
        'has an `aria-activedescendant` with the id of the keyboard focus element in the list',
      );
    });
  });
  describe('listbox (ul)', () => {
    it.todo('has an `role` attribute with a value of `listbox`');
    it.todo(
      'has an `aria-labelledby` attribute whos value matches the textfields label id',
    );
    it.todo('is rendered in a popover on large screens');
    it.todo('is rendered has the next sibling of combobox on small screens');
    it.todo(
      'has an `aria-multiselectable` attribute set to `true` if allowMultiple is true,
    );
  });
  describe('option (li)', () => {
    it.todo(
      'has an `aria-selected` attribute whose value is `true` when an option is selected via keyboard',
    );
    it.todo(
      'has an `aria-selected` attribute whose value is `true` when the option has a selected prop',
    );
    it.todo(
      'has an `aria-selected` attribute whose value is `false` when an option is not selected via keyboard or prop',
    );
  });
  describe('Aria-live', () => {
    it.todo(
      'it renders an empty, visually hidden div on page load with and `aria-live` attribute of `polite` by default',
    );
    it.todo('');
  });
});

describe('keyboard interactions', () => {
  describe('Enter', () => {
    // for single
    it.todo(
      'Accepts the focused option in the listbox by closing the popup and placing the accepted value in the textbox with the input cursor at the end of the value',
    );
  });
  describe('Escape', () => {
    it.todo(
      'Closes the popup and returns focus to the textbox.',
      // Optionally, clears the contents of the textbox.
    );
  });
  describe('Down Arrow', () => {
    describe('No items focus', () => {
      it.todo('Moves focus to the first Option');
    });
    describe('an item is focused', () => {
      it.todo('Moves focus to the next Option');
    });
    describe('last item is focused', () => {
      it.todo('Moves focus to the first Option');
    });
  });
  describe('Up Arrow', () => {
    describe('No items focus', () => {
      it.todo('Moves focus to the last Option');
    });
    describe('an item is focused', () => {
      it.todo('Moves focus to the previous Option');
    });
    describe('first item is focused', () => {
      it.todo('Moves focus to the last Option');
    });
  });
  describe('Tab', () => {
    it.todo('calls onSelect with the selected value when tab is pressed');
    it.todo('does not call onSelect if there is no selected value');
    it.todo('move focus to the next input');
  });
});
