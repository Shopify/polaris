import * as React from 'react';

import {contextTypes} from '../../../types';
import BaseTextField, {Props as TextFieldProps} from '../../../../../TextField';

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
        autoComplete={false}
        ariaAutocomplete="list"
        ariaActiveDescendant={selectedOptionId}
        ariaControls={comboBoxId}
      />
    );
  }

  private handleContextUpdate = () => {
    this.forceUpdate();
  };
}
