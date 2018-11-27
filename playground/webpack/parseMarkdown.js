/* eslint-disable no-console */

const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const grayMatter = require('gray-matter');

/**
 * A Webpack loader, that reads all README files, and returns an array of
 * component readmes, and the examples contained within them.
 *
 * The `code` property of the examples are functions that will render a JSX
 * component when called with a scope object that contains React and Polaris's
 * exports. This allows us to inject all Polaris components into the function's
 * scope whilemaintaining the current scope that contains the Babel helper
 * functions. Unfortunatly this is only possible using eval() to
 * generate a function with the correct local scope by dynamically creating
 * a parameters list.
 */
module.exports = function loader() {
  const files = glob.sync(`${__dirname}/../../src/components/***/README.md`);

  // Treat all files as depdendencies so that if any of them change then we
  // reparse all of them
  files.forEach((file) => {
    this.addDependency(file);
  });
  this.cacheable();

  const data = parseMarkdown(files);

  // Work around JSON.stringify() not supporting functions.
  // First replace all code functions within the data with a placeholder string.
  // This transforms:
  // { code: function() {/* blah */ } }
  // into:
  // { code: "___CODEPLACEHOLDER__0__0___" }
  const dataWithPlaceholders = data.map((readme, readmeIdx) => ({
    ...readme,
    examples: readme.examples.map((example, exampleIdx) => ({
      ...example,
      code: `___CODEPLACEHOLDER__${readmeIdx}__${exampleIdx}___`,
    })),
  }));

  // Then stringify the data, and replace all the placeholder strings with the
  // with the function declaration.
  // This transforms:
  // { code: "___CODEPLACEHOLDER__0__0___" }
  // back into:
  // { code: function() {/* blah */ } }
  const stringyData = JSON.stringify(dataWithPlaceholders, null, 2).replace(
    /"___CODEPLACEHOLDER__(\d+)__(\d+)___"/g,
    (_, readmeIdx, exampleIdx) =>
      data[readmeIdx].examples[exampleIdx].code.toString(),
  );

  // Example code does not have any scope attached to it by default. It boldly
  // states `<Button>An example Button</Button>`, blindly trusting that `Button`
  // is available in its scope.
  //
  // codeInvoker is responsible for providing a scope for an example function
  // so that it will work. It does this by creating a new fuction with the scope
  // defined as parameters and then calling that new function.
  // Assuming it is called with
  // codeInvoker(function() { return (<Button>Hi</Button>) } {React, Button})
  // It will transform:
  // function() { return (<Button>Hi</Button>) }
  // into:
  // function(React, Button) { return (<Button>Hi</Button>) }
  // and then call that function with React and Button as the arguments
  const codeInvoker = function(fn, scope) {
    const scopeKeys = Object.keys(scope);
    const scopeValues = scopeKeys.map((key) => scope[key]);

    // Replace the empty parameter list with a list based upon the scope.
    // We can't use a placeholder in the parmeter list and search/replace that
    // because the placeholder's name may be mangled when the code is minified.
    const fnString = fn
      .toString()
      .replace(/^function(\s*)\(\)/, `function$1(${scopeKeys.join(', ')})`);

    // eslint-disable-next-line no-eval
    return eval(`(${fnString})`)(...scopeValues);
  };

  return `const codeInvoker = ${codeInvoker};\nexport const components = ${stringyData};`;
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
  console.log('✅ Parsing examples in component README.md files complete');

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
    const code =
      codeBlock !== null ? wrapExample(stripCodeBlock(codeBlock[0])) : '';

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

  let wrappedCode = '';

  if (classMatch) {
    wrappedCode = `${code}
return ${classMatch[1]};
`;
  } else {
    wrappedCode = `return function() {
      return (
        ${code}
      );
    }`;
  }

  // The eagle-eyed amongst you will spoty that the function passed to
  // codeInvoker has no arguments. This is because the codeInvoker function
  // shall dynamically modify the given function, adding items from the current
  // scope as arguments. We can't do this with some kind of placeholder value
  // (e.g. codeInvoker(function(PLACEHOLDER) {}, scope) and then replace the
  // PLACEHOLDER because its name will get mangled as part of minification in
  // production mode and thus searching for "PLACEHOLDER in the function's
  // string representation shall fail.
  return `function (scope) {
    return codeInvoker(function () {
      ${wrappedCode}
    }, scope);
  }`;
}

function slugify(value) {
  return value
    .replace(/’/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}
