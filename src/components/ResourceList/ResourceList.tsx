import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import {noop} from '@shopify/javascript-utilities/other';
import autobind from '@shopify/javascript-utilities/autobind';

import Checkbox from '../Checkbox';
import Button from '../Button';
import * as styles from './ResourceList.scss';

export interface Props {
  selected: number[],
  items: any[],
  selectable?: boolean,
  onSelectionChange?(selection: number[]): void,
  renderItem(item: any, index: number): React.ReactNode,
}

export interface State {
  showCheckboxes: boolean,
}

export default class ResourceList extends React.PureComponent<Props, State> {
  state: State = {
    showCheckboxes: false,
  };

  render() {
    const {items, selectable, selected} = this.props;
    const {showCheckboxes} = this.state;

    const selectorClassNames = classNames(
      styles.Selector,
      selectable && showCheckboxes && styles.show,
    );

    const areAllItemsSelected = items.length === selected.length ? true : false;

    const header = selectable
      ? (
        <div className={styles.Header}>
             <div className={selectorClassNames}>
              <Checkbox
                checked={areAllItemsSelected}
                label={
                  <div className={styles.hiddenLabel}>
                    Select All
                  </div>
                }
                onChange={this.handleChangeAll}
              />
            </div>
            <div className={styles.HeaderAction}>
              <Button plain onClick={this.handleCheckboxVisibility}>Edit</Button>
            </div>
        </div>
      )
      : null;

    return (
      <div>
        {header}
        <ul className={styles.List}>
          {items.map(this.renderItem)}
        </ul>
      </div>
    );
  }

  @autobind
  private handleCheckboxVisibility() {
    this.setState(({showCheckboxes}) => {
      return {
        showCheckboxes: !showCheckboxes,
      };
    });
  }

  @autobind
  private handleChangeAll(checked: boolean) {
    const {items, onSelectionChange = noop} = this.props;
    if (checked) {
      const itemsIndices = Array.from(items.keys());
      onSelectionChange(itemsIndices);
    } else {
      onSelectionChange([]);
    }
  }

  @autobind
  private handleChange(checked: boolean, position: number) {
    const {selected, onSelectionChange = noop} = this.props;
    const selectedArray = [...selected];
    if (checked) {
      return onSelectionChange([...selectedArray, position]);
    }
    const indexToDelete = selectedArray.indexOf(position);
    selectedArray.splice(indexToDelete, 1);
    onSelectionChange(selectedArray);
  }

  @autobind
  private renderItem(item: any, index: number) {
    const {selectable, selected, renderItem} = this.props;
    const {showCheckboxes} = this.state;

    const handleChange = (checked: boolean) => {
      this.handleChange(checked, index);
    };

    const checked = selected.indexOf(index) !== -1;

    const className = classNames(
      styles.Item,
      checked  && styles.selected,
    );

    const selectorClassNames = classNames(
      styles.Selector,
      selectable && showCheckboxes && styles.show,
    );

    const checkboxMarkup = selectable
    ? (
      <div className={selectorClassNames}>
        <Checkbox
          checked={selected.indexOf(index) !== -1}
          label={
            <div className={styles.hiddenLabel}>
              Selector-{index}
            </div>
          }
          onChange={handleChange}
        />
      </div>
    )
    : null;

    return (
      <li key={index} className={className}>
          {checkboxMarkup}
          <div>
            {renderItem(item, index)}
          </div>
      </li>
    );
  }
}
