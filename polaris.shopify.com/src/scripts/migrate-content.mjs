import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import glob from "glob";
import { parseMarkdown } from "../utils/markdown.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentDir = path.join(__dirname, "../../content/components");
const readmeFiles = glob.sync(
  path.join(__dirname, "../../../polaris-react/src/components/*/README.md")
);

const kebabize = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

const migrateFile = async (filePath) => {
  const fileTitle = kebabize(filePath.split("/").at(-2));
  const fileName = `${fileTitle}.md`;
  const fileDir = path.join(componentDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const exampleContent = fileContent
    .split("---")
    .filter((fileChunk) => fileChunk.startsWith("\n\n## Examples"))[0]
    .replace("\n\n## Examples", "");

  let exampleFrontMatter = "examples:";
  const examples = {};
  exampleContent.split("\n\n### ").forEach((example) => {
    const title = example.split("\n")[0].trim();
    if (title === "") return;

    const kebabTitle = kebabize(title);
    const exampleId = `${fileTitle}-${kebabTitle}`;
    const description = example.replace(title, "").split("```")[0].trim();
    const code = example.split("```jsx").at(-1).replace("```", "").trim();

    exampleFrontMatter += `\n  - fileName: ${exampleId}.tsx\n    title: ${title}`;
    if (description) {
      exampleFrontMatter += `\n    description: ${description}`;
    }
    examples[`${exampleId}.tsx`] = `${code}`;
  });

  const contentNoExample = fileContent
    .replace(exampleContent, "")
    .replace("---\n\n## Examples", "")
    .replace("\n---", `\n${exampleFrontMatter}\n---`);

  fs.writeFileSync(fileDir, contentNoExample);
};

const migrateFiles = readmeFiles.map((filePath) => migrateFile(filePath));

await Promise.all(migrateFiles);
