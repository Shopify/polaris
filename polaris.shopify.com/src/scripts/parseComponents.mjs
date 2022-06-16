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
      const markdownFile = parseMarkdown(readmeFileContent);

      components.push(markdownFile);
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
