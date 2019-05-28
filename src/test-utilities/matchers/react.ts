import chalk from 'chalk';
import {Node} from './types';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeDisabled(): void;
    }
  }
}

function toBeDisabled(received: Node<any>) {
  const pass = received.prop('disabled') === true;

  return {
    pass,
    message() {
      return pass
        ? chalk.green(`Expected component not to be disabled, but it was.`)
        : chalk.red(`Expected component to be disabled, but it wasn't.`);
    },
  };
}

expect.extend({toBeDisabled});
