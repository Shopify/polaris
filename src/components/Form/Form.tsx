import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';

export type Enctype =
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';
export type Method = 'post' | 'get' | 'action';
export type Target = '_blank' | '_self' | '_parent' | '_top' | string;

export interface Props {
  /** Space seperated list of character encodings */
  acceptCharset?: string;
  /** Where to send form-data on submittal */
  action?: string;
  /** Grants the broswer the ability to autocomplete input elements */
  autoComplete?: boolean;
  /** The content to display inside the form. */
  children?: React.ReactNode;
  /** Media type when submiting content to server */
  encType?: Enctype;
  /** Method used to submit form */
  method?: Method;
  /** A unique name for the form */
  name?: string;
  /** Wheather or not form is validated when submitting */
  noValidate?: boolean;
  /** Blocks the default form action */
  preventDefault?: boolean;
  /** Where to display response after form submittal */
  target?: Target;
  /** Callback when form is submitted */
  onSubmit(event: React.FormEvent<HTMLFormElement>): void;
}

export default class Form extends React.PureComponent<Props> {
  render() {
    const {
      acceptCharset,
      action,
      autoComplete,
      children,
      encType,
      method,
      name,
      noValidate,
      target,
    } = this.props;
    const autoCompleteInputs = normalizeAutoComplete(autoComplete);

    return (
      <form
        acceptCharset={acceptCharset}
        action={action}
        autoComplete={autoCompleteInputs}
        encType={encType}
        method={method}
        name={name}
        noValidate={noValidate}
        target={target}
        onSubmit={this.handleSubmit}
      >
        {children}
      </form>
    );
  }

  @autobind
  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const {preventDefault = true, onSubmit} = this.props;

    if (!preventDefault) {
      return;
    }

    event.preventDefault();
    onSubmit(event);
  }
}

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) {
    return autoComplete;
  }

  return autoComplete ? 'on' : 'off';
}
