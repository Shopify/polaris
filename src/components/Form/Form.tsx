import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

export interface Props {
  children: React.ReactNode,
  onSubmit(): void,
}

export default class Form extends React.PureComponent<Props> {
  render() {
    const {children} = this.props;

    return (
      <form key="Form wrapper" onSubmit={this.handleSubmit}>
        {children}
      </form>
    );
  }

  @autobind
  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSubmit();
  }
}
