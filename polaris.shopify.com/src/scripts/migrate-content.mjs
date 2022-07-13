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
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
};

const migrateFile = async (filePath) => {
  const fileName = `${kebabize(filePath.split("/").at(-2))}.md`;
  const fileDir = path.join(componentDir, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const contentNoExample = fileContent
    .split("---")
    .filter((fileChunk) => !fileChunk.startsWith("\n\n## Examples"))
    .join("---");

  fs.writeFileSync(fileDir, contentNoExample);
};

const migrateFiles = readmeFiles.map((filePath) => migrateFile(filePath));

await Promise.all(migrateFiles);
