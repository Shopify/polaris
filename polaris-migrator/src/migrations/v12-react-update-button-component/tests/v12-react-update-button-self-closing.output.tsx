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
      <Button disabled tone="critical" />
      <Button icon={PhoneMajor} size="large" />
      <Button variant="plain" />
      <Button />
      <Button />
      <Button variant="primary" tone="critical" />
      <Button variant="primary" tone="success" />
      <Button tone="critical" />
      <Button variant="plain" tone="critical" />
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button
        disclosure="select"
        fullWidth
        textAlign="left"
        outline={hasFormError}
        destructive={hasFormError}
        disabled={disabled}
        size={polarisSummerEditions2023Enabled ? 'large' : undefined}
      />
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button
        icon={PhoneMajor}
        removeUnderline
        plain={!primary}
        monochrome={!primary}
        disabled={disabled}
        primarySuccess={primary}
      />
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button
        outline={!polarisSummerEditions2023Enabled}
        plain={polarisSummerEditions2023Enabled}
        primary={polarisSummerEditions2023Enabled}
      />
    </>
  );
}
