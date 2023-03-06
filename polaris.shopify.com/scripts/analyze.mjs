import fs from 'fs';
import globby from 'globby';

const propsFilePath = './.cache/props.json';
const propsFileContent = fs.readFileSync(propsFilePath, 'utf8');
const propsData = JSON.parse(propsFileContent);

const componentsDir = '../polaris-react/src/components';
const components = fs.readdirSync(componentsDir);

let data = [];

function toAlphaNumeric(string) {
  return string.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

const componentMarkdownFles = await globby([
  './content/components/**/*.md',
]).then((data) =>
  data.map((path) => {
    const segments = path.split('/');
    return segments[segments.length - 1].replace('.md', '');
  }),
);

components.forEach((component) => {
  const name = component;
  const isDocumented = componentMarkdownFles.some(
    (file) => toAlphaNumeric(file) === toAlphaNumeric(component),
  );
  const expectedPropInterfaceName = `${component}Props`;
  const propDefinition = propsData[expectedPropInterfaceName];
  const propsFollowNamingConvention = propDefinition
    ? Object.keys(propDefinition).length === 1
    : false;

  let typesContainAny = false;
  if (propDefinition && Object.keys(propDefinition.length === 1)) {
    Object.values(propDefinition)[0]?.members?.forEach((member) => {
      if (member.value === 'any') {
        typesContainAny = true;
      }
    });
  }

  let analysis = {
    name: component,
    isDocumented,
    propsFollowNamingConvention,
    typesContainAny,
  };
  data.push(analysis);
});

const outFilePath = './.cache/analysis.json';
fs.writeFileSync(outFilePath, JSON.stringify(data));
