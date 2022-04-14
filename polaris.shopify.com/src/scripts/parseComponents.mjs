import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseMarkdown } from "../utils/markdown.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentsDir = path.join(
  __dirname,
  "../../../polaris-react/src/components"
);

let components = [];

const files = fs.readdirSync(componentsDir, "utf-8");

for (let i = 0; i < files.length; i++) {
  const fileName = files[i];
  const filePath = path.join(componentsDir, fileName);
  const isDir = fs.lstatSync(filePath).isDirectory();

  if (isDir) {
    const readmePath = path.join(filePath, "README.md");
    if (fs.existsSync(readmePath)) {
      const readmeFileContent = fs.readFileSync(readmePath, "utf-8");
      const parsed = parseMarkdown(readmeFileContent);

      components.push(parsed);
    }
  }
}

// Write meta file (can be included in next.js bundle)
const metaFilePath = path.join(__dirname, "../data/components.json");
fs.writeFileSync(
  metaFilePath,
  JSON.stringify(
    components.map(({ readme, ...rest }) => rest),
    null,
    2
  )
);

// Write readme file (only used in getStaticProps)
const readmes = {};
components.forEach(
  ({ frontMatter, readme }) => (readmes[frontMatter.name] = readme)
);
const readmeFilePath = path.join(__dirname, "../data/components.readme.json");
fs.writeFileSync(readmeFilePath, JSON.stringify(readmes, null, 2));

console.log("Done!");
