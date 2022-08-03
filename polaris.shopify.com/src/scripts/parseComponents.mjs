import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseMarkdown } from "../utils/markdown.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentReadmesDir = path.join(__dirname, "../../content/components");

let components = [];

const componentFiles = fs.readdirSync(componentReadmesDir, "utf-8");

// Loop through the components directory
for (let i = 0; i < componentFiles.length; i++) {
  const file = `${componentFiles[i]}/index.md`;
  const readmePath = path.join(componentReadmesDir, file);
  const readmeExists = fs.existsSync(readmePath);

  if (readmeExists) {
    // Parse the file's markdown content
    const readmeFileContent = fs.readFileSync(readmePath, "utf-8");
    const markdownFile = parseMarkdown(readmeFileContent);

    components.push(markdownFile);
  }
}

// Write meta file (can be included in next.js bundle)
const metaFilePath = path.join(__dirname, "../data/components.json");
components = components.map((component) => {
  const { readme, frontMatter, ...rest } = component;
  const { examples, ...restFrontMatter } = frontMatter;

  return { frontMatter: restFrontMatter, ...rest };
});
fs.writeFileSync(metaFilePath, JSON.stringify(components, null, 2));
