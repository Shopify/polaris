import {useMemo, useCallback} from 'react';

import type {
  ActionListItemDescriptor,
  OptionDescriptor,
  SectionDescriptor,
} from '../../types';
import type {PopoverProps} from '../Popover';
import {isSection} from '../../utilities/options';
import {useI18n} from '../../utilities/i18n';
import {Combobox} from '../Combobox';
import {Listbox, AutoSelection} from '../Listbox';

import {MappedAction, MappedOption} from './components';
import styles from './Autocomplete.scss';

export interface AutocompleteProps {
  /** A unique identifier for the Autocomplete */
  id?: string;
  /** Collection of options to be listed */
  options: SectionDescriptor[] | OptionDescriptor[];
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
  actionBefore?: ActionListItemDescriptor & {
    /** Specifies that if the label is too long it will wrap instead of being hidden  */
    wrapOverflow?: boolean;
  };
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
  TextField: typeof Combobox.TextField;
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

  const buildMappedOptionFromOption = useCallback(
    (options: OptionDescriptor[]) => {
      return options.map((option) => (
        <MappedOption
          key={option.id || option.value}
          {...option}
          selected={selected.includes(option.value)}
          singleSelection={!allowMultiple}
        />
      ));
    },
    [selected, allowMultiple],
  );

  const optionsMarkup = useMemo(() => {
    const conditionalOptions = loading && !willLoadMoreResults ? [] : options;

    if (isSection(conditionalOptions)) {
      const noOptionsAvailable = conditionalOptions.every(
        ({options}) => options.length === 0,
      );

      if (noOptionsAvailable) {
        return null;
      }

      const optionsMarkup = conditionalOptions.map(({options, title}) => {
        if (options.length === 0) {
          return null;
        }

        const optionMarkup = buildMappedOptionFromOption(options);

        return (
          <Listbox.Section
            divider={false}
            title={<Listbox.Header>{title}</Listbox.Header>}
            key={title}
          >
            {optionMarkup}
          </Listbox.Section>
        );
      });

      return <div className={styles.SectionWrapper}>{optionsMarkup}</div>;
    }

    const optionList =
      conditionalOptions.length > 0
        ? buildMappedOptionFromOption(conditionalOptions)
        : null;

    if (listTitle) {
      return (
        <Listbox.Section
          divider={false}
          title={<Listbox.Header>{listTitle}</Listbox.Header>}
        >
          {optionList}
        </Listbox.Section>
      );
    }

    return optionList;
  }, [
    listTitle,
    loading,
    options,
    willLoadMoreResults,
    buildMappedOptionFromOption,
  ]);

  const loadingMarkup = loading ? (
    <Listbox.Loading
      accessibilityLabel={i18n.translate(
        'Polaris.Autocomplete.spinnerAccessibilityLabel',
      )}
    />
  ) : null;

  const updateSelection = useCallback(
    (newSelection: string) => {
      if (actionBefore && newSelection === actionBefore.content) {
        actionBefore.onAction && actionBefore.onAction();
        return;
      }

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
    [allowMultiple, onSelect, selected, actionBefore],
  );

  const actionMarkup = actionBefore && <MappedAction {...actionBefore} />;

  const emptyStateMarkup = emptyState && options.length < 1 && !loading && (
    <div role="status">{emptyState}</div>
  );

  const autoSelection = actionBefore ? AutoSelection.First : undefined;

  return (
    <Combobox
      activator={textField}
      allowMultiple={allowMultiple}
      onScrolledToBottom={onLoadMoreResults}
      preferredPosition={preferredPosition}
      willLoadMoreOptions={willLoadMoreResults}
    >
      {actionMarkup || optionsMarkup || loadingMarkup || emptyStateMarkup ? (
        <Listbox autoSelection={autoSelection} onSelect={updateSelection}>
          {actionMarkup}
          {optionsMarkup && (!loading || willLoadMoreResults)
            ? optionsMarkup
            : null}
          {loadingMarkup}
          {emptyStateMarkup}
        </Listbox>
      ) : null}
    </Combobox>
  );
};

Autocomplete.TextField = Combobox.TextField;
