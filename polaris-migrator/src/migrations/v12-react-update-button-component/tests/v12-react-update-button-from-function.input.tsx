import React from 'react';
import {buttonFrom} from '@shopify/polaris';

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

  return primaryFooterActionMarkup;
}
