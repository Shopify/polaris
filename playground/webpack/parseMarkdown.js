/* eslint-disable no-console */

const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const grayMatter = require('gray-matter');
const transform = require('@babel/standalone').transform;

module.exports = function loader() {
  const files = glob.sync(`${__dirname}/../../src/components/***/README.md`);

  // Treat all files as depdendencies so that if any of them change then we
  // reparse all of them
  files.forEach((file) => {
    this.addDependency(file);
  });
  this.cacheable();

  const data = parseMarkdown(files);

  const placeholderMappings = {};

  data.forEach((readme, readmeIdx) => {
    readme.examples.forEach((example, exampleIdx) => {
      const placeholder = `___CODEPLACEHOLDER__${readmeIdx}__${exampleIdx}___`;

      placeholderMappings[`"${placeholder}"`] =
        data[readmeIdx].examples[exampleIdx].code;
      data[readmeIdx].examples[exampleIdx].code = placeholder;
    });
  });

  const stringyData = JSON.stringify(data, null, 2).replace(
    /"___CODEPLACEHOLDER__(\d+)__(\d+)___"/g,
    (match) => {
      return `function (scope) {
        const fn = function() { return ${placeholderMappings[match]} };
        const scopeKeys = Object.keys(scope);
        const scopeValues = scopeKeys.map((key) => scope[key]);

        const fnString = fn.toString().replace('SCOPE_VARIABLES_PLACEHOLDER', scopeKeys.join(', '));
        return eval("(" + fnString + ")()")(...scopeValues);
      }`;
    },
  );

  return transform(`module.exports = ${stringyData}`, {
    presets: ['es2015', 'react', ['stage-1', {decoratorsLegacy: true}]],
  }).code;
};

const exampleForRegExp = /<!-- example-for: ([\w\s,]+) -->/u;

function parseMarkdown(files) {
  console.log();
  console.log('🔎 Parsing examples in component README.md files:');
  console.log();
  let errorCount = 0;

  const parsedExamples = files
    .map((file) => {
      const data = fs.readFileSync(file, 'utf8');
      let examples;

      try {
        examples = parseCodeExamples(data, file);
      } catch (err) {
        errorCount++;
        if (process.env.CI) {
          throw new Error(err);
        } else {
          console.warn(`   ${err.message}`);
          return null;
        }
      }

      return examples;
    })
    .filter((example) => example);

  if (errorCount > 0) {
    console.log();
    console.log(
      `${errorCount} error${
        errorCount !== 1 ? 's' : ''
      } found in component READMEs.`,
    );
    console.log('Troubleshooting tips and tricks:');
    console.log(
      'https://github.com/Shopify/polaris-react/blob/master/documentation/Component%20READMEs.md#troubleshooting',
    );
  }

  console.log();
  console.log('🔎 Parsing examples in component README.md files complete');

  return parsedExamples;
}

function stripCodeBlock(block) {
  return block
    .replace(/```jsx/, '')
    .replace('```', '')
    .trim();
}

function isExampleForPlatform(exampleMarkdown, platform) {
  const foundExampleFor = exampleMarkdown.match(exampleForRegExp);

  if (!foundExampleFor) {
    return true;
  }

  return foundExampleFor[1].includes(platform);
}

function parseCodeExamples(data, file) {
  const matter = grayMatter(data);

  if (matter.data.platforms && !matter.data.platforms.includes('web')) {
    console.log(
      chalk`   ℹ️  {grey [${
        matter.data.name
      }] Component was ignored (platforms: ${matter.data.platforms.join(
        ',',
      )})}`,
    );
    return null;
  }

  if (matter.data.hidePlayground) {
    console.log(
      chalk`   ℹ️  {grey [${
        matter.data.name
      }] Component was ignored (hidePlayground: true)}`,
    );
    return null;
  }

  const introAndComponentSections = matter.content
    .split(/(\n---\n)/)
    .map((content) => content.replace('---\n', '').trim())
    .filter((content) => content !== '');
  const [, ...componentSections] = introAndComponentSections;

  const examplesAndHeader = componentSections
    .filter((markdown) => markdown.startsWith('## Examples'))
    .join('')
    .split('###');

  const [, ...allExamples] = examplesAndHeader;
  const filePath = file.split('polaris-react/').slice(-1)[0];

  if (allExamples.length === 0) {
    throw new Error(
      chalk`🚨 {red [${matter.data.name}]} No examples found in ${filePath}`,
    );
  }

  const webExamples = allExamples.filter((example) =>
    isExampleForPlatform(example, 'web'),
  );

  const examples = webExamples.map((example) => {
    const nameMatches = example.match(/(.)*/);
    const codeBlock = example.match(/```jsx(.|\n)*?```/g);

    const name = nameMatches !== null ? nameMatches[0].trim() : '';

    let code = '';
    if (codeBlock !== null) {
      try {
        code = wrapExample(stripCodeBlock(codeBlock[0]));
      } catch (err) {
        throw new Error(
          chalk`🚨 {red [${
            matter.data.name
          }]} Example "${name}" contains a syntax error in ${filePath}: ${
            err.message
          }`,
        );
      }
    }

    return {name, slug: slugify(name), code};
  });

  if (examples.filter((example) => example.code).length === 0) {
    throw new Error(
      chalk`🚨 {red [${
        matter.data.name
      }]} At least one react example expected in ${filePath}`,
    );
  }

  examples.forEach((example) => {
    if (example.code === '') {
      throw new Error(
        chalk`🚨 {red [${matter.data.name}]} Example “${
          example.name
        }” is missing a React example in ${filePath}`,
      );
    }
  });

  return {
    name: matter.data.name,
    slug: slugify(matter.data.name),
    examples,
  };
}

function wrapExample(code) {
  const classPattern = /class (\w+) extends React.Component/g;
  const classMatch = classPattern.exec(code);

  if (classMatch) {
    return `(function(SCOPE_VARIABLES_PLACEHOLDER) {
      ${code}
      return ${classMatch[1]};
    });`;
  } else {
    return `(function(SCOPE_VARIABLES_PLACEHOLDER) {
      class Comp extends React.Component {
        render() {
          return (
            ${code}
          );
        }
      }
      return Comp;
    });`;
  }
}

function slugify(value) {
  return value
    .replace(/’/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
