import fs from 'fs';
import untypedPolarisTypes from '../data/polarisProps.json';
import {
  GroupPropDefinition,
  PropDefinition,
  PropType,
  UnparsablePropDefinition,
} from '../types';
import * as polaris from '@shopify/polaris';
const types = untypedPolarisTypes as AllTypes;

export type AllTypes = {
  [typeName: string]: {
    [filePath: string]: Type;
  };
};

export type Type = {
  filePath: string;
  name: string;
  value: string | number | object;
  syntaxKind?: string;
  description?: string;
  isOptional?: true;
  deprecationMessage?: string;
  defaultValue?: string;
  members?: Type[];
};

const NO_DESCRIPTION = 'No description';

const getTypeByKey = (key: string, currentFileName?: string): Type | null => {
  const match = types[key];
  if (match) {
    const fileOccurences = Object.keys(match).length;
    if (fileOccurences > 1) {
      if (currentFileName && match[currentFileName]) {
        return match[currentFileName];
      } else {
        return null;
      }
    } else if (fileOccurences === 1) {
      return match[Object.keys(match)[0]];
    }
  }
  return null;
};

const createPropDefinition = (
  type: Type,
  memberName?: string,
): PropDefinition | null => {
  if (!type) return null;

  if (memberName) {
    if (!type.members) return null;
    const matchingMember = type.members.find(
      (member) => member.name === memberName,
    );
    if (!matchingMember) return null;
    type = matchingMember;
  }
  const value = type.value.toString();
  const isRequired = !type.isOptional;

  if (type.syntaxKind) {
    const pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/g;
    const arrayedPascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*\[\]$/g;
    const nonEmptyArrayPascalCaseRegex =
      /^NonEmptyArray<[A-Z][a-z]+(?:[A-Z][a-z]+)*>$/g;

    if (
      value.match(pascalCaseRegex) ||
      value.match(arrayedPascalCaseRegex) ||
      value.match(nonEmptyArrayPascalCaseRegex)
    ) {
      const isArrayed = !!(
        value.match(arrayedPascalCaseRegex) ||
        value.match(nonEmptyArrayPascalCaseRegex)
      );
      const fixedKey = value
        .replace('[]', '')
        .replace('NonEmptyArray<', '')
        .replace('>', '');
      const resolvedType = getTypeByKey(fixedKey, type.filePath);

      if (resolvedType) {
        let propDefinition = createPropDefinition(resolvedType);
        if (propDefinition) {
          propDefinition.isArrayed = isArrayed;
          propDefinition.isRequired = isRequired;
        }
        return propDefinition;
      }
    }

    if (type.syntaxKind === 'MethodSignature') {
      return {
        type: PropType.Action,
        defaultValue: {
          type: PropType.Action,
          value: [],
        },
        isArrayed: false,
        isRequired,
        description: type.description || 'No description',
      };
    }

    if (
      value === 'string' ||
      value === 'string[]' ||
      value === 'string | string[]'
    ) {
      return {
        type: PropType.String,
        defaultValue: {
          type: PropType.String,
          value: type.defaultValue || '',
        },
        isArrayed: value === 'string[]',
        isRequired,
        description: type.description || NO_DESCRIPTION,
      };
    } else if (value === 'boolean' || value === 'boolean[]') {
      return {
        type: PropType.Boolean,
        defaultValue: {
          type: PropType.Boolean,
          value:
            typeof type.defaultValue === 'boolean' ? type.defaultValue : false,
        },
        isArrayed: value.endsWith('[]'),
        isRequired,
        description: type.description || NO_DESCRIPTION,
      };
    } else if (value === 'number' || value === 'number[]') {
      return {
        type: PropType.Number,
        defaultValue: {
          type: PropType.Number,
          value: 0,
        },
        isArrayed: value.endsWith('[]'),
        isRequired,
        description: type.description || NO_DESCRIPTION,
      };
    } else if (
      type.value.toString() === 'React.ReactNode' ||
      type.value.toString() === 'React.ReactNode[]' ||
      type.value.toString() === 'ReactNode' ||
      type.value.toString() === 'ReactNode[]' ||
      type.value.toString() === 'React.ReactElement' ||
      type.value.toString() === 'React.ReactElement[]'
    ) {
      return {
        type: PropType.ReactNode,
        defaultValue: {
          type: PropType.ReactNode,
          value: [],
        },
        isArrayed: value.endsWith('[]'),
        isRequired,
        description: type.description || 'No description',
      };
    } else if (type.value.toString().includes('|')) {
      const parts = value.split('|').map((part) => part.trim());
      let allStrings = true;
      parts.forEach((part) => {
        const isString = part.replace(/'/g, '"').match(/^"[^"]+"$/gi) !== null;
        if (!isString) allStrings = false;
      });

      if (allStrings) {
        const options = parts.map((part) =>
          part.trim().replace(/"/g, '').replace(/'/g, ''),
        );
        return {
          type: PropType.Enum,
          options,
          defaultValue: {
            type: PropType.Enum,
            value: options[0],
          },
          isArrayed: false,
          isRequired,
          description: type.description || 'No description',
        };
      } else {
        let allResolves = true;

        parts.forEach((part) => {
          const type = getTypeByKey(part);
          if (!type) allResolves = false;
        });

        if (allResolves) {
          const type = getTypeByKey(parts[0]);
          if (type) {
            return createPropDefinition(type);
          }
        }

        // Other enums that we can't parse
      }
    } else if (value.includes('&')) {
      // We can handle simple unions like "Foo & Bar" where
      // both of them have members. In that case, we mash
      // their props together
      const parts = value.split('&').map((part) => part.trim());
      let allHaveMembers = true;
      parts.forEach((part) => {
        const type = getTypeByKey(part);
        if (!type || !type.members) allHaveMembers = false;
      });

      if (allHaveMembers) {
        let propDefinition: GroupPropDefinition = {
          type: PropType.Group,
          defaultValue: undefined,
          isArrayed: false,
          isRequired,
          description: type.description || NO_DESCRIPTION,
          children: {},
        };
        parts.forEach((part) => {
          const type = getTypeByKey(part);
          if (type) {
            type.members?.forEach((member) => {
              if (type) {
                const memberDefinition = createPropDefinition(
                  type,
                  member.name,
                );
                if (memberDefinition) {
                  propDefinition.children = {
                    ...propDefinition.children,
                    [member.name]: memberDefinition,
                  };
                }
              }
            });
          }
        });
        return propDefinition;
      }
    }
  } else {
    if (type.members) {
      let propDefinition: GroupPropDefinition = {
        type: PropType.Group,
        defaultValue: undefined,
        isArrayed: false,
        isRequired,
        description: type.description || NO_DESCRIPTION,
        children: {},
      };
      type.members.forEach((member) => {
        if (type) {
          const memberDefinition = createPropDefinition(type, member.name);

          if (memberDefinition) {
            propDefinition.children = {
              ...propDefinition.children,
              [member.name]: memberDefinition,
            };
          }
        }
      });
      return propDefinition;
    }
  }

  const propDefinition: UnparsablePropDefinition = {
    type: PropType.Unparsable,
    defaultValue: undefined,
    isArrayed: false,
    isRequired,
    description: type.description || NO_DESCRIPTION,
  };
  return propDefinition;
};

let result: any = {};

// Handle child components like IndexTable.Cell
Object.keys(types).forEach((key) => {
  const isPropDefinition = key.endsWith('Props');
  if (isPropDefinition) {
    const filePaths = Object.values(types[key]);

    filePaths.forEach(({filePath}) => {
      const regex =
        /src\/components\/([a-z]+)\/components\/([a-z]+)\/([a-z]+\.tsx)/gi;
      let match;

      while ((match = regex.exec(filePath)) !== null) {
        const [, component, subComponent] = match;

        // @ts-ignore
        if (polaris[component] && polaris[component][subComponent]) {
          const newName = `${component}.${subComponent}Props`;
          types[newName] = {
            [filePath]: {
              ...types[key][filePath],
              name: newName,
            },
          };
        }
      }
    });
  }
});

Object.keys(types).forEach((key) => {
  const isPropDefinition = key.endsWith('Props');

  let type = getTypeByKey(key);

  if (!type) {
    type = getTypeByKey(
      key,
      `polaris-react/src/components/${key.replace('Props', '')}/${key.replace(
        'Props',
        '',
      )}.tsx`,
    );
  }

  if (isPropDefinition && type) {
    const propDefinition = createPropDefinition(type);

    if (propDefinition && propDefinition.type === PropType.Group) {
      result[key] = propDefinition.children;
    }
  }
});

console.log('✅ Successfully imported props');

fs.writeFileSync(
  '../data/componentProps.json',
  JSON.stringify(result, null, 2),
);
