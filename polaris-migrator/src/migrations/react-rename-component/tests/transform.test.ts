import {check} from '../../../utilities/check';

const transform = 'react-rename-component';
const fixtures = [
  {
    name: 'react-rename-component',
    options: {
      relative: false,
      renameFrom: 'Card',
      renameTo: 'LegacyCard',
      renamePropsFrom: 'CardProps',
      renamePropsTo: 'LegacyCardProps',
    },
  },
  {
    name: 'rename-prop-types',
    options: {
      relative: false,
      renameFrom: 'Card',
      renameTo: 'LegacyCard',
      renamePropsFrom: 'CardProps',
      renamePropsTo: 'LegacyCardProps',
    },
  },
  {
    name: 'renamed-import',
    options: {
      relative: false,
      renameFrom: 'Card',
      renameTo: 'LegacyCard',
      renamePropsFrom: 'CardProps',
      renamePropsTo: 'LegacyCardProps',
    },
  },
  {
    name: 'renamed-available-jsx',
    options: {
      relative: false,
      renameFrom: 'Card',
      renameTo: 'LegacyCard',
      renamePropsFrom: 'CardProps',
      renamePropsTo: 'LegacyCardProps',
    },
  },
  {
    name: 'renamed-available-identifier',
    options: {
      relative: false,
      renameFrom: 'Card',
      renameTo: 'LegacyCard',
      renamePropsFrom: 'CardProps',
      renamePropsTo: 'LegacyCardProps',
    },
  },
  {
    name: 'react-rename-stack-component',
    options: {
      relative: false,
      renameFrom: 'Stack',
      renameTo: 'LegacyStack',
      renamePropsFrom: 'StackProps',
      renamePropsTo: 'LegacyStackProps',
    },
  },
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    transform,
    options: fixture.options,
  });
}
