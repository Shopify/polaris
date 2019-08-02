import React from 'react';
import App, {Container} from 'next/app';
import {AppProvider} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

export default class WrappedApp extends App {
  render() {
    const {Component, pageProps} = this.props;

    return (
      <Container>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </Container>
    );
  }
}
