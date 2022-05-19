import {toBeDisabled} from './props';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeDisabled(): void;
    }
  }
}

expect.extend({toBeDisabled});
