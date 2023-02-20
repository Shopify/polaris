import React, {useCallback} from 'react';

import {Text} from '../Text';
import {useI18n} from '../../utilities/i18n';

type Enctype =
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain';

type Method = 'post' | 'get' | 'action';

type Target = '_blank' | '_self' | '_parent' | '_top' | string;

export interface FormProps {
  /** Space separated list of character encodings */
  acceptCharset?: string;
  /** Where to send form-data on submittal */
  action?: string;
  /** Grants the browser the ability to autocomplete input elements */
  autoComplete?: boolean;
  /** The content to display inside the form. */
  children?: React.ReactNode;
  /** Media type when submitting content to server */
  encType?: Enctype;
  /** Toggles if form submits on Enter keypress. Defaults to true. */
  implicitSubmit?: boolean;
  /** Method used to submit form */
  method?: Method;
  /** A unique name for the form */
  name?: string;
  /** Whether or not form is validated when submitting */
  noValidate?: boolean;
  /** Blocks the default form action */
  preventDefault?: boolean;
  /** Where to display response after form submittal */
  target?: Target;
  /** Callback when form is submitted */
  onSubmit(event: React.FormEvent<HTMLFormElement>): void | Promise<void>;
}

export function Form({
  acceptCharset,
  action,
  autoComplete,
  children,
  encType,
  implicitSubmit = true,
  method = 'post',
  name,
  noValidate,
  preventDefault = true,
  target,
  onSubmit,
}: FormProps) {
  const i18n = useI18n();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      if (!preventDefault) {
        return;
      }

      event.preventDefault();
      onSubmit(event);
    },
    [onSubmit, preventDefault],
  );

  const autoCompleteInputs = normalizeAutoComplete(autoComplete);

  const submitMarkup = implicitSubmit ? (
    <Text as="span" visuallyHidden>
      <button type="submit" aria-hidden="true" tabIndex={-1}>
        {i18n.translate('Polaris.Common.submit')}
      </button>
    </Text>
  ) : null;

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
      onSubmit={handleSubmit}
    >
      {submitMarkup}
      {children}
    </form>
  );
}

function normalizeAutoComplete(autoComplete?: boolean) {
  if (autoComplete == null) {
    return autoComplete;
  }

  return autoComplete ? 'on' : 'off';
}
