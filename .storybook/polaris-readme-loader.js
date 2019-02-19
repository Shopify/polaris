/* eslint-disable no-console */
const chalk = require('chalk');
const grayMatter = require('gray-matter');
const MdParser = require('./md-parser');

/**
 * A Webpack loader, that expects a Polaris README file, and returns metadata,
 * and the examples contained within the readme.
 *
 * The `code` property of the examples are functions that will render a JSX
 * component when called with a scope object that contains React and Polaris's
 * exports. This allows us to inject all Polaris components into the function's
 * scope whilemaintaining the current scope that contains the Babel helper
 * functions. Unfortunatly this is only possible using eval() to
 * generate a function with the correct local scope by dynamically creating
 * a parameters list.
 */
module.exports = function loader(source) {
  this.cacheable();

  const readme = parseCodeExamples(source);

  // Work around JSON.stringify() not supporting functions.
  // First replace all code functions within the data with a placeholder string.
  // This transforms:
  // { code: function() {/* blah */ } }
  // into:
  // { code: "___CODEPLACEHOLDER__0__0___" }
  const readmeWithPlaceholders = {
    ...readme,
    examples: readme.examples.map((example, exampleIdx) => ({
      ...example,
      code: `___CODEPLACEHOLDER__${exampleIdx}___`,
    })),
  };

  // Then stringify the data, and replace all the placeholder strings with the
  // with the function declaration.
  // This transforms:
  // { code: "___CODEPLACEHOLDER__0__0___" }
  // back into:
  // { code: function() {/* blah */ } }
  const stringyReadme = JSON.stringify(readmeWithPlaceholders, null, 2).replace(
    /"___CODEPLACEHOLDER__(\d+)___"/g,
    (_, exampleIdx) => readme.examples[exampleIdx].code.toString(),
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

  return `const codeInvoker = ${codeInvoker};\nexport const component = ${stringyReadme};`;
};

const exampleForRegExp = /<!-- example-for: ([\w\s,]+) -->/u;

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

function parseCodeExamples(data) {
  const matter = grayMatter(data);

  return {
    name: matter.data.name,
    category: matter.data.category,
    examples: generateExamples(matter),
  };
}

function generateExamples(matter) {
  if (matter.data.platforms && !matter.data.platforms.includes('web')) {
    const ignoredPlatforms = matter.data.platforms.join(',');
    console.log(
      chalk`ℹ️  {grey [${
        matter.data.name
      }] Component examples are ignored (platforms: ${ignoredPlatforms})}`,
    );

    return [];
  }

  if (matter.data.hidePlayground) {
    console.log(
      chalk`ℹ️  {grey [${
        matter.data.name
      }] Component examples are ignored (hidePlayground: true)}`,
    );

    return [];
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

  if (allExamples.length === 0) {
    console.log(
      chalk`🚨 {red [${
        matter.data.name
      }]} No examples found. For troubleshooting advice see https://github.com/Shopify/polaris-react/blob/master/documentation/Component%20READMEs.md#troubleshooting`,
    );
  }

  const nameRegex = /(.)*/;
  const codeRegex = /```jsx(.|\n)*?```/g;

  const examples = allExamples
    .filter((example) => isExampleForPlatform(example, 'web'))
    .map((example) => {
      const nameMatches = example.match(nameRegex);
      const codeBlock = example.match(codeRegex);

      const name = nameMatches !== null ? nameMatches[0].trim() : '';
      const code =
        codeBlock !== null ? wrapExample(stripCodeBlock(codeBlock[0])) : '';

      const description = new MdParser().parse(
        filterMarkdownForPlatform(
          example
            .replace(nameRegex, '')
            .replace(codeRegex, '')
            .replace(exampleForRegExp, ''),
          'web',
        ).trim(),
      );

      return {name, code, description};
    });

  if (examples.filter((example) => example.code).length === 0) {
    console.log(
      chalk`🚨 {red [${matter.data.name}]} At least one React example expected`,
    );
  }

  examples.forEach((example) => {
    if (example.code === '') {
      console.log(
        chalk`🚨 {red [${matter.data.name}]} Example “${
          example.name
        }” is missing a React example`,
      );
    }
  });

  return examples;
}

function filterMarkdownForPlatform(markdown, platform) {
  const unwrapSinglePlatformContentRegExp = new RegExp(
    `<!-- content-for: ${platform} -->([\\s\\S]+?)<!-- \\/content-for -->`,
    'gu',
  );

  const deleteSinglePlatformContentRegExp = new RegExp(
    `<!-- content-for: (?:[\\w\\s]*) -->([\\s\\S]+?)<!-- \\/content-for -->`,
    'gu',
  );

  const unwrapMultiplatformContentRegExp = new RegExp(
    `<!-- content-for: (?:[\\w\\s,]*${platform}[\\w\\s,]*) -->([\\s\\S]+?)<!-- \\/content-for -->`,
    'gu',
  );
  const deleteRemainingPlatformsRegExp = /<!-- content-for: [\w\s,]+ -->[\s\S]+?<!-- \/content-for -->/gu;

  return (
    markdown
      // Unwrap content in multiple passes to support nested content-for blocks
      .replace(unwrapSinglePlatformContentRegExp, '$1')
      .replace(deleteSinglePlatformContentRegExp, '')
      .replace(unwrapMultiplatformContentRegExp, '$1')
      .replace(deleteRemainingPlatformsRegExp, '')
  );
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

  // The eagle-eyed amongst you will spot that the function passed to
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
