import type {FileInfo} from 'jscodeshift';
import postcss, {Plugin} from 'postcss';
import valueParser from 'postcss-value-parser';

// Mapping of spacing tokens and their corresponding px values
// const spacingTokensMap = {
//   '0': '--p-space-0',
//   '1px': '--p-space-025',
//   '2px': '--p-space-05',
//   '4px': '--p-space-1',
//   '8px': '--p-space-2',
//   '12px': '--p-space-3',
//   '16px': '--p-space-4',
//   '20px': '--p-space-5',
//   '24px': '--p-space-6',
//   '32px': '--p-space-8',
//   '40px': '--p-space-10',
//   '48px': '--p-space-12',
//   '64px': '--p-space-16',
//   '80px': '--p-space-20',
//   '96px': '--p-space-24',
//   '112px': '--p-space-28',
//   '128px': '--p-space-32',
// };

// List of the props we want to run this migration on
const targetProps = [
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
];

const isTargetProp = (propName: string): boolean =>
  targetProps.includes(propName);

const plugin = (): Plugin => ({
  postcssPlugin: 'replace-sass-padding',
  Declaration(decl) {
    const prop = decl.prop;
    const parsedValue = valueParser(decl.value);

    // Return if not a padding declaration
    if (!isTargetProp(prop)) return;
    console.log(`${prop}: ${parsedValue}`);

    // parsedValue.walk((node) => {

    //   // If so then check if the value matches the new spacing token values

    //   // Repalce with new spacing token value if there is a match
    // });

    decl.value = parsedValue.toString();
  },
});

export default function replaceSassPadding(fileInfo: FileInfo) {
  return postcss(plugin()).process(fileInfo.source, {
    syntax: require('postcss-scss'),
  }).css;
}
