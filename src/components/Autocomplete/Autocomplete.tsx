import * as React from 'react';

import {withAppProvider, WithAppProviderProps} from '../AppProvider';
import ComboBox from './components/ComboBox';
import {Spinner} from '..';
import {PreferredPosition} from '../PositionedOverlay';
import {OptionDescriptor} from '../OptionList';

import * as styles from './Autocomplete.scss';

export interface State {}

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
  /** Display loading state */
  loading?: boolean;
  /** Callback when the selection of options is changed */
  onSelect(selected: string[]): void;
  /** Callback when the end of the list is reached */
  onLoadMoreResults?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

export class Autocomplete extends React.PureComponent<CombinedProps, State> {
  static ComboBox = ComboBox;

  state: State = {};

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

    const conditionalOptions = loading && !onLoadMoreResults ? [] : options;

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
        onSelect={onSelect}
      />
    );
  }
}

export default withAppProvider<Props>()(Autocomplete);
