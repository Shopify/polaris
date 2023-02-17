import fs from "fs";
import { createElement } from "react";
import untypedPolarisTpyes from "../polarisProps.json";
import { ComponentMap, PropDefinition, PropType, PropValue } from "../types";
const types = untypedPolarisTpyes as AllTypes;

export type AllTypes = {
  [typeName: string]: {
    [filePath: string]: Type;
  };
};

export type FilteredTypes = {
  [typeName: string]: Type;
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

let components: ComponentMap = {};

function typeToProps(
  type: Type,
  originalName: string
): { [key: string]: PropDefinition } {
  let props: { [key: string]: PropDefinition } = {};

  if (type.name === "BorderTokenAlias") {
    console.log({ log: "WOOOOOO, BORDER_TOKEN_ALIAS" });
  }
  if (type.name === "BannerStatus") {
    console.log("🚀🚀🚀🚀🚀", type);
  }
  switch (type.syntaxKind) {
    case "MethodSignature":
      props[type.name] = {
        type: PropType.Action,
        defaultValue: {
          type: PropType.Action,
          value: [],
        },
        description: type.description || "No description",
      };

      break;

    case "TypeAliasDeclaration":
    case "PropertySignature":
      if (type.value.toString().toLowerCase() === "string") {
        props[type.name] = {
          type: PropType.String,
          defaultValue: {
            type: PropType.String,
            value: "",
          },
          description: type.description || "No description",
        };
      } else if (type.value === "boolean") {
        props[type.name] = {
          type: PropType.Boolean,
          defaultValue: {
            type: PropType.Boolean,
            value: type.defaultValue === "true" ? true : false,
          },
          description: type.description || "No description",
        };
      } else if (type.value === "number") {
        props[type.name] = {
          type: PropType.Number,
          defaultValue: {
            type: PropType.Number,
            value: type.defaultValue ? parseInt(type.defaultValue) : 0,
          },
          description: type.description || "No description",
        };
      } else if (type.value.toString().includes("|")) {
        const parts = type.value
          .toString()
          .split("|")
          .map((part) => part.trim());
        let allStrings = true;
        parts.forEach((part) => {
          const isString =
            part.replace(/'/g, '"').match(/^"[^"]+"$/gi) !== null;
          if (!isString) {
            allStrings = false;
          }
        });
        if (type.name === "BannerStatus") {
          console.log(
            "🚀🚀🚀🚀🚀🤪",
            parts,
            allStrings,
            type.name,
            originalName
          );
        }

        if (allStrings) {
          const options = parts.map((part) =>
            part.trim().replace(/"/g, "").replace(/'/g, "")
          );
          props[originalName] = {
            type: PropType.Enum,
            options,
            defaultValue: {
              type: PropType.Enum,
              value: options[0],
            },
            description: type.description || "No description",
          };
        } else {
          //   console.log({
          //     log: "unparsed enum",
          //     name: member.name,
          //     syntaxKind: member.syntaxKind,
          //     value: member.value.toString(),
          //   });
        }
      } else if (
        type.value.toString() === "React.ReactNode" ||
        type.value.toString() === "ReactNode" ||
        type.value.toString() === "React.ReactElement"
      ) {
        props[type.name] = {
          type: PropType.ReactNode,
          defaultValue: {
            type: PropType.ReactNode,
          },
          description: type.description || "No description",
        };
      } else if (
        type.value.toString()[0].match(/^[A-Z]/) &&
        type.value.toString().match(/[a-z]$/gi)
      ) {
        const subProps = extractProps(type.value.toString(), type.filePath);

        if (subProps.didHaveMembers) {
          props[type.name] = {
            type: PropType.Group,
            children: {
              ...subProps.props,
            },
            defaultValue: {
              type: PropType.Group,
              children: {},
            },
            description: type.description || "No description",
          };
        } else {
          Object.entries(subProps.props).forEach(([subPropName, subProp]) => {
            props[subPropName] = subProp;
          });
        }
      } else {
        // console.log({
        //   log: "unparsed type",
        //   name: type.name,
        //   syntaxKind: type.syntaxKind,
        //   value: type.value.toString(),
        // });
      }
  }
  return props;
}

function extractProps(
  typeName: string,
  currentFileName?: string
): {
  props: { [key: string]: PropDefinition };
  didHaveMembers: boolean;
} {
  let props: { [key: string]: PropDefinition } = {};
  let didHaveMembers = false;

  if (!types[typeName]) {
    console.log({ log: "No definitions found for type" });
    return { props: {}, didHaveMembers: false };
  }

  const hasManyDefinitions = Object.keys(types[typeName]).length > 1;
  if (hasManyDefinitions) {
    if (currentFileName && !types[typeName][currentFileName]) {
      console.log({ log: "Multiple files found for type" });
      return { props: {}, didHaveMembers: false };
    } else {
      // !
    }
  }

  const type = Object.values(types[typeName])[0];
  if (!type) throw new Error(`Could not find type ${typeName}`);

  if (type.syntaxKind === "TypeAliasDeclaration") {
    props = { ...props, ...typeToProps(type, type.name) };
  }

  if (type.members) {
    didHaveMembers = true;
    type.members.forEach((member) => {
      props = { ...props, ...typeToProps(member, typeName) };
    });
  }

  return { props, didHaveMembers };
}

Object.entries(types).forEach(([typeName]) => {
  if (typeName.endsWith("Props")) {
    const componentName = typeName.replace("Props", "");
    components[componentName] = {
      props: {},
      allowedChildren: "",
      reactComponent: () => `createElement("div", {}, [${componentName}])`,
      renderPreview: () =>
        createElement("div", {}, [`${componentName} preview`]),
    };
    components[componentName].props = extractProps(typeName).props;
  }
});

// console.log(components);

fs.writeFileSync("./components.json", JSON.stringify(components, null, 2));
