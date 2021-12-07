import {toBeDisabled} from './props';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Matchers<R> {
      toBeDisabled(): void;
    }
  }
}

expect.extend({toBeDisabled});
