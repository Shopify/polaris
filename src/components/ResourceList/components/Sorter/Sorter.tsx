import * as React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Select, withAppProvider, WithAppProviderProps} from '@shopify/polaris';
import {contextTypes} from '../../types';
import * as styles from './Sorter.scss';

class Sorter extends React.PureComponent<WithAppProviderProps, never> {
  static contextTypes = contextTypes;

  render() {
    const {
      polaris: {intl},
    } = this.props;
    const {sortOptions, onSortChange, sortValue, selectMode} = this.context;
    const id = createUniqueIDFactory('Select')();

    return sortOptions && sortOptions.length > 0 ? (
      <div className={styles.Sorter}>
        <label className={styles.Label} htmlFor={id}>
          {intl.translate('Polaris.ResourceList.sortingLabel')}
        </label>
        <div className={styles.Select}>
          <Select
            id={id}
            label={intl.translate('Polaris.ResourceList.sortingLabel')}
            labelHidden
            options={sortOptions}
            onChange={onSortChange}
            value={sortValue}
            disabled={selectMode}
          />
        </div>
      </div>
    ) : null;
  }
}

export default withAppProvider()(Sorter);
