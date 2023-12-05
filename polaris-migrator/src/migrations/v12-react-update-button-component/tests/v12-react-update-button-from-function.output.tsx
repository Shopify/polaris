import {buttonFrom} from '@shopify/polaris';

const myButtonFrom =
  /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
  buttonFrom;

export function App() {
  const primaryFooterActionMarkup =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    buttonFrom(
      {content: 'Edit', onAction: () => {}},
      {
        primary: true,
      },
    );

  const myButtonMarkup = myButtonFrom(
    {content: 'Edit', onAction: () => {}},
    {
      primary: true,
    },
  );

  const multipleButtonsMarkup =
    /* polaris-migrator: Unable to migrate the following expression. Please upgrade manually. */
    buttonsFrom(
      {content: 'Edit', onAction: () => {}},
      {
        primary: true,
      },
    );

  return primaryFooterActionMarkup;
}
