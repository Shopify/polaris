import {buttonFrom, buttonsFrom} from '@shopify/polaris';

const myButtonFrom = buttonFrom;

export function App() {
  const primaryFooterActionMarkup = buttonFrom(
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

  const multipleButtonsMarkup = buttonsFrom(
    {content: 'Edit', onAction: () => {}},
    {
      primary: true,
    },
  );

  return primaryFooterActionMarkup;
}
