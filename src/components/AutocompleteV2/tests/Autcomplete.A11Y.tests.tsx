/* eslint-disable jest/expect-expect */
import React from 'react';

describe('A11Y', () => {
  describe('combobox', () => {
    it.todo(
      'renders the activator wrapped in a div with a role of combobox',
      () => {},
    );
    it.todo('has an `area-expanded` attribute of false by default', () => {});
    it.todo(
      'has an `area-expanded` attribute of true when a ListBox is visible',
      () => {},
    );
    it.todo(
      'does not have an `area-owns` attribute when the LisBox is not visible',
      () => {},
    );
    it.todo(
      'has an `area-owns` attribute whos value matches the ListBox UL ID when the ListBox visible',
      () => {},
    );
    it.todo(
      'has a an attribute of `haspopup` with a value of `listbox`',
      () => {},
    );

    // questions:
    // Multiselect: how does aria-activedescendant behave
    // How do sections titles get read
    describe('input', () => {
      it.todo(
        'has an `id` attribute whos value matches the labels for attribute value',
      );
      it.todo(
        'has an `aria-autocomplete` attribute with a value of `list` if `autofill` is false',
      );
      it.todo(
        'has an `aria-autocomplete` attribute with a value of `both` if `autofill` is true',
      );
      it.todo(
        'has an `aria-controls` attribute whos value matches the ListBox UL ID when the ListBox visible',
      );
      it.todo(
        'does not have an `aria-controls` when the ListBox is not visible',
      );
      it.todo(
        'has an `aria-activedescendant` with a value of the focus element in the list',
      );
    });
  });
  describe('listbox (ul)', () => {
    it.todo('has an `role` attribute with a value of `listbox`');
    it.todo(
      'has an `aria-labelledby` attribute whos value matches the textfields label id',
    );
  });
  describe('option (li)', () => {
    it.todo(
      //question in a multi slect will this be selected if the prop is selected
      'has an `aria-selected` attribute whos value is true when an option is selected via keyboard,
    );
  });
});

describe('keyboard interactions', () => {
  describe('Enter', () => {
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
  });
});
