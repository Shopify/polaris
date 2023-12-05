import React from 'react';
import type {ButtonProps} from '@shopify/polaris';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

declare function CustomButton(
  props: /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  ButtonProps,
): JSX.Element;
declare const Styles: {
  [className: string]: string;
};

export function App() {
  const hasFormError = false;
  const polarisSummerEditions2023Enabled = true;
  const disabled = false;
  const primary = true;
  const MyButton =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    Button;
  return (
    <>
      <Button disabled tone="critical">
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large">
        Call
      </Button>
      <Button variant="plain">Edit</Button>
      <Button>Monochrome</Button>
      <Button>Outline</Button>
      <Button variant="primary" tone="critical">
        Destructive
      </Button>
      <Button variant="primary" tone="success">
        Primary success
      </Button>
      <Button tone="critical">Destructive outline</Button>
      <Button variant="plain" tone="critical">
        Destructive plain
      </Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button
        disclosure="select"
        fullWidth
        textAlign="left"
        outline={hasFormError}
        destructive={hasFormError}
        disabled={disabled}
        size={polarisSummerEditions2023Enabled ? 'large' : undefined}
      >
        Selected branch
      </Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button
        icon={PhoneMajor}
        removeUnderline
        plain={!primary}
        monochrome={!primary}
        disabled={disabled}
        primarySuccess={primary}
      >
        Content
      </Button>
      {/* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */}
      <Button
        outline={!polarisSummerEditions2023Enabled}
        plain={polarisSummerEditions2023Enabled}
        primary={polarisSummerEditions2023Enabled}
      >
        Button
      </Button>
      <MyButton plain>My Button</MyButton>
      <CustomButton plain />
      <div className={Styles.Button}>Fake Button</div>
    </>
  );
}
