import fs from "fs";
import { createElement } from "react";
import untypedPolarisTypes from "../polarisProps.json";
import {
  ComponentMap,
  GroupPropDefinition,
  PropDefinition,
  PropType,
  PropValue,
} from "../types";
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

const NO_DESCRIPTION = "No description";

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
  key: string,
  memberName?: string
): PropDefinition | null => {
  let type = getTypeByKey(key);
  if (!type) return null;
  if (memberName) {
    if (!type.members) return null;
    const matchingMember = type.members.find(
      (member) => member.name === memberName
    );
    if (!matchingMember) return null;
    type = matchingMember;
  }
  const value = type.value.toString();

  if (type.syntaxKind) {
    const pascalCaseRegex = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/g;

    if (value.match(pascalCaseRegex)) {
      const resolvedType = getTypeByKey(value, type.filePath);
      if (resolvedType) {
        const propDefinition = createPropDefinition(resolvedType.name);
        return propDefinition;
      }
    }

    if (type.syntaxKind === "MethodSignature") {
      return {
        type: PropType.Action,
        defaultValue: {
          type: PropType.Action,
          value: [],
        },
        description: type.description || "No description",
      };
    }

    if (
      value === "string" ||
      value === "string[]" ||
      value === "string | string[]"
    ) {
      return {
        type: PropType.String,
        defaultValue: {
          type: PropType.String,
          value: "",
        },
        description: type.description || NO_DESCRIPTION,
      };
    } else if (value === "boolean") {
      return {
        type: PropType.Boolean,
        defaultValue: {
          type: PropType.Boolean,
          value: false,
        },
        description: type.description || NO_DESCRIPTION,
      };
    } else if (value === "number") {
      return {
        type: PropType.Number,
        defaultValue: {
          type: PropType.Number,
          value: 0,
        },
        description: type.description || NO_DESCRIPTION,
      };
    } else if (
      type.value.toString() === "React.ReactNode" ||
      type.value.toString() === "ReactNode" ||
      type.value.toString() === "React.ReactElement"
    ) {
      return {
        type: PropType.ReactNode,
        defaultValue: {
          type: PropType.ReactNode,
        },
        description: type.description || "No description",
      };
    } else if (type.value.toString().includes("|")) {
      const parts = value.split("|").map((part) => part.trim());
      let allStrings = true;
      parts.forEach((part) => {
        const isString = part.replace(/'/g, '"').match(/^"[^"]+"$/gi) !== null;
        if (!isString) allStrings = false;
      });

      if (allStrings) {
        const options = parts.map((part) =>
          part.trim().replace(/"/g, "").replace(/'/g, "")
        );
        return {
          type: PropType.Enum,
          options,
          defaultValue: {
            type: PropType.Enum,
            value: options[0],
          },
          description: type.description || "No description",
        };
      } else {
        // Other enums that we can't parse
      }
    } else if (value.includes("&")) {
      // We can handle simple unions like "Foo & Bar" where
      // both of them have members. In that case, we mash
      // their props together
      const parts = value.split("&").map((part) => part.trim());
      let allHaveMembers = true;
      parts.forEach((part) => {
        const type = getTypeByKey(part);
        if (!type || !type.members) allHaveMembers = false;
      });

      if (allHaveMembers) {
        let propDefinition: GroupPropDefinition = {
          type: PropType.Group,
          defaultValue: {
            type: PropType.Group,
            children: {},
          },
          description: type.description || NO_DESCRIPTION,
          children: {},
        };
        parts.forEach((part) => {
          const type = getTypeByKey(part);
          if (type) {
            type.members?.forEach((member) => {
              if (type) {
                const memberDefinition = createPropDefinition(
                  type.name,
                  member.name
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
        defaultValue: {
          type: PropType.Group,
          children: {},
        },
        description: type.description || NO_DESCRIPTION,
        children: {},
      };
      type.members.forEach((member) => {
        if (type) {
          const memberDefinition = createPropDefinition(type.name, member.name);
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

  return null;
};

let result: any = {};

Object.keys(types).forEach((key) => {
  const isPropDefinition = key.endsWith("Props");
  if (isPropDefinition) {
    const propDefinition = createPropDefinition(key);
    if (propDefinition && propDefinition.type === PropType.Group) {
      result[key] = propDefinition.children;
    }
  }
});

fs.writeFileSync("./componentProps.json", JSON.stringify(result, null, 2));
