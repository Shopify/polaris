import React from 'react';
import App, {Container} from 'next/app';
import {AppProvider} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/dist/styles.css';

export default class WrappedApp extends App {
  render() {
    const {Component, pageProps} = this.props;

    return (
      <AppProvider i18n={enTranslations}>
        <Component {...pageProps} />
      </AppProvider>
    );
  }
}
