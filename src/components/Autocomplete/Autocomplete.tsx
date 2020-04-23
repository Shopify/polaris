import React from 'react';

import {useI18n} from '../../utilities/i18n';
import type {ActionListItemDescriptor} from '../../types';
import {Spinner} from '../Spinner';

import {TextField, ComboBox, ComboBoxProps} from './components';
import styles from './Autocomplete.scss';

export interface AutocompleteProps {
  /** A unique identifier for the Autocomplete */
  id?: string;
  /** Collection of options to be listed */
  options: ComboBoxProps['options'];
  /** The selected options */
  selected: string[];
  /** The text field component attached to the list of options */
  textField: React.ReactElement;
  /** The preferred direction to open the popover */
  preferredPosition?: ComboBoxProps['preferredPosition'];
  /** Title of the list of options */
  listTitle?: string;
  /** Allow more than one option to be selected */
  allowMultiple?: boolean;
  /** An action to render above the list of options */
  actionBefore?: ActionListItemDescriptor;
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
  TextField: typeof TextField;
} = function Autocomplete({
  id,
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

  const spinnerMarkup = loading ? (
    <div className={styles.Loading}>
      <Spinner
        size="small"
        accessibilityLabel={i18n.translate(
          'Polaris.Autocomplete.spinnerAccessibilityLabel',
        )}
      />
    </div>
  ) : null;

  const conditionalOptions = loading && !willLoadMoreResults ? [] : options;
  const conditionalAction =
    actionBefore && actionBefore !== [] ? [actionBefore] : undefined;

  return (
    <ComboBox
      id={id}
      options={conditionalOptions}
      selected={selected}
      textField={textField}
      preferredPosition={preferredPosition}
      listTitle={listTitle}
      allowMultiple={allowMultiple}
      contentAfter={spinnerMarkup}
      actionsBefore={conditionalAction}
      onSelect={onSelect}
      onEndReached={onLoadMoreResults}
      emptyState={emptyState}
    />
  );
};

Autocomplete.ComboBox = ComboBox;
Autocomplete.TextField = TextField;
