import {StrictMode, Fragment} from 'react';
import {addParameters, addDecorator} from '@storybook/react';
import {withContexts} from '@storybook/addon-contexts/react';

import {AppProvider} from '../src';
import enTranslations from '../locales/en.json';

function StrictModeToggle({isStrict = false, children}) {
  const Wrapper = isStrict ? StrictMode : Fragment;
  return <Wrapper>{children}</Wrapper>;
}

function AppProviderWithKnobs({colorScheme, children}, context) {
  const omitAppProvider = (() => {
    try {
      return children.props['data-omit-app-provider'];
    } catch (e) {
      return null;
    }
  })();

  if (omitAppProvider === 'true') return children;

  return (
    <AppProvider i18n={enTranslations} theme={{colorScheme}}>
      {children}
    </AppProvider>
  );
}

const withContextsDecorator = withContexts([
  {
    title: 'Strict Mode',
    components: [StrictModeToggle],
    params: [
      {name: 'Disabled', props: {isStrict: false}},
      {name: 'Enabled', default: true, props: {isStrict: true}},
    ],
  },
  {
    title: 'Color scheme',
    components: [AppProviderWithKnobs],
    params: [
      {
        default: true,
        name: 'Light Mode',
        props: {colorScheme: 'light'},
      },
      {
        name: 'Dark Mode',
        props: {colorScheme: 'dark'},
      },
    ],
  },
]);

export const decorators = [withContextsDecorator];
