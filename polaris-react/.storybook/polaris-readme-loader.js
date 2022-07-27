/* eslint-disable no-console */
const chalk = require('chalk');
const grayMatter = require('gray-matter');
const MdParser = require('./md-parser');
const React = require('react');
const lodash = require('lodash');

const HOOK_PREFIX = 'use';

/**
 * A Webpack loader, that expects a Polaris README file, and returns a JS file
 * that adheres Storybook's Component Story Format that describes the stories
 * contained in the readme.
 *
 * We don't know what Polaris exports are needed by a given component, so we
 * import all of Polaris into the scope. This means that any time we add
 * examples for a new component we need to add it to the list of components that
 * are imported in this loader.
 * Eventually each README should define some metadata describing the imports it
 * requires, so we don't have to blindly import all the Polaris components and a
 * subset of Polaris icons.
 */
module.exports = function loader(source) {
  this.cacheable();

  const readme = parseCodeExamples(source);

  const hasFullscreenLayout = ['App provider', 'Frame', 'Navigation'].includes(
    readme.name,
  );

  const omitAppProvider = [
    'Frame',
    'App provider',
    'CustomProperties',
  ].includes(readme.name);

  const csfExports = readme.examples.map((example) => {
    return `
const ${example.storyName}Component = (${example.code})();
export function ${example.storyName}() {
  return <${example.storyName}Component />;
}

${example.storyName}.storyName = ${JSON.stringify(example.name)};
${example.storyName}.args = {omitAppProvider: ${omitAppProvider}};
${example.storyName}.parameters = {
  layout: '${hasFullscreenLayout ? 'fullscreen' : 'padded'}',
  docs: {
    description: {story: ${JSON.stringify(example.description)}},
  },
};
`.trim();
  });

  const hooks = Object.keys(React)
    .filter((key) => key.startsWith(HOOK_PREFIX))
    .join(', ');

  return `
import React, {${hooks}} from 'react';
import {
  AccountConnection,
  ActionList,
  ActionMenu,
  AppProvider,
  Autocomplete,
  Avatar,
  Backdrop,
  Badge,
  Banner,
  Breadcrumbs,
  Button,
  ButtonGroup,
  CalloutCard,
  Caption,
  Card,
  Checkbox,
  ChoiceList,
  Collapsible,
  ColorPicker,
  Combobox,
  Connected,
  ContextualSaveBar,
  CustomProperties,
  DataTable,
  DatePicker,
  DescriptionList,
  DisplayText,
  DropZone,
  EmptySearchResult,
  EmptyState,
  EventListener,
  ExceptionList,
  Filters,
  Focus,
  FooterHelp,
  Form,
  FormLayout,
  Frame,
  FullscreenBar,
  Grid,
  Heading,
  Icon,
  Image,
  IndexTable,
  Indicator,
  InlineError,
  KeyboardKey,
  KeypressListener,
  Label,
  Labelled,
  Layout,
  Link,
  List,
  Listbox,
  Loading,
  MediaCard,
  Modal,
  Navigation,
  OptionList,
  Page,
  PageActions,
  Pagination,
  PolarisTestProvider,
  Popover,
  Portal,
  ProgressBar,
  RadioButton,
  RangeSlider,
  ResourceItem,
  ResourceList,
  ResourcePicker,
  Scrollable,
  ScrollLock,
  Select,
  SettingToggle,
  Sheet,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  SkeletonTabs,
  SkeletonThumbnail,
  Spinner,
  Stack,
  Sticky,
  Subheading,
  Tabs,
  Tag,
  TextContainer,
  TextField,
  TextStyle,
  Thumbnail,
  Toast,
  Tooltip,
  TopBar,
  TrapFocus,
  Truncate,
  UnstyledLink,
  VisuallyHidden,
  VideoThumbnail,
  useIndexResourceState,
} from '@shopify/polaris';
import {
  PlusMinor,
  AlertMinor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  ArrowUpDownMinor,
  CalendarMinor,
  MobileCancelMajor,
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
  CircleInformationMajor,
  CirclePlusMinor,
  CirclePlusOutlineMinor,
  ConversationMinor,
  CustomersMajor,
  CustomersMinor,
  DeleteMinor,
  CircleDisableMinor,
  DisputeMinor,
  DuplicateMinor,
  EmbedMinor,
  ExportMinor,
  ExternalMinor,
  QuestionMarkMajor,
  HomeMajor,
  HomeMinor,
  HorizontalDotsMinor,
  ImportMinor,
  LogOutMinor,
  MarketingMajor,
  MarketingMinor,
  MobileHamburgerMajor,
  NoteMinor,
  NotificationMajor,
  OnlineStoreMajor,
  OnlineStoreMinor,
  OrdersMajor,
  OrdersMinor,
  PrintMinor,
  ProductsMajor,
  ProductsMinor,
  ProfileMinor,
  RefreshMinor,
  RiskMinor,
  SaveMinor,
  SearchMinor,
  MinusMinor,
  ViewMinor,
  EditMinor,
  WandMinor,
} from '@shopify/polaris-icons';

export default {
  title: ${JSON.stringify(`All Components/${readme.name}`)},
  component: ${readme.component},
};

${csfExports.join('\n\n')}
`;
};

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

function parseCodeExamples(data) {
  const matter = grayMatter(data);
  const examples = generateExamples(matter);

  return {
    name: matter.data.name,
    category: matter.data.category,
    component: examples.length ? toPascalCase(matter.data.name) : undefined,
    examples,
  };
}

function generateExamples(matter) {
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
      chalk`🚨 {red [${matter.data.name}]} No examples found. For troubleshooting advice see https://github.com/Shopify/polaris-react/blob/main/documentation/Component%20READMEs.md#troubleshooting`,
    );
  }

  const nameRegex = /(.)*/;
  const codeRegex = /```jsx(.|\n)*?```/g;

  const examples = allExamples.map((example) => {
    const nameMatches = example.match(nameRegex);
    const codeBlock = example.match(codeRegex);

    const name = nameMatches !== null ? nameMatches[0].trim() : '';
    const storyName = pascalCase(name);
    const code =
      codeBlock !== null ? wrapExample(stripCodeBlock(codeBlock[0])) : '';

    const description = new MdParser().parse(example).trim();

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

/**
 * Wraps example code in a function so that we encapsulate each example.
 *
 * Returns a string representation of a function that returns a React Component
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

function toPascalCase(str) {
  return lodash.startCase(lodash.camelCase(str)).replace(/ /g, '');
}
