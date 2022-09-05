import {getRelevantTypes, getProps, normalizePath} from './src/get-props';
import path from 'path';

it('Normalizes paths', () => {
  expect(
    normalizePath(
      '/Users/martenbjork/my-files/src/polaris/polaris-react/foo.tsx',
    ),
  ).toEqual('polaris-react/foo.tsx');

  expect(normalizePath('/polaris-react/foo.tsx')).toEqual(
    'polaris-react/foo.tsx',
  );

  expect(normalizePath('../polaris-react/foo.tsx')).toEqual(
    'polaris-react/foo.tsx',
  );

  expect(normalizePath('./polaris-react/foo.tsx')).toEqual(
    'polaris-react/foo.tsx',
  );
});

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

it('Filters out the relevant AST nodes when given a starting point', () => {
  const testFiles = [
    path.join(__dirname, './testData/enums.ts'),
    path.join(__dirname, './testData/interfaces.ts'),
    path.join(__dirname, './testData/relevantTypes.ts'),
    path.join(__dirname, './testData/types.ts'),
    path.join(__dirname, './testData/unsupported.ts'),
  ];

  const allTypes = getProps(testFiles);
  const filteredTypes = getRelevantTypes(
    allTypes,
    'InterfaceProps',
    'polaris.shopify.com/scripts/get-props/testData/relevantTypes.ts',
  );
  const names = Object.values(filteredTypes).map((node) => node.name);

  expect(names).toMatchSnapshot();
});
