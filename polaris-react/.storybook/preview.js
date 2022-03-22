import React from 'react';
import {addParameters, addDecorator} from '@storybook/react';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';

function StrictModeDecorator(Story, context) {
  const Wrapper =
    context.globals.strictMode === 'true' ? React.StrictMode : React.Fragment;

  return (
    <Wrapper>
      <Story {...context} />
    </Wrapper>
  );
}

function AppProviderDecorator(Story, context) {
  if (context.args.omitAppProvider) return <Story {...context} />;

  return (
    <AppProvider i18n={enTranslations}>
      <Story {...context} />
    </AppProvider>
  );
}

export const globalTypes = {
  strictMode: {
    name: 'React.StrictMode',
    defaultValue: 'false',
    toolbar: {
      items: [
        {title: 'Disabled', value: 'false'},
        {title: 'Enabled', value: 'true'},
      ],
      showName: true,
    },
  },
};

export const decorators = [StrictModeDecorator, AppProviderDecorator];
