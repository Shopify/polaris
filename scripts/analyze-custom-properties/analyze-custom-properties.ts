import {readFileSync} from 'fs';

import glob from 'glob';
import {parse, InputStreamPosition} from 'scss-parser';
import chalk from 'chalk';

// Constants
const COMMA = ',';
const SPACE = 'space';
const KIND = {
  Arguments: 'arguments',
  Function: 'function',
  Var: 'var',
  Declaration: 'declaration',
  Property: 'property',
  Operator: 'operator',
};

interface ONCheck {
  [key: string]: boolean;
}

// @types/scss-parser don't match the packages types
// the packages has `next` however the @types provide `end`
export interface Node {
  type: string;
  value: string | Node[];
  start?: InputStreamPosition;
  next?: InputStreamPosition;
}

interface BaseLocation {
  start: InputStreamPosition;
  end: InputStreamPosition;
}

interface Location extends BaseLocation {
  file: string;
}

interface CustomPropertyMetaData extends BaseLocation {
  name: string;
}

interface CustomPropertyStats {
  uniqueCustomProperties: number;
  totalCustomProperties: number;
}

interface CustomPropertyMap {
  [key: string]: {
    declaration: boolean;
    usedFromDeclaration: boolean;
    count: number;
    locations: Location[];
  };
}

type PartialIndex<T, F extends string> = {
  [K in keyof T]: Omit<T[K], F>;
};

type TableCustomProperty = PartialIndex<CustomPropertyMap, 'locations'>;

type LogLevel = 'verbose' | 'info' | 'error' | 'never';

interface Options {
  /**
   * List of properties that are expected to be found and used to filter properties that are found
   * @default []
   */
  knownCustomProperties?: string[];
  /**
   * Regular expression used to validate properties
   * @default undefined
   */
  customPropertyPattern?: string;
  /**
   * Glob pattern used to find files
   * css & scss files are supported
   * @default '**\/*.css.'
   */
  pattern?: string;
  /**
   * Determines the errors displayed. `verbose` will display everything. `info` will display everything except errors. `error` will only display errors. And `never` will not display any logs
   * @default 'verbose'
   */
  logLevel?: LogLevel;
}

export function analyzeCustomProperties({
  pattern = '**/*.css',
  customPropertyPattern,
  knownCustomProperties = [],
  logLevel = 'verbose',
}: Options): Promise<
  [CustomPropertyMap, CustomPropertyMap, CustomPropertyStats]
> {
  return new Promise((resolve, reject) => {
    const customProperties: CustomPropertyMap = {};
    const customPropertyDeclarations: ONCheck = {};
    const customPropertyStats: CustomPropertyStats = {
      uniqueCustomProperties: 0,
      totalCustomProperties: 0,
    };

    glob(pattern, {}, function (err, files) {
      if (err) reject(err);

      for (const file of files) {
        handleFile(
          file,
          customPropertyPattern,
          customProperties,
          customPropertyDeclarations,
          customPropertyStats,
        );
      }

      const customPropertyErrors: CustomPropertyMap = {};
      for (const property in customProperties) {
        if (!Object.prototype.hasOwnProperty.call(customProperties, property)) {
          continue;
        }
        if (
          !customProperties[property].declaration &&
          customPropertyDeclarations[property]
        ) {
          customProperties[property].usedFromDeclaration = true;
        }

        if (
          !customProperties[property].declaration &&
          !customProperties[property].usedFromDeclaration &&
          !knownCustomProperties.includes(property)
        ) {
          customPropertyErrors[property] = customProperties[property];
        }
      }

      handleMessage(
        customProperties,
        customPropertyErrors,
        customPropertyStats,
        logLevel,
      );

      resolve([customProperties, customPropertyErrors, customPropertyStats]);
    });
  });
}

export function handleMessage(
  customProperties: CustomPropertyMap,
  customPropertyErrors: CustomPropertyMap,
  customPropertyStats: CustomPropertyStats,
  logLevel: LogLevel,
) {
  if (logLevel === 'never') return;
  if (logLevel === 'verbose' || logLevel === 'error') {
    for (const property in customPropertyErrors) {
      if (
        !Object.prototype.hasOwnProperty.call(customPropertyErrors, property)
      ) {
        continue;
      }
      let locations = '  ';
      for (const location of customPropertyErrors[property].locations) {
        const {start, file} = location;
        locations += `@ ${file}:${start.line}:${start.column}\n  `;
      }
      // eslint-disable-next-line no-console
      console.log(`${chalk.red(
        'error',
      )}: Unexpected custom property "${chalk.green(property)}" ${chalk.yellow(
        `${customPropertyErrors[property].count}`,
      )} times.
${locations}
    `);
    }
  }

  if (logLevel === 'verbose' || logLevel === 'info') {
    const customPropertiesForTable = Object.keys(
      customProperties,
    ).reduce<TableCustomProperty>((acc, key) => {
      const {declaration, usedFromDeclaration, count} = customProperties[key];
      acc[key] = {
        declaration,
        usedFromDeclaration,
        count,
      };

      return acc;
    }, {});
    // eslint-disable-next-line no-console
    console.log(chalk.underline.bold.magentaBright('Custom Properties'));
    // eslint-disable-next-line node/no-unsupported-features/node-builtins, no-console
    console.table(customPropertiesForTable);

    // eslint-disable-next-line no-console
    console.log(`${chalk.magenta(
      'Total',
    )} number of times custom properties are used: ${chalk.yellow(
      `${customPropertyStats.totalCustomProperties}`,
    )}.
Number of ${chalk.cyan('unique')} custom properties: ${chalk.yellow(
      `${customPropertyStats.uniqueCustomProperties}`,
    )}`);
  }
}

export function handleFile(
  file: string,
  customPropertyPattern: string | undefined,
  customProperties: CustomPropertyMap,
  customPropertyDeclarations: ONCheck,
  customPropertyStats: CustomPropertyStats,
) {
  const sourceNode = parse(readFileSync(file, {encoding: 'utf8'}));
  if (!sourceNode.value || !Array.isArray(sourceNode.value)) return [];
  recurseAndVisitASTNodes(sourceNode.value);

  function recurseAndVisitASTNodes(node: Node | Node[]) {
    if (Array.isArray(node)) {
      node.forEach(recurseAndVisitASTNodes);
      return;
    }

    switch (node.type) {
      case KIND.Function:
        if (isVarFunction(node)) {
          visitAll(node, (functionValueNode) => {
            if (functionValueNode.type === KIND.Arguments) {
              addCustomProperty(
                getCustomPropertyMetaData(functionValueNode),
                false,
              );
            }
          });
        }
        break;
      case KIND.Declaration:
        if (
          isCustomPropertyDeclaration(node) &&
          typeof node.value[0] !== 'string'
        ) {
          addCustomProperty(getCustomPropertyMetaData(node.value[0]), true);
        }
    }

    visitAll(node, recurseAndVisitASTNodes);
  }

  function addCustomProperty(
    {name, start, end}: CustomPropertyMetaData,
    declaration: boolean,
  ) {
    if (
      customPropertyPattern &&
      !new RegExp(customPropertyPattern).test(name)
    ) {
      return;
    }
    customPropertyStats.totalCustomProperties += 1;
    customPropertyDeclarations[name] = declaration;
    if (!customProperties[name]) {
      customProperties[name] = {
        declaration,
        usedFromDeclaration: false,
        count: 0,
        locations: [],
      };
      customPropertyStats.uniqueCustomProperties += 1;
    }
    customProperties[name].count += 1;
    customProperties[name].locations.push({
      start,
      end,
      file,
    });
  }
}

export function isCustomPropertyDeclaration(node: Node) {
  return (
    Array.isArray(node.value) &&
    node.value[0].type === KIND.Property &&
    typeof node.value[0].value[0] === 'object' &&
    node.value[0].value[0].type === KIND.Operator
  );
}

export function isVarFunction(node: Node) {
  return Array.isArray(node.value) && node.value[0].value === KIND.Var;
}

export function visitAll(node: Node, cb: (node: Node) => void) {
  if (!node.value || !Array.isArray(node.value)) return;
  node.value.forEach(cb);
}

export function getCustomPropertyMetaData(node: Node): CustomPropertyMetaData {
  let start: InputStreamPosition | undefined;
  let end: InputStreamPosition | undefined;
  let name = '';

  let i = 0;
  while (i < node.value.length) {
    const charNode = node.value[i];

    if (
      typeof charNode !== 'object' ||
      charNode.value === COMMA ||
      charNode.value === SPACE
    ) {
      const prevCharNode = node.value[i - 1];

      if (typeof prevCharNode === 'object') {
        end = prevCharNode.next;
      }

      break;
    }

    if (i === 0) {
      start = charNode.start;
    }

    name += charNode.value;

    i++;

    if (i === node.value.length) {
      end = charNode.next;
    }
  }

  if (!end || !start) {
    throw Error(
      `An error has occurred building a custom property's ("${name}") meta data. A start or end position was not found.`,
    );
  }

  return {name: name.trim(), start, end};
}
