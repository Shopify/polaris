// Copied from https://github.com/jakearchibald/http203-playlist/blob/main/src/client/missing-types.d.ts
interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  // Deprecated
  domUpdated?: Promise<void>;
  updateCallbackDone: Promise<void>;
}

interface Document {
  startViewTransition(setupPromise: () => Promise<void> | void): ViewTransition;
}

interface CSSStyleDeclaration {
  viewTransitionName: string;
}
