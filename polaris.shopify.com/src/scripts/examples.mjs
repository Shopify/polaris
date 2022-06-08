import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseMarkdown } from "../utils/markdown.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentsDir = path.join(__dirname, "../../content/components");
const examplesDir = path.join(__dirname, "../../content/examples");

let components = [];

const componentDirectories = fs.readdirSync(componentsDir, "utf-8");

componentDirectories.forEach((directory) => {
  const directoryPath = path.join(componentsDir, directory);
  const directoryFiles = fs.readdirSync(directoryPath, "utf-8");

  // console.log("directory", directory);
  // console.log("directoryFiles", directoryFiles);

  directoryFiles.forEach((filename) => {
    const oldPath = path.join(componentsDir, directory, filename);

    if (filename.endsWith(".md")) {
      const newPath = path.join(componentsDir, `${directory}.md`);

      fs.renameSync(oldPath, newPath);
    } else if (filename.endsWith(".tsx")) {
      let newPath = path.join(examplesDir, `${directory}-${filename}`);

      newPath = newPath.replace(`${directory}-${directory}`, directory);

      fs.renameSync(oldPath, newPath);
    }
  });
});
