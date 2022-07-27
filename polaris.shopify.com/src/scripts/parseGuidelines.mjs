import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseMarkdown } from "../utils/markdown.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guidelinesDir = path.join(__dirname, "../../content/foundations");

let guidelines = [];

const subfolders = fs.readdirSync(guidelinesDir, "utf-8");

for (let i = 0; i < subfolders.length; i++) {
  const dirName = subfolders[i];
  const dirPath = path.join(guidelinesDir, dirName);
  const isDir = fs.lstatSync(dirPath).isDirectory();

  if (isDir) {
    const files = fs.readdirSync(dirPath, "utf-8");

    for (let j = 0; j < files.length; j++) {
      const fileName = files[j];
      const filePath = path.join(guidelinesDir, dirName, fileName);

      const readmeFileContent = fs.readFileSync(filePath, "utf-8");
      const parsed = parseMarkdown(readmeFileContent);

      const { readme, ...rest } = parsed;

      guidelines.push({ ...rest, category: dirName });
    }
  }
}

// Write meta file (can be included in next.js bundle)
const metaFilePath = path.join(__dirname, "../data/foundations.json");
fs.writeFileSync(
  metaFilePath,
  JSON.stringify(
    guidelines.map(({ readme, ...rest }) => rest),
    null,
    2
  )
);
