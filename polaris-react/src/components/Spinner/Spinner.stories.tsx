import React, {useCallback, useEffect, useRef, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Button,
  Card,
  Form,
  FormLayout,
  Spinner,
  Tabs,
  TextField,
} from '@shopify/polaris';

export default {
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

export function Default() {
  return <Spinner accessibilityLabel="Spinner example" size="large" />;
}

export function Small() {
  return <Spinner accessibilityLabel="Small spinner example" size="small" />;
}

export function WithFocusManagement() {
  const tabs = useRef([
    {
      id: 'all-customers',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content',
    },
    {
      id: 'accepts-marketing',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content',
    },
  ]);

  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [textFieldFocused, setTextFieldFocused] = useState(false);

  useEffect(() => {
    setTextFieldFocused(!loading);
  }, [loading]);

  const handleTabChange = useCallback((selectedTab) => {
    setLoading(true);
    setSelected(selectedTab);
    setTimeout(() => {
      setValue('');
      return setLoading(false);
    }, 1500);
  }, []);

  const handleUrlChange = useCallback((value) => setValue(value), []);

  const handleSubmit = useCallback((_event) => setValue(''), []);

  const label = selected ? 'Marketing' : 'Customers';
  const sectionMarkup = loading ? (
    <Spinner
      accessibilityLabel="Loading form field"
      hasFocusableParent={false}
    />
  ) : (
    <Form noValidate onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          value={value}
          focused={textFieldFocused}
          onChange={handleUrlChange}
          label={label}
          autoComplete="off"
        />
        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );

  return (
    <Card>
      <Tabs tabs={tabs.current} selected={selected} onSelect={handleTabChange}>
        <Card.Section title={tabs.current[selected].content}>
          {sectionMarkup}
        </Card.Section>
      </Tabs>
    </Card>
  );
}
