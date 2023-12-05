import React from 'react';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

export function App() {
  const hasFormError = false;
  const polarisSummerEditions2023Enabled = true;
  const disabled = false;
  const primary = true;
  return (
    <>
      <Button destructive outline disabled />
      <Button icon={PhoneMajor} size="large" monochrome outline />
      <Button plain />
      <Button monochrome />
      <Button outline />
      <Button destructive />
      <Button primarySuccess />
      <Button destructive outline />
      <Button destructive plain />
      <Button
        disclosure="select"
        fullWidth
        textAlign="left"
        outline={hasFormError}
        destructive={hasFormError}
        disabled={disabled}
        size={polarisSummerEditions2023Enabled ? 'large' : undefined}
      />
      <Button
        icon={PhoneMajor}
        removeUnderline
        plain={!primary}
        monochrome={!primary}
        disabled={disabled}
        primarySuccess={primary}
      />
      <Button
        outline={!polarisSummerEditions2023Enabled}
        plain={polarisSummerEditions2023Enabled}
        primary={polarisSummerEditions2023Enabled}
      />
    </>
  );
}
