export class MissingResourceManagerError extends Error {
  constructor() {
    super(
      `Your component must be wrapped in an <Resource.Manager> component. See https://polaris.shopify.com/components/lists-and-tables/resource-manager for implementation instructions.`,
    );
    this.name = 'MissingResourceManagerError';
  }
}

export class ResourceSelectionError extends Error {
  constructor(message = '') {
    super(message);
    this.name = 'ResourceSelectionError';
  }
}
