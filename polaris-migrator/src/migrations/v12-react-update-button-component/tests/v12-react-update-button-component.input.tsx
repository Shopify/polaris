import React from 'react';
import type {ButtonProps} from '@shopify/polaris';
import {Button} from '@shopify/polaris';
import {PhoneMajor} from '@shopify/polaris-icons';

declare function CustomButton(props: ButtonProps): JSX.Element;
declare const Styles: {
  [className: string]: string;
};

export function App() {
  const hasFormError = false;
  const polarisSummerEditions2023Enabled = true;
  const disabled = false;
  const primary = true;
  const MyButton = Button;
  return (
    <>
      <Button destructive outline disabled>
        Delete App
      </Button>
      <Button icon={PhoneMajor} size="large" monochrome outline>
        Call
      </Button>
      <Button plain>Edit</Button>
      <Button monochrome>Monochrome</Button>
      <Button outline>Outline</Button>
      <Button destructive>Destructive</Button>
      <Button primarySuccess>Primary success</Button>
      <Button destructive outline>
        Destructive outline
      </Button>
      <Button destructive plain>
        Destructive plain
      </Button>
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
