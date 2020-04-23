import chalk from 'chalk';
import type {Node} from '@shopify/react-testing';

export function toBeDisabled(received: Node<any>) {
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
