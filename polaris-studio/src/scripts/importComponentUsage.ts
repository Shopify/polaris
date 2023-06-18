import fs from 'fs';

const sourceFile = fs.readFileSync('./data/componentUsage.json', 'utf8');
let componentUsage = JSON.parse(sourceFile);

Object.keys(componentUsage).forEach((key) => {
  delete componentUsage[key].variants;
});

fs.writeFileSync(
  './data/componentsUsageSimplified.json',
  JSON.stringify(componentUsage, null, 2),
);
