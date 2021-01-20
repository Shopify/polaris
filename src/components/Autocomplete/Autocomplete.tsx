import React, {useMemo, useCallback} from 'react';

import type {ActionListItemDescriptor} from '../../types';
import type {PopoverProps} from '../Popover';
import {useI18n} from '../../utilities/i18n';
import type {OptionDescriptor} from '../OptionList';

import {ComboBox, ListBox, MappedOption, MappedAction} from './components';

export interface ComboBoxOldProps {
  /** A unique identifier for the ComboBox */
  id?: string;
  /** Collection of options to be listed */
  options: OptionDescriptor[];
  /** The selected options */
  selected: string[];
  /** The text field component attached to the list of options */
  textField: React.ReactElement;
  /** The preferred direction to open the popover */
  preferredPosition?: PopoverProps['preferredPosition'];
  /** Title of the list of options */
  listTitle?: string;
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** Actions to be displayed before the list of options */
  actionsBefore?: ActionListItemDescriptor[];
  /** Actions to be displayed after the list of options */
  actionsAfter?: ActionListItemDescriptor[];
  /** Content to be displayed before the list of options */
  contentBefore?: React.ReactNode;
  /** Content to be displayed after the list of options */
  contentAfter?: React.ReactNode;
  /** Is rendered when there are no options */
  emptyState?: React.ReactNode;
  /** Callback when the selection of options is changed */
  onSelect(selected: string[]): void;
  /** Callback when the end of the list is reached */
  onEndReached?(): void;
}

export interface AutocompleteProps {
  /** A unique identifier for the Autocomplete */
  id?: string;
  /** Collection of options to be listed */
  options: ComboBoxOldProps['options'];
  /** The selected options */
  selected: string[];
  /** The text field component attached to the list of options */
  textField: React.ReactElement;
  /** The preferred direction to open the popover */
  preferredPosition?: PopoverProps['preferredPosition'];
  /** Title of the list of options */
  listTitle?: string;
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** An action to render above the list of options */
  actionBefore?: ActionListItemDescriptor; // TODO handle
  /** Display loading state */
  loading?: boolean;
  /** Indicates if more results will load dynamically */
  willLoadMoreResults?: boolean;
  /** Is rendered when there are no options */
  emptyState?: React.ReactNode;
  /** Callback when the selection of options is changed */
  onSelect(selected: string[]): void;
  /** Callback when the end of the list is reached */
  onLoadMoreResults?(): void;
}

// TypeScript can't generate types that correctly infer the typing of
// subcomponents so explicitly state the subcomponents in the type definition.
// Letting this be implicit works in this project but fails in projects that use
// generated *.d.ts files.

export const Autocomplete: React.FunctionComponent<AutocompleteProps> & {
  ComboBox: typeof ComboBox;
  TextField: typeof ComboBox.TextField; // TODO is this correct?
} = function Autocomplete({
  options,
  selected,
  textField,
  preferredPosition,
  listTitle,
  allowMultiple,
  loading,
  actionBefore,
  willLoadMoreResults,
  emptyState,
  onSelect,
  onLoadMoreResults,
}: AutocompleteProps) {
  const i18n = useI18n();

  const optionsMarkup = useMemo(() => {
    const conditionalOptions = loading && !willLoadMoreResults ? [] : options;
    const optionList =
      conditionalOptions.length > 0
        ? conditionalOptions.map((option) => (
            <MappedOption
              {...option}
              key={option.id}
              selected={selected.includes(option.value)}
              singleSelection={!allowMultiple}
            />
          ))
        : null;

    if (listTitle) {
      return (
        <ListBox.Section
          divider={false}
          title={<ListBox.Header>{listTitle}</ListBox.Header>}
        >
          {optionList}
        </ListBox.Section>
      );
    }

    return optionList;
  }, [
    listTitle,
    loading,
    options,
    willLoadMoreResults,
    allowMultiple,
    selected,
  ]);

  const loadingMarkup = loading ? (
    <ListBox.Loading
      accessibilityLabel={i18n.translate(
        'Polaris.Autocomplete.spinnerAccessibilityLabel',
      )}
    />
  ) : null;

  const updateSelection = useCallback(
    (newSelection: string) => {
      if (allowMultiple) {
        if (selected.includes(newSelection)) {
          onSelect(selected.filter((option) => option !== newSelection));
        } else {
          onSelect([...selected, newSelection]);
        }
      } else {
        onSelect([newSelection]);
      }
    },
    [allowMultiple, onSelect, selected],
  );

  const actionMarkup = actionBefore && <MappedAction {...actionBefore} />;

  return (
    <ComboBox
      activator={textField}
      allowMultiple={allowMultiple}
      onScrolledToBottom={onLoadMoreResults}
      preferredPosition={preferredPosition}
    >
      <ListBox onSelect={updateSelection}>
        {actionMarkup}
        {optionsMarkup && (!loading || willLoadMoreResults)
          ? optionsMarkup
          : null}
        {loadingMarkup}
        {options.length < 1 && !loading && emptyState}
      </ListBox>
    </ComboBox>
  );
};

Autocomplete.ComboBox = ComboBox;
Autocomplete.TextField = ComboBox.TextField;
