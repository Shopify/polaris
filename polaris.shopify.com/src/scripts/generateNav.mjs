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
    const slugs = data.url.split("/");

    slugs.forEach((slug, idx) => {
      if (navMap[slug]) return;

      if (idx === 0) {
        navMap[slug] = data;
      }
    });
  });

  console.log(navMap);
}

generateNav();
