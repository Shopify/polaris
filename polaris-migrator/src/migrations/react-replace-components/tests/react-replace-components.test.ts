import {check} from '../../../utilities/testUtils';

const migration = 'react-replace-components';
const options = {
  fromComponent: 'TextContainer',
  toComponent: 'VerticalStack',
  fromComponentProps: 'TextContainerProps',
  toComponentProps: 'VerticalStackProps',
  propMaps: [
    {
      fromProp: 'spacing',
      toProp: 'gap',
      defaultValue: '4',
      valueMap: {
        tight: '2',
        loose: '5',
      },
    },
  ],
};
const fixtures = [
  {name: 'react-replace-components', options},
  {name: 'react-replace-components-tight', options},
  {name: 'react-replace-components-loose', options},
  {name: 'react-replace-components-multi', options},
  {name: 'react-replace-components-multi-key', options},
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture: fixture.name,
    migration,
    options: fixture.options,
  });
}
