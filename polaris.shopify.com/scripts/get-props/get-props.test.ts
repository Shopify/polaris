import {getProps} from './src/get-props';
import path from 'path';

it('Parses interfaces', () => {
  const testFiles = [path.join(__dirname, './testData/interfaces.ts')];
  expect(getProps(testFiles)).toMatchSnapshot();
});

it('Parses type aliases', () => {
  const testFiles = [path.join(__dirname, './testData/types.ts')];
  expect(getProps(testFiles)).toMatchSnapshot();
});

it('Parses enums', () => {
  const testFiles = [path.join(__dirname, './testData/enums.ts')];
  expect(getProps(testFiles)).toMatchSnapshot();
});

it('Gracefully handles unsupported types', () => {
  const testFiles = [path.join(__dirname, './testData/unsupported.ts')];
  expect(getProps(testFiles)).toMatchSnapshot();
});
