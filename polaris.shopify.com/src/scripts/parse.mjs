import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

import rehypeStringify from "rehype-stringify";
import { visit, SKIP } from "unist-util-visit";

import fs from "fs";
import path, { dirname as getDirName } from "path";
import { fileURLToPath } from "url";
import { parseMarkdown } from "../utils/markdown.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(
  __dirname,
  "../../../polaris-react/src/components"
);
const examplesDir = path.join(__dirname, "../pages/generated-examples");

let components = [];

const componentDirectories = fs.readdirSync(componentsDir, "utf-8");

// Loop through the components directory
for (let i = 0; i < componentDirectories.length; i++) {
  const componentDirectoryName = componentDirectories[i];
  const componentDirectoryPath = path.join(
    componentsDir,
    componentDirectoryName
  );
  const isDir = fs.lstatSync(componentDirectoryPath).isDirectory();

  if (isDir) {
    // Attempt to find the readme file
    const readmePath = path.join(componentDirectoryPath, "README.md");
    const readmeExists = fs.existsSync(readmePath);

    if (readmeExists) {
      // Parse the file's markdown content
      const readmeFileContent = fs.readFileSync(readmePath, "utf-8");

      let outTree;

      function extractExamples() {
        return (tree, file) => {
          let isExamples = false;
          visit(tree, (node, index, parent) => {
            if (node.type === "heading" && node.depth === 2) {
              isExamples =
                node.children.length === 1 &&
                node.children[0].type === "text" &&
                node.children[0].value === "Examples";
            }

            if (!isExamples && parent) {
              parent.children.splice(index, 1);
              return [SKIP, index];
            }
            outTree = tree;
          });
        };
      }

      const examplesOnly = await unified()
        .use(remarkParse)
        .use(extractExamples)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(readmeFileContent);

      let currentExample = "";

      let meta = {};

      visit(outTree, (node, index, parent) => {
        if (node.type === "heading") {
          if (node.depth === 3 && node.children.length === 1) {
            currentExample = node.children[0].value;
          }
        }

        if (node.type === "paragraph") {
          if (node.children.length === 1) {
            meta[currentExample] = {
              ...meta[currentExample],
              description:
                (meta[currentExample]?.description || "") +
                node.children[0].value,
            };
          }
        }

        if (node.type === "code") {
          meta[currentExample] = {
            ...meta[currentExample],
            code: node.value,
          };
        }

        let allMeta = [];

        // Write example file
        Object.entries(meta).forEach(([title, value], i) => {
          const exampleFileName = `${slugify(title)}.tsx`;
          const examplePath = path.join(
            componentsDir,
            componentDirectoryName,
            "examples",
            exampleFileName
          );

          fs.mkdir(
            getDirName(examplePath),
            { recursive: true },
            function (err) {
              if (err) return cb(err);

              let code = fixCode(value.code);

              fs.writeFileSync(examplePath, code || "");
            }
          );

          allMeta.push({
            fileName: exampleFileName,
            title,
            description: value.description,
          });
        });

        const metaPath = path.join(
          componentsDir,
          componentDirectoryName,
          "examples",
          "index.json"
        );

        fs.writeFileSync(metaPath, JSON.stringify(allMeta, null, 2));
      });
    }
  }
}

function fixCode(code) {
  if (!code) {
    return "";
  }
  // Create a list of all the components in the code.
  let polarisImports = {};
  const componentsRegex = /<([A-Z][A-Za-z]+)/g;
  let match;
  while ((match = componentsRegex.exec(code)) !== null) {
    if (match[1] !== "AppProvider" && match[1] !== "React") {
      polarisImports[match[1]] = true;
    }
  }

  // Special case polaris imports
  if (code.includes("useIndexResourceState")) {
    polarisImports["useIndexResourceState"] = true;
  }

  // Create a list of all the polaris icons in the code.
  let polarisIconImports = {};
  const iconsRegex = /[A-Za-z]+(Minor|Major)/g;
  while ((match = iconsRegex.exec(code)) !== null) {
    polarisIconImports[match[0]] = true;
  }

  // Create a list of all the react stuff in the code.
  let reactImports = {};
  const validHooks = [
    "useState",
    "useEffect",
    "useCallback",
    "useMemo",
    "useRef",
  ];
  validHooks.forEach((hook) => {
    if (code.includes(hook)) {
      reactImports[hook] = true;
    }
  });

  let importMainReactPackage = false;
  if (code.includes("React.Fragment")) {
    importMainReactPackage = true;
  }

  // Before we continue, add wrapper elements around the
  // code so that it works correctly.
  code = decorateExample(code);

  // Add import statements at the top of the file
  if (!code.includes("import ")) {
    const importStatements = [];

    if (Object.keys(polarisImports).length > 0) {
      importStatements.push(
        `import { AppProvider, ${Object.keys(polarisImports).join(
          ", "
        )} } from "@shopify/polaris";`
      );
    }

    if (Object.keys(polarisIconImports).length > 0) {
      importStatements.push(
        `import { ${Object.keys(polarisIconImports).join(
          ", "
        )} } from "@shopify/polaris-icons";`
      );
    }

    if (Object.keys(reactImports).length > 0) {
      importStatements.push(
        `import ${importMainReactPackage ? "React, " : ""}{ ${Object.keys(
          reactImports
        ).join(", ")} } from "react";`
      );
    } else {
      importStatements.push(`import React from "react";`);
    }

    importStatements.push(`import '@shopify/polaris/build/esm/styles.css';`);

    importStatements.push(
      `import translations from '@shopify/polaris/locales/en.json';`
    );

    code = `${importStatements.join("\n")}

${code}`;
  }
  return code;
}

function slugify(str) {
  return (
    str
      // Camel to hyphen case
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      // Replace spaces with hyphens
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
  );
}

function decorateExample(code) {
  // Extract the name of the function that wrap's the component
  const functionName = code.match(/function ([A-Z][A-Za-z]+)/);

  // Some examples only contain a component function. Add some code
  // that actually renders that component.
  if (code.startsWith("function")) {
    return `${code}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <${functionName[1]} />
    </AppProvider>
  );
}

export default Example;
    `;
  }
  // Some examples contain an JSX element. Wrap that
  // element in a function and export it.
  else {
    return `
function Example() {
  return (
    <AppProvider i18n={translations}>
      ${code}
    </AppProvider>
  );
}

export default Example;
    `;
  }
}
