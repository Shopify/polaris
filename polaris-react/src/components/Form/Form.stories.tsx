import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {Button, Checkbox, Form, FormLayout, TextField} from '@shopify/polaris';

export default {
  component: Form,
} as ComponentMeta<typeof Form>;

export function CustomOnSubmit() {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback((_event) => {
    setEmail('');
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value) => setEmail(value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
          helpText={
            <span>
              We’ll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}

export function WithoutNativeValidation() {
  const [url, setUrl] = useState('');

  const handleSubmit = useCallback((_event) => setUrl(''), []);

  const handleUrlChange = useCallback((value) => setUrl(value), []);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={url}
          onChange={handleUrlChange}
          label="App URL"
          type="url"
          autoComplete="off"
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}
