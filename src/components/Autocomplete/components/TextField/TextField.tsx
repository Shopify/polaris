import * as React from 'react';

import {contextTypes} from '../types';
import BaseTextField, {Props as TextFieldProps} from '../../../TextField';

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

    // autoComplete should be overridable by the user, but not the other values
    return (
      <BaseTextField
        autoComplete={false}
        {...this.props}
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
