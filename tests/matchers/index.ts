import {toBeDisabled} from './props';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDisabled(): void;
    }
  }
}

expect.extend({toBeDisabled});
