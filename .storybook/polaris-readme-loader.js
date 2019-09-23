/* eslint-disable no-console */
const chalk = require('chalk');
const grayMatter = require('gray-matter');
const MdParser = require('./md-parser');
const React = require('react');

const HOOK_PREFIX = 'use';

/**
 * A Webpack loader, that expects a Polaris README file, and returns a JS file
 * that adheres Storybook's Component Story Format that describes the stories
 * contained in the readme.
 *
 * We don't know what Polaris exports are needed by a given component, so we
 * import all of Polaris (using `import * as Polaris`) then create a component
 * that has has the individual values in scope using eval (as we're in strict
 * mode so we can't use `with {}`), so that examples can state `<Button>`
 * instead of `<Polaris.Button>`.
 */
module.exports = function loader(source) {
  this.cacheable();

  const readme = parseCodeExamples(source);

  const testIndividualExamples = ['Modal', 'Card'].includes(readme.name);

  const csfExports = readme.examples.map((example) => {
    return `
const ${example.storyName}Component = codeInvoker(${example.code});
export function ${example.storyName}() {
  return <${example.storyName}Component/>;
}
${example.storyName}.story = {
  name: ${JSON.stringify(example.name)},
  decorators: [withA11y],
  parameters: {
    notes: ${JSON.stringify(example.description)},
    percy: {skip: ${JSON.stringify(!testIndividualExamples)}},
  }
};
`.trim();
  });

  if (readme.examples.length && !testIndividualExamples) {
    allExamplesCode = readme.examples.map((example) => {
      // Add styles to prevent false positives in visual regression testing.
      // Set a minimum height so that examples don't shift and triger a failure
      // if an example above them changes height
      return `
<div key="${example.storyName}" style={{
    minHeight: '720px',
    borderBottom: '1px solid #000',
    marginBottom: '8px',
  }}>
  <Polaris.Heading>${example.name}</Polaris.Heading>
  <${example.storyName}Component />
</div>
`.trim();
    });

    csfExports.unshift(`export function AllExamples() {
  return (
    <React.Fragment>
  ${allExamplesCode.join('\n')}
    </React.Fragment>
  );
};
AllExamples.story = {
  decorators: [withA11y],
  parameters: {
    percy: {skip: false},
    chromatic: {disable: true},
  }
}`);
  }

  // Example code does not have any scope attached to it by default. It boldly
  // states `<Button>An example Button</Button>`, blindly trusting that `Button`
  // is available in its scope.
  //
  // codeInvoker is responsible for injecting Polaris into the scope for a
  // function so that it will work.
  //
  // Given a function with no parameters, it will create a new function with all
  // the Polaris exports defined as parameters and then return the result of
  // calling that new function.
  const codeInvoker = function(fn) {
    const scope = Object.assign({}, Polaris);

    // Replace the empty parameter list with a list based upon the scope.
    // We can't use a placeholder in the parmeter list and search/replace that
    // because the placeholder's name may be mangled when the code is minified.
    const args = Object.keys(scope).join(', ');
    const fnString = fn
      .toString()
      .replace(/^function(\s*)\(\)/, `function$1(${args})`);

    // eslint-disable-next-line no-eval
    return eval(`(${fnString})`).apply(null, Object.values(scope));
  };

  const hooks = Object.keys(React)
    .filter((key) => key.startsWith(HOOK_PREFIX))
    .join(', ');

  return `
import React, {${hooks}} from 'react';
import {withA11y} from '@storybook/addon-a11y';
import * as Polaris from '@shopify/polaris';
import {
  PlusMinor,
  AlertMinor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  ArrowUpDownMinor,
  CalendarMinor,
  MobileCancelMajorMonotone,
  CancelSmallMinor,
  CaretDownMinor,
  CaretUpMinor,
  TickSmallMinor,
  ChevronDownMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
  ChevronUpMinor,
  CircleCancelMinor,
  CircleChevronDownMinor,
  CircleChevronLeftMinor,
  CircleChevronRightMinor,
  CircleChevronUpMinor,
  CircleInformationMajorTwotone,
  CirclePlusMinor,
  CirclePlusOutlineMinor,
  ConversationMinor,
  DeleteMinor,
  CircleDisableMinor,
  DisputeMinor,
  DuplicateMinor,
  EmbedMinor,
  ExportMinor,
  ExternalMinor,
  QuestionMarkMajorTwotone,
  HomeMajorMonotone,
  HorizontalDotsMinor,
  ImportMinor,
  LogOutMinor,
  MobileHamburgerMajorMonotone,
  NoteMinor,
  NotificationMajorMonotone,
  OnlineStoreMajorTwotone,
  OrdersMajorTwotone,
  PrintMinor,
  ProductsMajorTwotone,
  ProfileMinor,
  RefreshMinor,
  RiskMinor,
  SaveMinor,
  SearchMinor,
  MinusMinor,
  ViewMinor,
} from '@shopify/polaris-icons';

const codeInvoker = ${codeInvoker};

export default { title: ${JSON.stringify(`All Components|${readme.name}`)} };

${csfExports.join('\n\n')}
`;
};

const exampleForRegExp = /<!-- example-for: ([\w\s,]+) -->/u;

function stripCodeBlock(block) {
  return block
    .replace(/```jsx/, '')
    .replace('```', '')
    .trim();
}

function pascalCase(str) {
  return (str.match(/[a-zA-Z0-9]+/g) || '')
    .map((m) => m[0].toLocaleUpperCase() + m.slice(1))
    .join('');
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
      chalk`ℹ️  {grey [${matter.data.name}] Component examples are ignored (platforms: ${ignoredPlatforms})}`,
    );

    return [];
  }

  if (matter.data.hidePlayground) {
    console.log(
      chalk`ℹ️  {grey [${matter.data.name}] Component examples are ignored (hidePlayground: true)}`,
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
      chalk`🚨 {red [${matter.data.name}]} No examples found. For troubleshooting advice see https://github.com/Shopify/polaris-react/blob/master/documentation/Component%20READMEs.md#troubleshooting`,
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
      const storyName = pascalCase(name);
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

      return {name, storyName, code, description};
    });

  if (examples.filter((example) => example.code).length === 0) {
    console.log(
      chalk`🚨 {red [${matter.data.name}]} At least one React example expected`,
    );
  }

  examples.forEach((example) => {
    if (example.code === '') {
      console.log(
        chalk`🚨 {red [${matter.data.name}]} Example “${example.name}” is missing a React example`,
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

/**
 * Wraps example code in a function so that it can be passed to codeInvoker to get
 * the full Polaris scope.
 *
 * Returns a string that is a parsable function that retuns a React Component
 * If the example is a function or class then we return that function or class.
 * If the example is plain JSX then return a function component that renders
 * that JSX .
 */
function wrapExample(code) {
  const classPattern = /class (\w+) extends React.Component/g;
  const functionPattern = /^function (\w+)/g;
  const fullComponentDefinitionMatch =
    classPattern.exec(code) || functionPattern.exec(code);

  if (fullComponentDefinitionMatch) {
    return `function() {
    ${code}
    return ${fullComponentDefinitionMatch[1]};
  }`;
  } else {
    return `function() {
    function JsxOnlyExample() {
      return (
        ${code}
      );
    }
    return JsxOnlyExample;
  }`;
  }
}
