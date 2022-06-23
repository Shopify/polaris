import fs from "fs";
import path from "path";
import glob from "glob";
import { fileURLToPath } from "url";
import { parseMarkdown } from "../utils/markdown.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateNav() {
  const contentDir = path.join(__dirname, "../../content/");
  const files = glob.sync(`${contentDir}**/*.md`);
  const navMap = {};

  const readFilePromises = files.map(
    (filepath) =>
      new Promise((resolve) => {
        const fileContent = fs.readFileSync(filepath, "utf-8");
        const { frontMatter } = parseMarkdown(fileContent);
        const url = filepath.replace(contentDir, "").replace(".md", "");

        resolve({ title: frontMatter.name, url });
      })
  );
  const parsedData = await Promise.all(readFilePromises);

  parsedData.forEach((data) => {
    const urlParts = data.url.split("/");
    createNavItem(navMap, urlParts);
  });

  // console.log(navMap.foundations);
  return navMap;
}

function createNavItem(map, urlParts) {
  const category = urlParts[0];

  if (!map[category]) {
    map[category] = {
      title:
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
      ...(urlParts.length === 1 && { url: urlParts.join("/") }),
    };

    urlParts.length > 1 && createNavItem(map[category], urlParts.slice(1));
  } else {
    createNavItem(map[category], urlParts.slice(1));
  }
}

const nav = await generateNav();
const data = JSON.stringify(nav, null, 2);

fs.writeFileSync(path.join(__dirname, "../data/navigation.json"), data);
