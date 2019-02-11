import * as React from 'react';
import {TopBar, AppProvider, Frame, TextField} from '../src';

interface State {}

const theme = {
  colors: {
    topBar: {
      background: '#357997',
    },
  },
  logo: {
    width: 124,
    topBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
    url: 'http://jadedpixel.com',
    accessibilityLabel: 'Jaded Pixel',
    contextualSaveBarSource:
      'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-gray.svg?6215648040070010999',
  },
};

export default class Playground extends React.Component<{}, State> {
  render() {
    const topBar = (
      <TopBar
        userMenu={
          <TopBar.UserMenu
            initials="JD"
            name="John Doe"
            open
            actions={[
              {
                items: [
                  {
                    content: 'Hello',
                  },
                ],
              },
            ]}
          />
        }
      />
    );
    return (
      <AppProvider theme={theme}>
        <Frame topBar={topBar} />
      </AppProvider>
    );
  }
}
