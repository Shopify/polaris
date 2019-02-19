import {compose} from '../compose';

function sanitize(word: string) {
  return word.replace(/[^a-zA-Z]/g, '');
}

function toSnakeCaseFromUpper(word: string) {
  return word.split(/(?=[A-Z])/).join('_');
}

function toUpperCase(word: string) {
  return word.toUpperCase();
}

const toScreamingCaseSnake = compose(
  toUpperCase,
  toSnakeCaseFromUpper,
  sanitize,
);

describe('compose', () => {
  it('will return a function', () => {
    expect(typeof toScreamingCaseSnake).toBe('function');
  });

  it('will compose arguments from right to left', () => {
    const name = toScreamingCaseSnake('w4e-A24re+Polaris');
    expect(name).toBe('WE_ARE_POLARIS');
  });

  it('will invoke composed functions when returned function is called', () => {
    const sanitizeSpy = jest.fn();
    const toSnakeCaseFromUpperSpy = jest.fn();
    const toUpperCaseSpy = jest.fn();
    compose(
      toUpperCaseSpy,
      toSnakeCaseFromUpperSpy,
      sanitizeSpy,
    )();

    expect(sanitizeSpy).toHaveBeenCalledTimes(1);
    expect(toSnakeCaseFromUpperSpy).toHaveBeenCalledTimes(1);
    expect(toUpperCaseSpy).toHaveBeenCalledTimes(1);
  });
});
