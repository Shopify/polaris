import * as React from 'react';

import {ActionListItemDescriptor} from '../../types';
import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import {PreferredPosition} from '../PositionedOverlay';
import {OptionDescriptor} from '../OptionList';
import Spinner from '../Spinner';
import {Props as TextFieldProps} from '../TextField';

import {ComboBox} from './components';
import styles from './Autocomplete.scss';

export interface Props {
  /** A unique identifier for the Autocomplete */
  id?: string;
  /** Collection of options to be listed */
  options: OptionDescriptor[];
  /** The selected options */
  selected: string[];
  /** The text field component attached to the list of options */
  textField: React.ReactElement<any>;
  /** The preferred direction to open the popover */
  preferredPosition?: PreferredPosition;
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

export type CombinedProps = Props & WithAppProviderProps;

function TextField(props: TextFieldProps) {
  return <ComboBox.TextField {...props} />;
}

export class Autocomplete extends React.PureComponent<CombinedProps, never> {
  static TextField = TextField;
  static ComboBox = ComboBox;

  render() {
    const {
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
      polaris: {intl},
    } = this.props;

    const spinnerMarkup = loading ? (
      <div className={styles.Loading}>
        <Spinner
          size="small"
          accessibilityLabel={intl.translate(
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
  }
}

export default withAppProvider<Props>()(Autocomplete);
