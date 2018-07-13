import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

import {
  TextField as BaseTextField,
  TextFieldProps,
} from '../../../../components';
import {contextTypes} from '../../types';

export default class TextField extends React.PureComponent<
  TextFieldProps,
  never
> {
  static contextTypes = contextTypes;

  componentDidMount() {
    const {subscribe} = this.context;
    subscribe(this.handleContextUpdate);
  }

  render() {
    const {selectedOptionId, comboBoxId} = this.context;

    return (
      <BaseTextField
        {...this.props}
        role="combobox"
        autoComplete={false}
        ariaAutocomplete="list"
        ariaActiveDescendant={selectedOptionId}
        ariaOwns={comboBoxId}
      />
    );
  }

  @autobind
  private handleContextUpdate() {
    this.forceUpdate();
  }
}
