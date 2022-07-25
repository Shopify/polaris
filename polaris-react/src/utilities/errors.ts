export class MissingAppProviderError extends Error {
  constructor(message = '') {
    super(
      `${
        message ? `${message} ` : message
      }Your application must be wrapped in an <AppProvider> component. See https://polaris.shopify.com/components/app-provider for implementation instructions.`,
    );
    this.name = 'MissingAppProviderError';
  }
}
