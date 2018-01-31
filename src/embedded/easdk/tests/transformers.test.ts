import {transformAction} from '../transformers';

describe('transformAction', () => {
  it('returns a disabled action', () => {
    const disabledAction = transformAction({
      content: 'Save',
      disabled: true,
    });

    expect(disabledAction.style).toBe('disabled');
  });

  it('returns a destructive action', () => {
    const destructiveAction = transformAction({
      content: 'Delete',
      destructive: true,
    });

    expect(destructiveAction.style).toBe('danger');
  });

  it('returns an action with the specified target', () => {
    const targetAction = transformAction({
      content: 'See all orders',
      target: 'app',
    });

    expect(targetAction.target).toBe('app');
  });

  it('returns an action that opens a new window or tab when called with an external action', () => {
    const externalLinkAction = transformAction({
      content: 'Promote',
      external: true,
      url: 'https://facebook.com/business',
    });

    expect(externalLinkAction.target).toBe('new');
  });

  it('returns an action that targets the shopify window', () => {
    const shopifyLinkAction = transformAction({
      content: 'View orders',
      url: '/orders',
    });

    expect(shopifyLinkAction.target).toBe('shopify');
  });

  it('returns an action that targets the app window when the url is of the same origin as the app window', () => {
    mockHostname();

    const sameHostLinkAction = transformAction({
      content: 'Edit in bulk',
      url: 'https://web-foundation-apps.myshopify.io/bulk-edit',
    });

    expect(sameHostLinkAction.target).toBe('app');

    resetHostname();
  });

  it('returns an action that targets the app window when the url is a relative path', () => {
    const relativeLinkAction = transformAction({
      content: 'Bulk update orders',
      url: 'orders',
    });

    expect(relativeLinkAction.target).toBe('app');
  });

  it('returns an action that opens a new window or tab when the url is not targeting the shopify or the app window', () => {
    mockHostname();

    const inherentExternalLinkAction = transformAction({
      content: 'Promote',
      url: 'https://www.facebook.com/business',
    });

    expect(inherentExternalLinkAction.target).toBe('new');

    resetHostname();
  });

  it('returns an action with an undefined target', () => {
    const genericAction = transformAction({
      content: 'Promote',
      onAction: () => ({}),
    });

    expect(genericAction.target).toBe(undefined);
  });

  it('returns an action with a callback message generated from a url', () => {
    const urlCallbackAction = transformAction({
      content: 'Bulk update orders',
      url: 'https://web-foundation-apps.myshopify.io/',
    });

    expect(typeof urlCallbackAction.message).toBe('function');
  });

  it('returns an action with a callback message when onAction exists', () => {
    const callbackAction = transformAction({
      content: 'Bulk update orders',
      url: 'orders',
      onAction: () => ({}),
    });

    expect(typeof callbackAction.message).toBe('function');
  });
});

const originalHostname = window.location.hostname;

function mockHostname() {
  // The window's hostname needs to be mocked because there is no value for window.location.hostname within the jsdom environment. Otherwise, when an action with an external url (explicit or inherent) is passed to transformAction, we get a false positive for the second conditional of the getTargetFromURL function (line 89 of transformers.ts), as url.indexOf(window.location.hostname) returns 0 even though there is no value passed.

  // For context on this window.location mock workaround, see this issue => https://github.com/facebook/jest/issues/890#issuecomment-209698782

  Object.defineProperty(window.location, 'hostname', {
    writable: true,
    value: 'web-foundation-apps.myshopify.io',
  });
}

function resetHostname() {
  Object.defineProperty(window.location, 'hostname', {
    writable: true,
    value: originalHostname,
  });
}
