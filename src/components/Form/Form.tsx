import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

export type AutoComplete = 'off' | 'on';

export interface Props {
  /** Grants the broswer the ability to autocomplete input elements */
  autoComplete?: AutoComplete,
  /** The content to display inside the form. */
  children?: React.ReactNode,
  /** A unique name for the form */
  name?: string,
  /** Wheather or not form is validated when submitting */
  noValidate?: boolean,
  /** Callback when for is submitted */
  onSubmit(): void,
}

export default class Form extends React.PureComponent<Props> {
  render() {
    const {
      autoComplete,
      children,
      name,
      noValidate,
    } = this.props;

    return (
      <form
        autoComplete={autoComplete}
        name={name}
        noValidate={noValidate}
        onSubmit={this.handleSubmit}
      >
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
