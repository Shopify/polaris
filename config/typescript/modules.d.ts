// The version of jest-dom-mocks we use was built with TypeScript 3.0.x, which
// references this interface, which was built into Typescript but then removed
// in TypeScript 3.1.0 as per
// https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#some-vendor-specific-types-are-removed-from-libdts
// This can be removed once we use a version of jest-dom-mocks that is built
// with TypeScript 3.1.0 or greater and thus will no longer reference this
// interface
interface MediaQueryListListener {
  (mql: MediaQueryList): void;
}
