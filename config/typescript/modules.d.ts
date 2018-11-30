// The version of jest-dom-mocks we use references this interface which  was
// built into Typescript but then removed in TypeScript 3.1.0 as per
// https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#some-vendor-specific-types-are-removed-from-libdts
// This can be removed once we update to use a version of jest-dom-mocks that
// includes https://github.com/Shopify/quilt/pull/426, which removes the
// reference to this interface
interface MediaQueryListListener {
  (mql: MediaQueryList): void;
}
